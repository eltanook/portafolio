$apiKey = "rnd_MQyxCZCkPXgn5tKcVTeiW7Ja9DP8"

$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"
$dbId = "dpg-d41g15vgi27c739gqosg-a"
$ownerId = "tea-d0p0vmeuk2gs7396gh1g"

Write-Host "===  DEPLOY STRAPI A RENDER ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Obteniendo credenciales de la base de datos..." -ForegroundColor Yellow
$dbCreds = Invoke-RestMethod -Uri "$baseUrl/postgres/$dbId/connection-info" -Headers $headers

Write-Host "OK Credenciales obtenidas" -ForegroundColor Green

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
    serviceDetails = @{
        env = "node"
        plan = "starter"
        region = "oregon"
        envSpecificDetails = @{
            buildCommand = "npm install && npm run build"
            startCommand = "npm run start"
        }
        envVars = @(
            @{ key = "NODE_ENV"; value = "production" }
            @{ key = "HOST"; value = "0.0.0.0" }
            @{ key = "PORT"; value = "10000" }
            @{ key = "DATABASE_CLIENT"; value = "postgres" }
            @{ key = "DATABASE_URL"; value = $dbCreds.internalConnectionString }
            @{ key = "DATABASE_SSL"; value = "false" }
            @{ key = "APP_KEYS"; value = ($keys -join ',') }
            @{ key = "API_TOKEN_SALT"; value = (New-Secret) }
            @{ key = "ADMIN_JWT_SECRET"; value = (New-Secret) }
            @{ key = "TRANSFER_TOKEN_SALT"; value = (New-Secret) }
            @{ key = "JWT_SECRET"; value = (New-Secret) }
        )
    }
}

$serviceJson = $serviceData | ConvertTo-Json -Depth 10

Write-Host "Enviando request..." -ForegroundColor Gray

try {
    $result = Invoke-RestMethod -Uri "$baseUrl/services" -Headers $headers -Method Post -Body $serviceJson -ContentType "application/json"
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   DEPLOYMENT EXITOSO!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Servicio creado:" -ForegroundColor Yellow
    Write-Host "  Nombre: $($result.service.name)" -ForegroundColor Cyan
    Write-Host "  ID: $($result.service.id)" -ForegroundColor Cyan
    Write-Host "  Slug: $($result.service.slug)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "URLs importantes:" -ForegroundColor Yellow
    Write-Host "  Admin Panel: https://$($result.service.slug).onrender.com/admin" -ForegroundColor Cyan
    Write-Host "  API Endpoint: https://$($result.service.slug).onrender.com/api" -ForegroundColor Cyan
    Write-Host "  Dashboard: $($result.service.dashboardUrl)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Estado del deployment:" -ForegroundColor Yellow
    Write-Host "  El primer build tardara 5-10 minutos" -ForegroundColor White
    Write-Host "  Monitorea el progreso en el dashboard" -ForegroundColor White
    Write-Host ""
    Write-Host "Proximos pasos:" -ForegroundColor Yellow
    Write-Host "  1. Espera a que termine el build" -ForegroundColor White
    Write-Host "  2. Ve a /admin y crea tu usuario administrador" -ForegroundColor White
    Write-Host "  3. Configura permisos publicos en Settings > Roles > Public" -ForegroundColor White
    Write-Host "  4. Puedes cambiar al plan free desde el dashboard si lo prefieres" -ForegroundColor White
    Write-Host ""
    Write-Host "Dashboard: $($result.service.dashboardUrl)" -ForegroundColor Cyan
    
} catch {
    Write-Host ""
    Write-Host "ERROR creando servicio: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        Write-Host "Detalles: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
    
    exit 1
}
