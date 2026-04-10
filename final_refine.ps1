$dir = "d:\projects\Eco-Friendly Packaging Supplier"
$files = Get-ChildItem -Path $dir -Filter "*.html"

foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw
    
    # 1. Clean up broken logo text classes
    $content = $content -replace 'text-leaf-green dark:text-leaf-green dark:text-white-dark', 'text-leaf-green dark:text-white'
    $content = $content -replace 'text-leaf-green dark:text-white-dark', 'text-leaf-green dark:text-white'
    $content = $content -replace 'text-leaf-green dark:text-leaf-green', 'text-leaf-green dark:text-white'
    $content = $content -replace 'dark:text-white-dark', 'dark:text-white'

    # 2. Add dark:text-white to logo icon if missing (feather icon)
    # We target package icon that has text-leaf-green
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '(data-feather="package"[^>]*class="[^"]*text-leaf-green)([^"]*)', {
        param($m)
        if ($m.Value -notlike "*dark:text-white*") {
            return $m.Groups[1].Value + " dark:text-white" + $m.Groups[2].Value
        }
        return $m.Value
    })

    # 3. Final sweep for earth-brown (case insensitive)
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'earth-brown', 'leaf-green-dark', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)

    Set-Content -Path $f.FullName -Value $content -NoNewline
}

# Update CSS
$cssPath = Join-Path $dir "assets\css\index.css"
$css = Get-Content -Path $cssPath -Raw
$css = $css -replace '--color-earth-brown: #8D6E63;', '--color-earth-brown: #1B5E20;' # Replace with very dark green
Set-Content -Path $cssPath -Value $css -NoNewline

Write-Host "Final refinement complete!"
