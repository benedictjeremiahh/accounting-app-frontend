import axios from "axios";
import { takeLatest, put, all, call, select } from "redux-saga/effects";
import {
	signInFailure,
	signInSuccess,
	signOutFailure,
	signOutSuccess,
	signUpFailure,
	signUpSuccess,
} from "./user.action";
import { selectCurrentUser } from "./user.selector";
import UserActionTypes from "./user.types";

const baseUrlApi = process.env.REACT_APP_BASE_URL_API;

export function* signInWithEmail({ payload }) {
	try {
		const result = yield axios.post(`${baseUrlApi}/auth/login`, payload);
		const userData = result.data.data;
		yield put(signInSuccess(userData));
	} catch (error) {
		let message;
		switch (error.response.status) {
			case 403:
				message = "Invalid Email / Username and Password";
				break;
			case 500:
				message = error.response.data.message;
				break;
			default:
				break;
		}
		yield put(signInFailure(message));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield select(selectCurrentUser);
		if (!userAuth) return;

		yield signInSuccess(userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
	try {
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signUp({ payload: { displayName, email, password } }) {
	try {
		// const { user } = yield auth.createUserWithEmailAndPassword(
		// 	email,
		// 	password
		// );
		// yield put(signUpSuccess({ user, additionalData: { displayName } }));
	} catch (error) {
		yield put(signUpFailure(error));
	}
}

export function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
	// yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
	yield all([
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}
