$apiKey = "rnd_MQyxCZCkPXgn5tKcVTeiW7Ja9DP8"

$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"

Write-Host "Listando todas las bases de datos..." -ForegroundColor Yellow
Write-Host ""

try {
    $databases = Invoke-RestMethod -Uri "$baseUrl/postgres" -Headers $headers
    
    if ($databases.Count -eq 0) {
        Write-Host "No hay bases de datos" -ForegroundColor Yellow
    } else {
        foreach ($db in $databases) {
            Write-Host "Base de datos encontrada:" -ForegroundColor Green
            Write-Host "  ID: $($db.id)" -ForegroundColor Cyan
            Write-Host "  Name: $($db.name)" -ForegroundColor Cyan
            Write-Host "  Status: $($db.status)" -ForegroundColor Cyan
            Write-Host "  Region: $($db.region)" -ForegroundColor Gray
            Write-Host "  Plan: $($db.plan)" -ForegroundColor Gray
            Write-Host ""
        }
    }
    
    # Listar también servicios
    Write-Host "Listando servicios..." -ForegroundColor Yellow
    Write-Host ""
    
    $services = Invoke-RestMethod -Uri "$baseUrl/services" -Headers $headers
    
    if ($services.Count -eq 0) {
        Write-Host "No hay servicios" -ForegroundColor Yellow
    } else {
        foreach ($svc in $services) {
            Write-Host "Servicio encontrado:" -ForegroundColor Green
            Write-Host "  ID: $($svc.service.id)" -ForegroundColor Cyan
            Write-Host "  Name: $($svc.service.name)" -ForegroundColor Cyan
            Write-Host "  Type: $($svc.service.type)" -ForegroundColor Cyan
            Write-Host "  Status: $($svc.service.serviceDetails.status)" -ForegroundColor Cyan
            if ($svc.service.serviceDetails.url) {
                Write-Host "  URL: $($svc.service.serviceDetails.url)" -ForegroundColor Cyan
            }
            Write-Host ""
        }
    }
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Detalles: $($_.ErrorDetails.Message)" -ForegroundColor Red
}
