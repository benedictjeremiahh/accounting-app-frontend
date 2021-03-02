import { makeStyles } from "@material-ui/core/styles";
import Background from "../../assets/img/background-not-found-404.png";

export const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		// backgroundImage: `url(${Background})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
	},
}));
