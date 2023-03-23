import Darkmode from "./Darkmode";
import css from "../styles/Header.module.css";

function Header(props) {
	const { limpiar } = props;
	function limpiezaInput() {
		document.querySelector("#inputBUSCADOR").value = "";
	}

	return (
		<header id={css.header}>
			{/* eslint-disable */}
			<img
				id={css.logo}
				src="/assets/svg/logo.svg"
				alt="DictionaryApp"
				onClick={() => { limpiar(), limpiezaInput() }}
			/>
			{/* eslint-enable */}
			<Darkmode />
		</header>
	);
}
export default Header;
