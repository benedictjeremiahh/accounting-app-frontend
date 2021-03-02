import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// core components
import Admin from "layouts/Admin.js";
import Login from "views/Login/Login";
import { connect } from "react-redux";
import { selectCurrentUser } from "redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { checkUserSession } from "redux/user/user.action";

const App = (props) => {
	const { checkUserSession } = props;
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);
	return (
		<Switch>
			<Route
				exact
				path="/login"
				render={() =>
					props.currentUser ? <Redirect to="/admin" /> : <Login />
				}
			/>
			<Route
				path="/admin"
				render={() =>
					props.currentUser ? <Admin /> : <Redirect to="/login" />
				}
			/>
			<Redirect from="/" to="/admin/dashboard" />
		</Switch>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
