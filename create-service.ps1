$apiKey = "rnd_MQyxCZCkPXgn5tKcVTeiW7Ja9DP8"

$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"
$dbId = "dpg-d41g15vgi27c739gqosg-a"
$ownerId = "tea-d0p0vmeuk2gs7396gh1g"

Write-Host "=== Deploy Strapi Web Service ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Obteniendo detalles de la base de datos..." -ForegroundColor Yellow
$dbDetails = Invoke-RestMethod -Uri "$baseUrl/postgres/$dbId" -Headers $headers

Write-Host "OK Base de datos: $($dbDetails.postgres.name)" -ForegroundColor Green
Write-Host "  Status: $($dbDetails.postgres.status)" -ForegroundColor Gray
Write-Host "  Internal URL: $($dbDetails.postgres.connectionInfo.internalConnectionString)" -ForegroundColor Gray

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
Write-Host "Creando servicio web Strapi..." -ForegroundColor Yellow

$serviceData = @{
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
        @{ key = "DATABASE_URL"; value = $dbDetails.postgres.connectionInfo.internalConnectionString }
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
    $result = Invoke-RestMethod -Uri "$baseUrl/services" -Headers $headers -Method Post -Body $serviceJson -ContentType "application/json"
    
    Write-Host "OK Servicio creado exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=============================" -ForegroundColor Green
    Write-Host "   DEPLOYMENT EXITOSO!" -ForegroundColor Green
    Write-Host "=============================" -ForegroundColor Green
    Write-Host ""
    Write-Host "URLs importantes:" -ForegroundColor Yellow
    Write-Host "  Admin Panel: https://$($result.service.slug).onrender.com/admin" -ForegroundColor Cyan
    Write-Host "  API: https://$($result.service.slug).onrender.com/api" -ForegroundColor Cyan
    Write-Host "  Dashboard: https://dashboard.render.com/web/$($result.service.id)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Siguiente paso:" -ForegroundColor Yellow
    Write-Host "  1. El build tardara 5-10 min (primer deployment)" -ForegroundColor White
    Write-Host "  2. Luego crea tu usuario admin en /admin" -ForegroundColor White
    Write-Host "  3. Configura permisos publicos para tus content types" -ForegroundColor White
    Write-Host ""
    Write-Host "Ver progreso del build:" -ForegroundColor Yellow
    Write-Host "  https://dashboard.render.com/web/$($result.service.id)" -ForegroundColor Cyan
    
} catch {
    Write-Host "ERROR creando servicio: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        Write-Host "Detalles: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
    
    exit 1
}
