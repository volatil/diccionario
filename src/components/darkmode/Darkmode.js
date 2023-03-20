import { useState, useEffect } from "react";
import { mododarkmode } from "@/helpers/helpers";
import css from "@/styles/Darkmode.module.css";

function Darkmode() {
	const [darkmode, setdarkmode] = useState("desactivado");

	useEffect(() => {
		if ( localStorage.getItem("diccionario_darkmode") ) {
			if ( localStorage.getItem("diccionario_darkmode") === "activado" ) {
				mododarkmode("activar");
				setdarkmode("activado");
			} else {
				mododarkmode("desactivar");
				setdarkmode("desactivado");
			}
		} else {
			localStorage.setItem("diccionario_darkmode", "desactivado");
		}
	}, []);

	return (
		<button id={css.darkmode} type="button" onClick={() => { if ( darkmode === "activado" ) { mododarkmode("desactivar"); setdarkmode("desactivado"); } else { mododarkmode("activar"); setdarkmode("activado"); } }}>
			<div className={darkmode === "activado" ? `${css.fakeINPUT} ${css.desactivado}` : `${css.fakeINPUT} ${css.activado}`}>
				<span className={darkmode === "activado" ? `${css.circulo} ${css.desactivado}` : `${css.circulo} ${css.activado}`} />
			</div>
			<img className={css.isotipo} src={darkmode === "activado" ? "/assets/svg/darkmode_sun.svg" : "/assets/svg/darkmode_moon.svg"} alt="definicion" />
		</button>
	);
}
export default Darkmode;
