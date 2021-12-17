window.addEventListener("DOMContentLoaded", () => {
	//Form
	const form = () => {
		const form = document.querySelector("#form");
		form.addEventListener("submit", formSend);

		async function formSend(e) {
			e.preventDefault();
			let error = formValidate(form);

			let formData = new FormData(form);
			formData.append("image", formImage.files[0]);

			if (error === 0) {
				form.classList.add("_sending");
				let response = await fetch("sendmail.php", {
					method: "POST",
					body: formData,
				});
				if (response.ok) {
					let result = await response.json();
					alert(result.message);
					formPreview.innerHTML = "";
					form.reset();
					form.classList.remove("_sending");
				} else {
					alert("Ошибка");
					form.classList.remove("_sending");
				}
			} else {
				alert("Заполните обязательные поля");
			}
		}

		function formValidate(form) {
			let error = 0;
			let formReq = document.querySelectorAll("._req");

			for (let index = 0; index < formReq.length; index++) {
				const input = formReq[index];
				formRemoveError(input);

				if (input.classList.contains("_email")) {
					if (emailTest(input)) {
						formAddError(input);
						error++;
					}
				} else if (
					input.getAttribute("type") === "checkbox" &&
					input.checked === false
				) {
					formAddError(input);
					error++;
				} else {
					if (input.value === "") {
						formAddError(input);
						error++;
					}
				}
			}
			return error;
		}

		function formAddError(input) {
			input.parentElement.classList.add("_error");
			input.classList.add("_error");
		}

		function formRemoveError(input) {
			input.parentElement.classList.remove("_error");
			input.classList.remove("_error");
		}

		//Test email
		function emailTest(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w)*(\.\w{2,8})+$/.test(input.value);
		}

		//img preview
		const formImage = document.querySelector("#formImage");
		const formPreview = document.querySelector("#formPreview");

		formImage.addEventListener("change", () => {
			uploadFile(formImage.files[0]);
		});

		function uploadFile(file) {
			//check file type
			if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
				alert("Разрешены только изображения");
				formImage.value = "";
				return;
			}
			//check file size
			if (file.size > 2 * 1024 * 1042) {
				alert("файл должен быть менее 2 МБ");
				return;
			}

			let reader = new FileReader();
			reader.onload = function (e) {
				formPreview.innerHTML = `<img src='${e.target.result}' alt='фото'>`;
			};
			reader.onerror = function (e) {
				alert("Ошибка");
			};
			reader.readAsDataURL(file);
		}
	};
	form();

	// Popup
	const createPopup = () => {
		const btns = document.querySelectorAll(".popup__btn");
		const popup = document.querySelector(".popup");
		const popupCloseBtn = document.querySelector(".popup__close");

		function popupOpen() {
			popup.classList.remove("hide");
			popup.classList.add("show");
			document.body.style.overflow = "hidden";
		}

		btns.forEach((btn) => {
			btn.addEventListener("click", popupOpen);
		});

		function popupClose() {
			popup.classList.remove("show");
			popup.classList.add("hide");
			document.body.style.overflow = "";
		}

		popupCloseBtn.addEventListener("click", popupClose);

		popup.addEventListener("click", (event) => {
			if (event.target == popup) {
				popupClose();
			}
		});

		document.addEventListener("keydown", (event) => {
			if (event.keyCode == 27 && popup.classList.contains("show")) {
				popupClose();
			}
		});
	};
	createPopup();
});
