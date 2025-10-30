$apiKey = "rnd_MQyxCZCkPXgn5tKcVTeiW7Ja9DP8"

$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$baseUrl = "https://api.render.com/v1"

Write-Host "Listando bases de datos..." -ForegroundColor Yellow
$listResponse = Invoke-RestMethod -Uri "$baseUrl/postgres" -Headers $headers

Write-Host "Estructura de la respuesta:" -ForegroundColor Cyan
$listResponse | ConvertTo-Json -Depth 10
