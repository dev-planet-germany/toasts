function toastEinblenden(toast) {
	// Prüfe, ob das Element bereits sichtbar ist
	// und beende ggf. die Ausführung
	if (toast.classList.contains("block")) {
		return;
	}

	// Entferne den transitionend Event Listener
	toast.removeEventListener("transitionend", blockKlasseEntfernen);

	// Hänge den Toast ans Ende des Behälters
	document.querySelector(".toast-behaelter").appendChild(toast);

	// Mache den Toast zum Block-Level-Element
	toast.classList.add("block");

	// Warte mindestens eine Bildaktualisierung lang
	// und mache dann den Toast mit der eingeblendet-Klasse sichtbar
	setTimeout(function () {
		toast.classList.add("eingeblendet");
	}, 1);

	// Ermittle die im data-anzeigedauer Attribut hinterlegte Anzeigedauer
	const anzeigedauer = toast.getAttribute("data-anzeigedauer");

	// Gibt es eine Anzeigedauer, warte die angegebene Dauer ab
	// und rufe dann die toastAusblenden-Funktion für den Toast auf
	if (anzeigedauer !== null) {
		setTimeout(toastAusblenden, anzeigedauer, toast);
	}
}

function toastAusblenden(toast) {
	// Entferne zuerst die eingeblendet-Klasse
	toast.classList.remove("eingeblendet");

	// Warte, bis die Animation durchgelaufen ist
	// Entferne erst dann die block-Klasse vom Toast
	toast.addEventListener("transitionend", blockKlasseEntfernen);
}

function blockKlasseEntfernen(ereignis) {
	ereignis.target.classList.remove("block");
}

function alleToastsEinblenden() {
	document.querySelectorAll(".toast").forEach(toastEinblenden);
}
