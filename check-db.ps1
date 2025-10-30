$apiKey = "rnd_MQyxCZCkPXgn5tKcVTeiW7Ja9DP8"

$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"
$dbId = "dpg-d41g15vgi27c739gqosg-a"

Write-Host "Obteniendo detalles de la DB $dbId..." -ForegroundColor Yellow
Write-Host ""

$dbResponse = Invoke-RestMethod -Uri "$baseUrl/postgres/$dbId" -Headers $headers

Write-Host "Respuesta completa:" -ForegroundColor Cyan
$dbResponse | ConvertTo-Json -Depth 10
