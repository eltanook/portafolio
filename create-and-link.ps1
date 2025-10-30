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

# Construir DATABASE_URL manualmente con los datos conocidos
# Formato: postgresql://user:password@host:port/database
# Como no tenemos el password, usaremos una referencia al env var de Render
$dbHost = "dpg-d41g15vgi27c739gqosg-a"
$dbPort = "5432"
$dbName = "strapi_production_rabq"
$dbUser = "strapi_user"

# En Render, cuando vinculas una DB, se crea automáticamente la variable DATABASE_URL
# Por ahora, crearemos el servicio con variables individuales y luego vincularemos la DB

$serviceData = @{
    type = "web_service"
    name = "strapi-backend"
    ownerId = $ownerId
    repo = "https://github.com/eltanook/portafolio"
    branch = "main"
    rootDir = "strapi-backend"
    serviceDetails = @{
        env = "node"
        plan = "free"
        region = "oregon"
        buildCommand = "npm install && npm run build"
        startCommand = "npm run start"
        envVars = @(
            @{ key = "NODE_ENV"; value = "production" }
            @{ key = "HOST"; value = "0.0.0.0" }
            @{ key = "PORT"; value = "10000" }
            @{ key = "DATABASE_CLIENT"; value = "postgres" }
            @{ key = "DATABASE_HOST"; value = "$dbHost.oregon-postgres.render.com" }
            @{ key = "DATABASE_PORT"; value = $dbPort }
            @{ key = "DATABASE_NAME"; value = $dbName }
            @{ key = "DATABASE_USERNAME"; value = $dbUser }
            @{ key = "DATABASE_SSL"; value = "true" }
            @{ key = "APP_KEYS"; value = ($keys -join ',') }
            @{ key = "API_TOKEN_SALT"; value = (New-Secret) }
            @{ key = "ADMIN_JWT_SECRET"; value = (New-Secret) }
            @{ key = "TRANSFER_TOKEN_SALT"; value = (New-Secret) }
            @{ key = "JWT_SECRET"; value = (New-Secret) }
        )
    }
}

$serviceJson = $serviceData | ConvertTo-Json -Depth 10

try {
    $result = Invoke-RestMethod -Uri "$baseUrl/services" -Headers $headers -Method Post -Body $serviceJson -ContentType "application/json"
    
    $serviceId = $result.service.id
    
    Write-Host "OK Servicio creado!" -ForegroundColor Green
    Write-Host "  ID: $serviceId" -ForegroundColor Gray
    Write-Host ""
    
    # Ahora intentar vincular la base de datos
    Write-Host "Vinculando base de datos al servicio..." -ForegroundColor Yellow
    
    # Este endpoint puede variar - intentaremos agregar env vars desde la DB
    Write-Host "NOTA: Debes vincular manualmente la DB desde el dashboard" -ForegroundColor Yellow
    Write-Host "O actualizar la variable DATABASE_PASSWORD manualmente" -ForegroundColor Yellow
    
    Write-Host ""
    Write-Host "=============================" -ForegroundColor Green
    Write-Host "   SERVICIO CREADO!" -ForegroundColor Green
    Write-Host "=============================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Informacion del servicio:" -ForegroundColor Yellow
    Write-Host "  Nombre: $($result.service.name)" -ForegroundColor Cyan
    Write-Host "  ID: $serviceId" -ForegroundColor Cyan
    Write-Host "  Slug: $($result.service.slug)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "URLs:" -ForegroundColor Yellow
    Write-Host "  Admin Panel: https://$($result.service.slug).onrender.com/admin" -ForegroundColor Cyan
    Write-Host "  API: https://$($result.service.slug).onrender.com/api" -ForegroundColor Cyan
    Write-Host "  Dashboard: $($result.service.dashboardUrl)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "IMPORTANTE: Completa el setup:" -ForegroundColor Yellow
    Write-Host "  1. Ve al dashboard: $($result.service.dashboardUrl)" -ForegroundColor Cyan
    Write-Host "  2. En Environment, agrega DATABASE_PASSWORD desde la DB strapi-db" -ForegroundColor White
    Write-Host "  3. O vincula la DB completa para obtener DATABASE_URL automaticamente" -ForegroundColor White
    Write-Host "  4. El build tardara 5-10 min despues de configurar la DB" -ForegroundColor White
    
} catch {
    Write-Host "ERROR creando servicio: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        Write-Host "Detalles: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
    
    exit 1
}
