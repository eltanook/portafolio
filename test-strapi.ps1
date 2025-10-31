# Test Strapi Connection
Write-Host "=== Testing Strapi Server ===" -ForegroundColor Cyan

# Test 1: Admin panel
Write-Host "`n1. Testing Admin Panel..." -ForegroundColor Yellow
try {
    $admin = Invoke-WebRequest -Uri "https://portafolio-c8qj.onrender.com/admin" -Method Get -UseBasicParsing
    Write-Host "✅ Admin Panel: $($admin.StatusCode) $($admin.StatusDescription)" -ForegroundColor Green
} catch {
    Write-Host "❌ Admin Panel Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: API Projects endpoint
Write-Host "`n2. Testing Projects API..." -ForegroundColor Yellow
$token = "f6dcf4b8b91cef4bea6931348bcae4356d2da849f761e621e649a036dbc7d1d729d1cc10da5e8db9394b6264c31ab2eaf06835a08b6a6a3d7411664c5aa753288baa64aeac7c2ce6b41645a6b7dfb9c1ad10f7b20e40d3df39e7664d7babfa1234a7eda4f4b1940efc633f4236a65293dbbc3beb0e055b61c3f490480f049301"
$headers = @{
    "Authorization" = "Bearer $token"
}

try {
    $projects = Invoke-RestMethod -Uri "https://portafolio-c8qj.onrender.com/api/projects?populate=*" -Headers $headers
    Write-Host "✅ Projects API: Success" -ForegroundColor Green
    Write-Host "   Found $($projects.data.Count) projects" -ForegroundColor Gray
    if ($projects.data.Count -gt 0) {
        Write-Host "   First project: $($projects.data[0].attributes.title)" -ForegroundColor Gray
    }
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "❌ Projects API Error: HTTP $statusCode" -ForegroundColor Red
    Write-Host "   Message: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: API Blogs endpoint
Write-Host "`n3. Testing Blogs API..." -ForegroundColor Yellow
try {
    $blogs = Invoke-RestMethod -Uri "https://portafolio-c8qj.onrender.com/api/blogs?populate=*" -Headers $headers
    Write-Host "✅ Blogs API: Success" -ForegroundColor Green
    Write-Host "   Found $($blogs.data.Count) blogs" -ForegroundColor Gray
    if ($blogs.data.Count -gt 0) {
        Write-Host "   First blog: $($blogs.data[0].attributes.title)" -ForegroundColor Gray
    }
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "❌ Blogs API Error: HTTP $statusCode" -ForegroundColor Red
    Write-Host "   Message: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Test Complete ===" -ForegroundColor Cyan
