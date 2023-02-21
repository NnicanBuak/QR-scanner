let scanner = null;

// Функция для инициализации сканера
function initScanner() {
	Quagga.onDetected(function (result) {
		// Проверяем, поддерживает ли устройство AR
		if (!AFRAME.utils.device.checkHeadsetConnected()) return;

		// Получаем содержимое сканированного кода
		const qrContent = result.codeResult.code;

		// Изменяем маркер на основе содержимого сканированного QR-кода
		const marker = document.querySelector("a-marker");
		marker.setAttribute("preset", qrContent);

		// Отображаем AR-контент
		const scene = document.querySelector("a-scene");
		scene.style.display = "block";
	});
}

// Функция для запуска сканера
function startScanner() {
	Quagga.init(
		{
			inputStream: {
				name: "Live",
				type: "LiveStream",
				target: document.querySelector("#scanner-container"),
			},
			decoder: {
				readers: ["qrcode_reader"],
			},
		},
		function (err) {
			if (err) {
				console.log(err);
				return;
			}
			scanner = Quagga.QuaggaScanner.getScanner();
		}
	);
}

// Запускаем сканер при загрузке страницы
window.onload = startScanner;
