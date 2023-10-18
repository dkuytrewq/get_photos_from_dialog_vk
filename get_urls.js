var elems = document.querySelectorAll('.photos_row a');

var arrEvalFunc = [];

for (var i = 0; i < elems.length; i++) {
    var attr = elems[i].getAttribute('onclick');

    var regex = /showPhoto\('([^']+)', '([^']+)'/;
    var matches = attr.match(regex);

    if(matches) {
        var extractedString = "showPhoto('" + matches[1] + "', '" + matches[2] + "')";
        arrEvalFunc.push(extractedString);
    }
}

console.log("Найдено всего = " + arrEvalFunc.length)

async function processUrls() {
    var arrUrls = [];

    for (let i = 0; i < arrEvalFunc.length; i++) {
        const str = arrEvalFunc[i];
        try {
            eval(str);
            var pvPhoto = document.getElementById('pv_photo');
            var firstChild = pvPhoto.firstChild;
            imgSrc = firstChild.getAttribute('src');
            arrUrls.push(imgSrc);
            console.log('обработка');
        } catch (e) {
            console.error("Ошибка при выполнении строки:", str, e);
        }

        await new Promise(resolve => setTimeout(resolve, 500));
    }

    var arrDistinctUrls = [...new Set(arrUrls)];
    console.log("Уникальных ссылок = " + arrDistinctUrls.length)
    var textContent = arrDistinctUrls.join('\n');
    var blob = new Blob([textContent], { type: 'text/plain' });
    var blobUrl = URL.createObjectURL(blob);
    var downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = 'urls.txt';
    downloadLink.click();
    URL.revokeObjectURL(blobUrl);
}

processUrls();