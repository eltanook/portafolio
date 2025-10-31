# Test Strapi API in Detail
Write-Host "=== Detailed Strapi API Test ===" -ForegroundColor Cyan

$token = "f6dcf4b8b91cef4bea6931348bcae4356d2da849f761e621e649a036dbc7d1d729d1cc10da5e8db9394b6264c31ab2eaf06835a08b6a6a3d7411664c5aa753288baa64aeac7c2ce6b41645a6b7dfb9c1ad10f7b20e40d3df39e7664d7babfa1234a7eda4f4b1940efc633f4236a65293dbbc3beb0e055b61c3f490480f049301"

# Test 1: Projects WITHOUT token (public access)
Write-Host "`n1. Testing Projects API (Public - No Token)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://portafolio-c8qj.onrender.com/api/projects?populate=*" -UseBasicParsing
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "   Projects found: $($data.data.Count)" -ForegroundColor Gray
    Write-Host "   Response preview:" -ForegroundColor Gray
    Write-Host $response.Content.Substring(0, [Math]::Min(500, $response.Content.Length)) -ForegroundColor DarkGray
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "❌ Error: HTTP $statusCode" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Projects WITH token
Write-Host "`n2. Testing Projects API (With Token)..." -ForegroundColor Yellow
$headers = @{
    "Authorization" = "Bearer $token"
}
try {
    $response = Invoke-WebRequest -Uri "https://portafolio-c8qj.onrender.com/api/projects?populate=*" -Headers $headers -UseBasicParsing
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "   Projects found: $($data.data.Count)" -ForegroundColor Gray
    if ($data.data.Count -gt 0) {
        Write-Host "   First project title: $($data.data[0].attributes.title)" -ForegroundColor Gray
    }
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "❌ Error: HTTP $statusCode" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Blogs WITHOUT token
Write-Host "`n3. Testing Blogs API (Public - No Token)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://portafolio-c8qj.onrender.com/api/blogs?populate=*" -UseBasicParsing
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "   Blogs found: $($data.data.Count)" -ForegroundColor Gray
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "❌ Error: HTTP $statusCode" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Blogs WITH token
Write-Host "`n4. Testing Blogs API (With Token)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://portafolio-c8qj.onrender.com/api/blogs?populate=*" -Headers $headers -UseBasicParsing
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "   Blogs found: $($data.data.Count)" -ForegroundColor Gray
    if ($data.data.Count -gt 0) {
        Write-Host "   First blog title: $($data.data[0].attributes.title)" -ForegroundColor Gray
    }
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "❌ Error: HTTP $statusCode" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Check API structure
Write-Host "`n5. Checking API Routes..." -ForegroundColor Yellow
$routes = @(
    "/api/projects",
    "/api/project",
    "/api/blogs", 
    "/api/blog"
)

foreach ($route in $routes) {
    try {
        $response = Invoke-WebRequest -Uri "https://portafolio-c8qj.onrender.com$route" -Headers $headers -UseBasicParsing -ErrorAction Stop
        Write-Host "   ✅ $route - HTTP $($response.StatusCode)" -ForegroundColor Green
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   ❌ $route - HTTP $statusCode" -ForegroundColor Red
    }
}

Write-Host "`n=== Test Complete ===" -ForegroundColor Cyan
