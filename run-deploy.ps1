$apiKey = "rnd_MQyxCZCkPXgn5tKcVTeiW7Ja9DP8"

$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"

Write-Host "=== Deploy Strapi a Render ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Obteniendo workspace..." -ForegroundColor Yellow
$owners = Invoke-RestMethod -Uri "$baseUrl/owners" -Headers $headers
$ownerId = $owners[0].owner.id
Write-Host "OK Workspace ID: $ownerId" -ForegroundColor Green

Write-Host ""
Write-Host "Creando PostgreSQL..." -ForegroundColor Yellow

$dbData = @{
    name = "strapi-db"
    ownerId = $ownerId
    plan = "free"
    region = "oregon"
    version = "16"
    databaseName = "strapi_production"
    databaseUser = "strapi_user"
} | ConvertTo-Json

try {
    $db = Invoke-RestMethod -Uri "$baseUrl/postgres" -Headers $headers -Method Post -Body $dbData
    Write-Host "OK Database creada: $($db.id)" -ForegroundColor Green
} catch {
    Write-Host "ERROR creando DB: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Detalles: $($_.ErrorDetails.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Esperando DB (2-3 min)..." -ForegroundColor Yellow

$ready = $false
$attempts = 0

while (-not $ready -and $attempts -lt 36) {
    Start-Sleep -Seconds 5
    $attempts++
    
    try {
        $dbStatus = Invoke-RestMethod -Uri "$baseUrl/postgres/$($db.id)" -Headers $headers
        
        if ($dbStatus.status -eq "available") {
            $ready = $true
            Write-Host "OK DB disponible!" -ForegroundColor Green
        } else {
            Write-Host "  Estado: $($dbStatus.status) (intento $attempts/36)" -ForegroundColor Gray
        }
    } catch {
        Write-Host "  Esperando... (intento $attempts/36)" -ForegroundColor Gray
    }
}

if (-not $ready) {
    Write-Host "ERROR Timeout esperando DB" -ForegroundColor Red
    exit 1
}

$dbInfo = Invoke-RestMethod -Uri "$baseUrl/postgres/$($db.id)" -Headers $headers

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
    ownerId = $ownerId
    repo = "https://github.com/eltanook/portafolio"
    branch = "main"
    rootDir = "strapi-backend"  
    plan = "free"
    region = "oregon"
    buildCommand = 'npm install && npm run build'
    startCommand = "npm run start"
    envVars = @(
        @{ key = "NODE_ENV"; value = "production" },
        @{ key = "HOST"; value = "0.0.0.0" },
        @{ key = "PORT"; value = "10000" },
        @{ key = "DATABASE_CLIENT"; value = "postgres" },
        @{ key = "DATABASE_HOST"; value = $dbInfo.hostname },
        @{ key = "DATABASE_PORT"; value = $dbInfo.port.ToString() },
        @{ key = "DATABASE_NAME"; value = $dbInfo.databaseName },
        @{ key = "DATABASE_USERNAME"; value = $dbInfo.databaseUser },
        @{ key = "DATABASE_PASSWORD"; value = $dbInfo.connectionInfo.password },
        @{ key = "DATABASE_SSL"; value = "true" },
        @{ key = "APP_KEYS"; value = ($keys -join ',') },
        @{ key = "API_TOKEN_SALT"; value = (New-Secret) },
        @{ key = "ADMIN_JWT_SECRET"; value = (New-Secret) },
        @{ key = "TRANSFER_TOKEN_SALT"; value = (New-Secret) },
        @{ key = "JWT_SECRET"; value = (New-Secret) }
    )
} | ConvertTo-Json -Depth 10

try {
    $service = Invoke-RestMethod -Uri "$baseUrl/services" -Headers $headers -Method Post -Body $serviceData
    Write-Host "OK Servicio creado!" -ForegroundColor Green
} catch {
    Write-Host "ERROR creando servicio: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Detalles: $($_.ErrorDetails.Message)" -ForegroundColor Red
    exit 1
}

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
Write-Host "Puedes ver el progreso en:" -ForegroundColor Yellow
Write-Host "  https://dashboard.render.com/web/$($service.service.id)" -ForegroundColor Cyan
