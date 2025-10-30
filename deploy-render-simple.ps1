# Deploy Strapi a Render usando API

Write-Host "=== Deploy Strapi a Render ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Obtén tu API Key en: https://dashboard.render.com/u/settings#api-keys" -ForegroundColor Yellow
Write-Host ""

$apiKey = Read-Host "Ingresa tu Render API Key"

if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host "Error: API Key requerido" -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"

# Paso 1: Obtener Owner ID
Write-Host "Obteniendo información del workspace..." -ForegroundColor Yellow
$owners = Invoke-RestMethod -Uri "$baseUrl/owners" -Headers $headers -Method Get
$ownerId = $owners[0].owner.id
Write-Host "✓ Workspace ID: $ownerId" -ForegroundColor Green

# Paso 2: Crear PostgreSQL Database
Write-Host ""
Write-Host "Creando base de datos PostgreSQL..." -ForegroundColor Yellow

$dbJson = @"
{
    "name": "strapi-db",
    "ownerId": "$ownerId",
    "plan": "free",
    "region": "oregon",
    "databaseName": "strapi_production",
    "databaseUser": "strapi_user"
}
"@

$db = Invoke-RestMethod -Uri "$baseUrl/postgres" -Headers $headers -Method Post -Body $dbJson
Write-Host "✓ Base de datos creada: $($db.name)" -ForegroundColor Green
Write-Host "  Database ID: $($db.id)" -ForegroundColor Gray

# Paso 3: Esperar a que la DB esté disponible
Write-Host ""
Write-Host "Esperando a que la base de datos esté disponible (puede tomar 2-3 min)..." -ForegroundColor Yellow

$maxWait = 180
$elapsed = 0
$ready = $false

while ($elapsed -lt $maxWait -and -not $ready) {
    Start-Sleep -Seconds 5
    $elapsed += 5
    
    $dbStatus = Invoke-RestMethod -Uri "$baseUrl/postgres/$($db.id)" -Headers $headers -Method Get
    
    if ($dbStatus.status -eq "available") {
        $ready = $true
        Write-Host "✓ Base de datos disponible!" -ForegroundColor Green
    } else {
        Write-Host "  Estado: $($dbStatus.status) ($elapsed/$maxWait seg)" -ForegroundColor Gray
    }
}

if (-not $ready) {
    Write-Host "✗ Timeout esperando la base de datos" -ForegroundColor Red
    exit 1
}

# Obtener credenciales de la DB
$dbInfo = Invoke-RestMethod -Uri "$baseUrl/postgres/$($db.id)" -Headers $headers -Method Get

# Paso 4: Generar secrets
Write-Host ""
Write-Host "Generando secrets..." -ForegroundColor Yellow

function New-RandomSecret {
    $bytes = New-Object byte[] 32
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    return [Convert]::ToBase64String($bytes)
}

$appKey1 = New-RandomSecret
$appKey2 = New-RandomSecret  
$appKey3 = New-RandomSecret
$appKey4 = New-RandomSecret
$apiTokenSalt = New-RandomSecret
$adminJwtSecret = New-RandomSecret
$transferTokenSalt = New-RandomSecret
$jwtSecret = New-RandomSecret

Write-Host "✓ Secrets generados" -ForegroundColor Green

# Paso 5: Crear servicio web
Write-Host ""
Write-Host "Creando servicio web para Strapi..." -ForegroundColor Yellow

$buildCmd = "npm install && npm run build"
$startCmd = "npm run start"

$serviceJson = @"
{
    "type": "web_service",
    "name": "strapi-backend",
    "ownerId": "$ownerId",
    "repo": "https://github.com/eltanook/portafolio",
    "branch": "main",
    "rootDir": "strapi-backend",
    "plan": "free",
    "region": "oregon",
    "buildCommand": "$buildCmd",
    "startCommand": "$startCmd",
    "envVars": [
        { "key": "NODE_ENV", "value": "production" },
        { "key": "HOST", "value": "0.0.0.0" },
        { "key": "PORT", "value": "10000" },
        { "key": "DATABASE_CLIENT", "value": "postgres" },
        { "key": "DATABASE_HOST", "value": "$($dbInfo.hostname)" },
        { "key": "DATABASE_PORT", "value": "$($dbInfo.port)" },
        { "key": "DATABASE_NAME", "value": "$($dbInfo.databaseName)" },
        { "key": "DATABASE_USERNAME", "value": "$($dbInfo.databaseUser)" },
        { "key": "DATABASE_PASSWORD", "value": "$($dbInfo.connectionInfo.password)" },
        { "key": "DATABASE_SSL", "value": "true" },
        { "key": "APP_KEYS", "value": "$appKey1,$appKey2,$appKey3,$appKey4" },
        { "key": "API_TOKEN_SALT", "value": "$apiTokenSalt" },
        { "key": "ADMIN_JWT_SECRET", "value": "$adminJwtSecret" },
        { "key": "TRANSFER_TOKEN_SALT", "value": "$transferTokenSalt" },
        { "key": "JWT_SECRET", "value": "$jwtSecret" }
    ]
}
"@

$service = Invoke-RestMethod -Uri "$baseUrl/services" -Headers $headers -Method Post -Body $serviceJson
Write-Host "✓ Servicio creado: $($service.service.name)" -ForegroundColor Green

# Resumen
Write-Host ""
Write-Host "=== ¡Deployment Exitoso! ===" -ForegroundColor Green
Write-Host ""
Write-Host "URLs importantes:" -ForegroundColor Yellow
Write-Host "  Dashboard: https://dashboard.render.com/web/$($service.service.id)" -ForegroundColor Cyan
Write-Host "  Admin Panel: https://$($service.service.slug).onrender.com/admin" -ForegroundColor Cyan
Write-Host "  API: https://$($service.service.slug).onrender.com/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "El primer build tomará 5-10 minutos. Luego crea tu usuario admin en /admin" -ForegroundColor Yellow
Write-Host ""
Write-Host "Puedes ver el progreso del build en:" -ForegroundColor Yellow
Write-Host "https://dashboard.render.com/web/$($service.service.id)" -ForegroundColor Cyan
