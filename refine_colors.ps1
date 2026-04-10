$dir = "d:\projects\Eco-Friendly Packaging Supplier"
$files = Get-ChildItem -Path $dir -Filter "*.html"

foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw
    
    # 1. Replace earth-brown with green equivalents
    $content = $content -replace 'text-earth-brown', 'text-leaf-green'
    $content = $content -replace 'bg-earth-brown', 'bg-leaf-green-dark'
    $content = $content -replace 'border-earth-brown', 'border-leaf-green'
    $content = $content -replace 'to-earth-brown', 'to-leaf-green-dark'
    $content = $content -replace 'from-earth-brown', 'from-leaf-green-dark'
    $content = $content -replace 'shadow-earth-brown', 'shadow-leaf-green'
    $content = $content -replace 'accent-earth-brown', 'accent-leaf-green'
    $content = $content -replace 'bg-earth-brown/10', 'bg-leaf-green/10'
    $content = $content -replace 'border-earth-brown/20', 'border-leaf-green/20'

    # 2. Fix Logo visibility in dark mode
    # Find text-leaf-green followed by EcoPack and ensure dark:text-white is present
    # We use a regex that matches text-leaf-green and some other classes, then EcoPack
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '(class="[^"]*text-leaf-green)([^"]*">EcoPack)', { 
        param($m) 
        if ($m.Value -notlike "*dark:text-white*") {
            return $m.Groups[1].Value + " dark:text-white" + $m.Groups[2].Value
        }
        return $m.Value
    })

    # Find feather="package" with text-leaf-green and add dark:text-white
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '(data-feather="package"[^>]*class="[^"]*text-leaf-green)([^"]*")', {
        param($m)
        if ($m.Value -notlike "*dark:text-white*") {
            return $m.Groups[1].Value + " dark:text-white" + $m.Groups[2].Value
        }
        return $m.Value
    })

    Set-Content -Path $f.FullName -Value $content -NoNewline
}

Write-Host "Color refinement complete!"
