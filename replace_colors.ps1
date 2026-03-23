$dir = "d:\projects\Eco-Friendly Packaging Supplier"
$files = Get-ChildItem -Path $dir -Filter "*.html"

foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw
    
    # Text colors
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'text-(red|blue|yellow|purple)-\d{3}(/\d+)?', 'text-leaf-green')
    
    # Background colors
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'bg-(red|blue|yellow|purple)-\d{3}/(\d+)', 'bg-leaf-green/$2')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'bg-(red|blue|yellow|purple)-\d{3}', 'bg-leaf-green')
    
    # Border colors
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'border-(red|blue|yellow|purple)-\d{3}/(\d+)', 'border-leaf-green/$2')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'border-(red|blue|yellow|purple)-\d{3}', 'border-leaf-green')
    
    # Fill colors
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, 'fill-(red|blue|yellow|purple)-\d{3}', 'fill-leaf-green')

    Set-Content -Path $f.FullName -Value $content -NoNewline
}
Write-Host "Colors replaced successfully!"
