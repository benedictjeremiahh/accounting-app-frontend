import { useCallback, useReducer } from "react";
import React from "react";
import Snackbar from "components/Snackbar/Snackbar";

const formReducer = (state, action) => {
	switch (action.type) {
		case "OPEN_SNACKBAR":
			return {
				...state,
				open: true,
				place: action.place,
				color: action.color,
				message: action.message,
			};
		case "CLOSE_SNACKBAR":
			return {
				...state,
				open: false,
				// message: "",
				// color: "info",
				// place: "tr",
			};
		default:
			return state;
	}
};

const useSnackbar = (
	onClose = () => {},
	open = false,
	message = "",
	color = "info",
	place = "tr"
) => {
	const [state, dispatch] = useReducer(formReducer, {
		open,
		message,
		color,
		place,
		closeNotification: () => {
			onClose();
			dispatch({
				type: "CLOSE_SNACKBAR",
			});
		},
	});

	const snackbar = () => {
		return <Snackbar {...state} close />;
	};

	const openSnackbar = useCallback((place, color, message) => {
		dispatch({
			type: "OPEN_SNACKBAR",
			place,
			color,
			message,
		});
	}, []);

	const closeSnackbar = useCallback((onClose = () => {}) => {
		onClose();
		dispatch({
			type: "CLOSE_SNACKBAR",
		});
	}, []);

	return { snackbar, state, openSnackbar, closeSnackbar };
};

export default useSnackbar;
