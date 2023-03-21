import Darkmode from "./Darkmode";
import css from "../styles/Header.module.css";

function Header() {
	return (
		<header id={css.header}>
			<img id={css.logo} src="/assets/svg/logo.svg" alt="DictionaryApp" />
			<Darkmode />
		</header>
	);
}
export default Header;
