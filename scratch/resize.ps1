Add-Type -AssemblyName System.Drawing

$sourceFile = Join-Path $PWD "public\images\hero-statue.png"
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
