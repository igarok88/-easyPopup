window.addEventListener("DOMContentLoaded", () => {
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
});
