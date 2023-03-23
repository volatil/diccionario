export function playPronunciacion() {
	document.getElementById("elaudio").play();
}

export function mododarkmode(estado) {
	if ( estado === "desactivar" ) {
		const cambioOSCURO = document.querySelector("body");
		cambioOSCURO.classList.add("darkmode");
		localStorage.setItem("diccionario_darkmode", "activado");
	} else {
		const cambioOSCURO = document.querySelector("body");
		cambioOSCURO.classList.remove("darkmode");
		localStorage.setItem("diccionario_darkmode", "desactivado");
	}
}

export const callAPIreloaded = async function (lapalabra) {
	const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${lapalabra}`;
	const res = await fetch( api );
	const data = await res.json();
	if ( data.title ) {
		return false;
	}

	const todo = [];

	// PALABRA
	todo.push({ palabra: data[0].word });

	// PRONUNCIACION
	todo.push({ pronunciacion: data[0].phonetic });

	// AUDIO
	const audio = [];
	for ( let count = 0; count <= data[0].phonetics.length - 1; count++ ) {
		if ( data[0].phonetics[count].audio.length >= 4 ) {
			audio.push(data[0].phonetics[count].audio);
		}
	}
	todo.push({ audio: audio[0] });

	// DEFINICIONES
	const definiciones = [];
	for ( let count = 0; count <= data[0].meanings[0].definitions.length - 1; count++ ) {
		definiciones.push(data[0].meanings[0].definitions[count].definition);
	}
	todo.push({ definiciones });

	// SINONIMOS
	todo.push({ sinonimos: data[0].meanings[0].synonyms });

	// FUENTE
	todo.push({ fuente: data[0].sourceUrls });

	// TEST lo pusheado al array
	// console.debug( todo );
	return todo;
};
