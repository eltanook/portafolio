$apiKey = "rnd_MQyxCZCkPXgn5tKcVTeiW7Ja9DP8"

$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"

Write-Host "Obteniendo bases de datos..." -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl/postgres" -Headers $headers

Write-Host "Respuesta completa (JSON):" -ForegroundColor Cyan
$response | ConvertTo-Json -Depth 10

Write-Host ""
Write-Host "================================" -ForegroundColor Yellow
Write-Host ""

Write-Host "Obteniendo servicios..." -ForegroundColor Yellow
$servicesResponse = Invoke-RestMethod -Uri "$baseUrl/services" -Headers $headers

Write-Host "Respuesta de servicios (JSON):" -ForegroundColor Cyan
$servicesResponse | ConvertTo-Json -Depth 10
