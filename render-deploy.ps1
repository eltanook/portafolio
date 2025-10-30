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
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"

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

$db = Invoke-RestMethod -Uri "$baseUrl/postgres" -Headers $headers -Method Post -Body $dbData
Write-Host "OK Database creada: $($db.id)" -ForegroundColor Green

Write-Host ""
Write-Host "Esperando DB (2-3 min)..." -ForegroundColor Yellow

$ready = $false
$attempts = 0

while (-not $ready -and $attempts -lt 36) {
    Start-Sleep -Seconds 5
    $attempts++
    $dbStatus = Invoke-RestMethod -Uri "$baseUrl/postgres/$($db.id)" -Headers $headers
    
    if ($dbStatus.status -eq "available") {
        $ready = $true
        Write-Host "OK DB disponible" -ForegroundColor Green
    } else {
        Write-Host "  $($dbStatus.status)..." -ForegroundColor Gray
    }
}

if (-not $ready) {
    Write-Host "ERROR Timeout" -ForegroundColor Red
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

$service = Invoke-RestMethod -Uri "$baseUrl/services" -Headers $headers -Method Post -Body $serviceData

Write-Host "OK Servicio creado!" -ForegroundColor Green
Write-Host ""
Write-Host "===  DEPLOYMENT EXITOSO ===" -ForegroundColor Green
Write-Host ""
Write-Host "Admin Panel: https://$($service.service.slug).onrender.com/admin" -ForegroundColor Cyan
Write-Host "API: https://$($service.service.slug).onrender.com/api" -ForegroundColor Cyan
Write-Host "Dashboard: https://dashboard.render.com/web/$($service.service.id)" -ForegroundColor Cyan
Write-Host ""
Write-Host "El build tardara 5-10 min. Luego crea tu admin en /admin" -ForegroundColor Yellow
