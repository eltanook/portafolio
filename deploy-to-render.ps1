# Script para deployear Strapi en Render usando la API REST

# Instrucciones para obtener API Key:
# 1. Ve a https://dashboard.render.com/u/settings#api-keys
# 2. Click en "Create API Key"
# 3. Dale un nombre (ej: "CLI Deployment")
# 4. Copia el key y pégalo aquí abajo

Write-Host "=== Deploy Strapi a Render ===" -ForegroundColor Cyan
Write-Host ""

# Pedir API Key
$apiKey = Read-Host "Ingresa tu Render API Key (obtenerla en https://dashboard.render.com/u/settings#api-keys)"

if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host "Error: API Key es requerido" -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"

Write-Host ""
Write-Host "Paso 1: Obteniendo información del workspace..." -ForegroundColor Yellow

try {
    $ownersResponse = Invoke-RestMethod -Uri "$baseUrl/owners" -Headers $headers -Method Get
    $ownerId = $ownersResponse[0].owner.id
    Write-Host "✓ Workspace ID: $ownerId" -ForegroundColor Green
} catch {
    Write-Host "✗ Error obteniendo workspace: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Paso 2: Creando base de datos PostgreSQL..." -ForegroundColor Yellow

$dbPayload = @{
    name = "strapi-db"
    ownerId = $ownerId
    plan = "free"
    region = "oregon"
    databaseName = "strapi_production"
    databaseUser = "strapi_user"
} | ConvertTo-Json

try {
    $dbResponse = Invoke-RestMethod -Uri "$baseUrl/postgres" -Headers $headers -Method Post -Body $dbPayload
    $dbId = $dbResponse.id
    Write-Host "✓ Base de datos creada: $($dbResponse.name)" -ForegroundColor Green
    Write-Host "  Database ID: $dbId" -ForegroundColor Gray
    Write-Host "  Host: $($dbResponse.hostname)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Error creando base de datos: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Respuesta: $($_.ErrorDetails.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Paso 3: Esperando a que la base de datos esté disponible..." -ForegroundColor Yellow
Write-Host "Esto puede tomar 2-3 minutos..." -ForegroundColor Gray

$maxAttempts = 60
$attempt = 0
$dbReady = $false

while ($attempt -lt $maxAttempts -and -not $dbReady) {
    Start-Sleep -Seconds 5
    $attempt++
    
    try {
        $dbStatus = Invoke-RestMethod -Uri "$baseUrl/postgres/$dbId" -Headers $headers -Method Get
        if ($dbStatus.status -eq "available") {
            $dbReady = $true
            Write-Host "✓ Base de datos disponible!" -ForegroundColor Green
        } else {
            Write-Host "  Estado: $($dbStatus.status) (intento $attempt/$maxAttempts)" -ForegroundColor Gray
        }
    } catch {
        Write-Host "  Esperando... (intento $attempt/$maxAttempts)" -ForegroundColor Gray
    }
}

if (-not $dbReady) {
    Write-Host "✗ La base de datos no está disponible después de 5 minutos" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Paso 4: Creando servicio web para Strapi..." -ForegroundColor Yellow

# Generar secrets aleatorios
function Generate-Secret {
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($bytes)
    return [Convert]::ToBase64String($bytes)
}

$appKey1 = Generate-Secret
$appKey2 = Generate-Secret
$appKey3 = Generate-Secret
$appKey4 = Generate-Secret
$apiTokenSalt = Generate-Secret
$adminJwtSecret = Generate-Secret
$transferTokenSalt = Generate-Secret
$jwtSecret = Generate-Secret

# Obtener info de conexión de la DB
$dbInfo = Invoke-RestMethod -Uri "$baseUrl/postgres/$dbId" -Headers $headers -Method Get

$servicePayload = @{
    type = "web_service"
    name = "strapi-backend"
    ownerId = $ownerId
    repo = "https://github.com/eltanook/portafolio"
    branch = "main"
    rootDir = "strapi-backend"
    plan = "free"
    region = "oregon"
    buildCommand = "npm install && npm run build"
    startCommand = "npm run start"
    envVars = @(
        @{ key = "NODE_ENV"; value = "production" }
        @{ key = "HOST"; value = "0.0.0.0" }
        @{ key = "PORT"; value = "10000" }
        @{ key = "DATABASE_CLIENT"; value = "postgres" }
        @{ key = "DATABASE_HOST"; value = $dbInfo.hostname }
        @{ key = "DATABASE_PORT"; value = $dbInfo.port.ToString() }
        @{ key = "DATABASE_NAME"; value = $dbInfo.databaseName }
        @{ key = "DATABASE_USERNAME"; value = $dbInfo.databaseUser }
        @{ key = "DATABASE_PASSWORD"; value = $dbInfo.connectionInfo.password }
        @{ key = "DATABASE_SSL"; value = "true" }
        @{ key = "APP_KEYS"; value = "$appKey1,$appKey2,$appKey3,$appKey4" }
        @{ key = "API_TOKEN_SALT"; value = $apiTokenSalt }
        @{ key = "ADMIN_JWT_SECRET"; value = $adminJwtSecret }
        @{ key = "TRANSFER_TOKEN_SALT"; value = $transferTokenSalt }
        @{ key = "JWT_SECRET"; value = $jwtSecret }
    )
} | ConvertTo-Json -Depth 10

try {
    $serviceResponse = Invoke-RestMethod -Uri "$baseUrl/services" -Headers $headers -Method Post -Body $servicePayload
    Write-Host "✓ Servicio web creado: $($serviceResponse.service.name)" -ForegroundColor Green
    Write-Host "  Service ID: $($serviceResponse.service.id)" -ForegroundColor Gray
    Write-Host "  URL: https://$($serviceResponse.service.slug).onrender.com" -ForegroundColor Green
} catch {
    Write-Host "✗ Error creando servicio web: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Respuesta: $($_.ErrorDetails.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== ¡Deployment iniciado con éxito! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Tu aplicación se está deployando. El primer build puede tomar 5-10 minutos." -ForegroundColor Cyan
Write-Host ""
Write-Host "URLs importantes:" -ForegroundColor Yellow
Write-Host "  Dashboard: https://dashboard.render.com/web/$($serviceResponse.service.id)" -ForegroundColor Cyan
Write-Host "  Admin Panel: https://$($serviceResponse.service.slug).onrender.com/admin" -ForegroundColor Cyan
Write-Host "  API: https://$($serviceResponse.service.slug).onrender.com/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "Siguiente paso: Espera a que termine el build y luego crea tu usuario admin en /admin" -ForegroundColor Yellow
