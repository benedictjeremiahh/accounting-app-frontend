import UserActionTypes from "./user.types";

const INITIAL_STATE = {
	currentUser: null,
	error: null,
	loading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.EMAIL_SIGN_IN_START:
			return {
				...state,
				loading: true,
			};
		case UserActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				error: null,
				loading: false,
			};
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
			};
		case UserActionTypes.SIGN_IN_FAILURE:
		case UserActionTypes.SIGN_OUT_FAILURE:
		case UserActionTypes.SIGN_UP_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case UserActionTypes.CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export default userReducer;
