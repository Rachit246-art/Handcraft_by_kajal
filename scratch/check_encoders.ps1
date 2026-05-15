Add-Type -AssemblyName PresentationCore
[System.Windows.Media.Imaging.BitmapEncoder]::GetRegisteredEncoders() | Select-Object FriendlyName | Write-Output
