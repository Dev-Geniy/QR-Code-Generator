// Переключение темы

const toggleButton = document.getElementById('theme-toggle');

const body = document.body;

const icon = toggleButton.querySelector('.icon');

// Загрузка сохраненной темы

const savedTheme = localStorage.getItem('theme') || 'light';

body.setAttribute('data-theme', savedTheme);

icon.textContent = savedTheme === 'light' ? '☀️' : '🌙';

// Обработчик переключения

toggleButton.addEventListener('click', () => {

    const currentTheme = body.getAttribute('data-theme');

    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);

    icon.textContent = newTheme === 'light' ? '☀️' : '🌙';

});

// Логика генератора QR-кодов

const generateButton = document.getElementById('generate-qr');

const urlInput = document.getElementById('url-input');

const qrCanvas = document.getElementById('qr-canvas');

const downloadLink = document.getElementById('download-qr');

generateButton.addEventListener('click', () => {

    const url = urlInput.value.trim();

    if (!url || !isValidUrl(url)) {

        alert('Please enter a valid URL (e.g., https://example.com)');

        return;

    }

    // Генерация QR-кода

    QRCode.toCanvas(qrCanvas, url, { width: 200 }, (error) => {

        if (error) {

            console.error('Failed to generate QR code: ', error);

            return;

        }

        // Подготовка ссылки для скачивания

        qrCanvas.toBlob((blob) => {

            const urlBlob = URL.createObjectURL(blob);

            downloadLink.href = urlBlob;

            downloadLink.style.display = 'inline';

        }, 'image/png');

    });

});

// Проверка валидности URL

function isValidUrl(string) {

    try {

        new URL(string);

        return true;

    } catch (_) {

        return false;

    }

}

// Копирование Bitcoin-адреса

const copyBtcButton = document.querySelector('.btc-address .copy-btn');

copyBtcButton.addEventListener('click', () => {

    const btcCode = document.getElementById('btc-code').textContent;

    navigator.clipboard.writeText(btcCode).then(() => {

        copyBtcButton.textContent = 'Copied!';

        setTimeout(() => {

            copyBtcButton.textContent = 'Copy';

        }, 2000);

    }).catch(err => {

        console.error('Failed to copy: ', err);

    });

});
