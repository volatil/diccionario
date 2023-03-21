import { useState, useEffect } from "react";
import { mododarkmode } from "@/helpers/helpers";
import css from "@/styles/Darkmode.module.css";

export default function Darkmode() {
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
			<div className={darkmode === "activado" ? `${css.fakeINPUT} ${css.activado}` : `${css.fakeINPUT} ${css.desactivado}`}>
				<span className={darkmode === "activado" ? `${css.circulo} ${css.activado}` : `${css.circulo} ${css.desactivado}`} />
			</div>
			<img className={css.isotipo} src={darkmode === "activado" ? "/assets/svg/darkmode_moon.svg" : "/assets/svg/darkmode_sun.svg"} alt="definicion" />
		</button>
	);
}
