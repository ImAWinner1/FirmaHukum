Add-Type -AssemblyName System.Drawing

$sourceFile = "C:\Users\Aspire 7\.gemini\antigravity-ide\brain\b1f623dd-ce4b-49b1-83f0-3717bf5f2d6a\media__1783665972621.png"
$targetFile = Join-Path $PWD "app\opengraph-image.jpg"

# Load the image
$img = [System.Drawing.Image]::FromFile($sourceFile)

# Calculate dimensions (1200x630 for OG)
$width = 1200
$height = 630

# Create a new bitmap
$bmp = New-Object System.Drawing.Bitmap($width, $height)

# Draw the image
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($img, 0, 0, $width, $height)

# Save as JPEG
$graphics.Dispose()
$img.Dispose()

$bmp.Save($targetFile, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()

Write-Host "Image successfully resized and saved to $targetFile"
