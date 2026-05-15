Add-Type -AssemblyName PresentationCore
$imagePath = "c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main\images\Wall Mural Art\DSC_0069.webp"
try {
    $uri = [System.Uri]::new($imagePath)
    $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create($uri, [System.Windows.Media.Imaging.BitmapCreateOptions]::None, [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad)
    Write-Output "WebP supported: $($decoder.CodecInfo.FriendlyName)"
} catch {
    Write-Output "WebP NOT supported: $($_.Exception.Message)"
}
