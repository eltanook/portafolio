$apiKey = "rnd_MQyxCZCkPXgn5tKcVTeiW7Ja9DP8"

$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"

Write-Host "=== Deploy Strapi a Render ===" -ForegroundColor Cyan
Write-Host ""

# Listar bases de datos existentes
Write-Host "Buscando bases de datos existentes..." -ForegroundColor Yellow
$databases = Invoke-RestMethod -Uri "$baseUrl/postgres" -Headers $headers

$strapiDb = $databases | Where-Object { $_.name -eq "strapi-db" } | Select-Object -First 1

if ($strapiDb) {
    Write-Host "OK Base de datos encontrada: $($strapiDb.id)" -ForegroundColor Green
    $dbId = $strapiDb.id
} else {
    Write-Host "No se encontro base de datos, saliendo..." -ForegroundColor Red
    exit 1
}

# Verificar que la DB esté disponible
Write-Host ""
Write-Host "Verificando estado de la DB..." -ForegroundColor Yellow

$dbInfo = Invoke-RestMethod -Uri "$baseUrl/postgres/$dbId" -Headers $headers

if ($dbInfo.status -ne "available") {
    Write-Host "Esperando a que la DB esté disponible..." -ForegroundColor Yellow
    
    $ready = $false
    $attempts = 0
    
    while (-not $ready -and $attempts -lt 40) {
        Start-Sleep -Seconds 5
        $attempts++
        $dbInfo = Invoke-RestMethod -Uri "$baseUrl/postgres/$dbId" -Headers $headers
        
        if ($dbInfo.status -eq "available") {
            $ready = $true
            Write-Host "OK DB disponible!" -ForegroundColor Green
        } else {
            Write-Host "  Estado: $($dbInfo.status) (intento $attempts/40)" -ForegroundColor Gray
        }
    }
    
    if (-not $ready) {
        Write-Host "ERROR Timeout" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "OK DB disponible!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Info de la DB:" -ForegroundColor Yellow
Write-Host "  Hostname: $($dbInfo.hostname)" -ForegroundColor Gray
Write-Host "  Port: $($dbInfo.port)" -ForegroundColor Gray  
Write-Host "  Database: $($dbInfo.databaseName)" -ForegroundColor Gray
Write-Host "  Internal URL: $($dbInfo.internalConnectionString)" -ForegroundColor Gray

Write-Host ""
Write-Host "Generando secrets..." -ForegroundColor Yellow

function New-Secret {
    $bytes = New-Object byte[] 32
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    [Convert]::ToBase64String($bytes)
}

$keys = @(
    (New-Secret),
    (New-Secret),
    (New-Secret),
    (New-Secret)
)

Write-Host "OK Secrets generados" -ForegroundColor Green

Write-Host ""
Write-Host "Creando servicio web..." -ForegroundColor Yellow

$serviceData = @{
    type = "web_service"
    name = "strapi-backend"
    ownerId = $dbInfo.ownerId
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
        @{ key = "DATABASE_URL"; value = $dbInfo.internalConnectionString }
        @{ key = "DATABASE_SSL"; value = "false" }
        @{ key = "APP_KEYS"; value = ($keys -join ',') }
        @{ key = "API_TOKEN_SALT"; value = (New-Secret) }
        @{ key = "ADMIN_JWT_SECRET"; value = (New-Secret) }
        @{ key = "TRANSFER_TOKEN_SALT"; value = (New-Secret) }
        @{ key = "JWT_SECRET"; value = (New-Secret) }
    )
}

$serviceJson = $serviceData | ConvertTo-Json -Depth 10

try {
    $service = Invoke-RestMethod -Uri "$baseUrl/services" -Headers $headers -Method Post -Body $serviceJson -ContentType "application/json"
    Write-Host "OK Servicio creado!" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "=============================" -ForegroundColor Green
    Write-Host "   DEPLOYMENT EXITOSO!" -ForegroundColor Green
    Write-Host "=============================" -ForegroundColor Green
    Write-Host ""
    Write-Host "URLs importantes:" -ForegroundColor Yellow
    Write-Host "  Admin Panel: https://$($service.service.slug).onrender.com/admin" -ForegroundColor Cyan
    Write-Host "  API: https://$($service.service.slug).onrender.com/api" -ForegroundColor Cyan
    Write-Host "  Dashboard: https://dashboard.render.com/web/$($service.service.id)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Siguiente paso:" -ForegroundColor Yellow
    Write-Host "  1. El build tardara 5-10 min" -ForegroundColor White
    Write-Host "  2. Luego crea tu usuario admin en /admin" -ForegroundColor White
    Write-Host "  3. Configura permisos publicos para tus content types" -ForegroundColor White
    Write-Host ""
    Write-Host "Ver progreso del build:" -ForegroundColor Yellow
    Write-Host "  https://dashboard.render.com/web/$($service.service.id)" -ForegroundColor Cyan
    
} catch {
    Write-Host "ERROR creando servicio: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        Write-Host "Detalles: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
    
    exit 1
}
