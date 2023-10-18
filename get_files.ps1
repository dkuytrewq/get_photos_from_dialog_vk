# Замените путь к файлу со списком URL и целевой путь
$urlListFile = "C:\укажтье\путь\к\файлу\urls.txt"
$targetDirectory = "C:\укажите\путь\куда\сохранить\images"

# Создаем целевую директорию, если она не существует
if (-not (Test-Path -Path $targetDirectory -PathType Container)) {
    New-Item -Path $targetDirectory -ItemType Directory
}

# Чтение списка URL из файла
$urls = Get-Content $urlListFile

# Рекурсивная функция для загрузки файла по URL
function Download-File($url) {
    $fileName = (Get-Date).ToString("yyyy-MM-dd__HH-mm-ss") + '.jpg'
    $targetPath = Join-Path -Path $targetDirectory -ChildPath $fileName

    Write-Host "Загрузка файла $url в $targetPath"
    Invoke-WebRequest -Uri $url -OutFile $targetPath
}

# Цикл по списку URL и загрузка файлов
foreach ($url in $urls) {
    Download-File $url
}

Write-Host "Загрузка завершена."
