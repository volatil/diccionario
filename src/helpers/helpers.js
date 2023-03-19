export const asdasd = function () {
	// asdasd
};

export function mododarkmode(estado) {
	if ( estado === "activar" ) {
		console.debug( "activando ..." );
		const miHTML2 = document.querySelector("html");
		miHTML2.classList.add("darkmode");
	} else {
		console.debug( "desactivando ..." );
		const miHTML2 = document.querySelector("html");
		miHTML2.classList.remove("darkmode");
	}
}
