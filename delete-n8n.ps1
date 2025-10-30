$apiKey = "rnd_MQyxCZCkPXgn5tKcVTeiW7Ja9DP8"

$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"
$n8nServiceId = "srv-d1c701euk2gs73aeaaog"

Write-Host "Eliminando servicio n8n..." -ForegroundColor Yellow
Write-Host "ID: $n8nServiceId" -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "Estas seguro? (s/n)"

if ($confirm -eq "s" -or $confirm -eq "S") {
    try {
        Invoke-RestMethod -Uri "$baseUrl/services/$n8nServiceId" -Headers $headers -Method Delete
        Write-Host "OK Servicio n8n eliminado" -ForegroundColor Green
        Write-Host ""
        Write-Host "Ahora puedes ejecutar .\final-deploy.ps1 para deployear Strapi" -ForegroundColor Cyan
    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) {
            Write-Host "Detalles: $($_.ErrorDetails.Message)" -ForegroundColor Red
        }
    }
} else {
    Write-Host "Cancelado" -ForegroundColor Yellow
}
