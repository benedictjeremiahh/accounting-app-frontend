import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import LoginBackground from "assets/img/login-background.jpeg";
import { useStyles } from "./Login.styles";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { emailSignInStart } from "redux/user/user.action";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="">
				Benedict Jeremiah H
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const Login = (props) => {
	const classes = useStyles();
	const { register, handleSubmit, errors } = useForm();
	const loading = false;

	const login = async (data) => {
		const { emailSignInStart } = props;
		emailSignInStart(data);
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />

			<Grid item xs={false} sm={4} md={7} className={classes.image}>
				<img
					className={classes.backgroundImage}
					src={LoginBackground}
					alt="login background"
				/>
			</Grid>
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<div className={classes.paper}>
					{/* <img src={HavillaLogo} alt="logo"></img> */}
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<form
						className={classes.form}
						onSubmit={handleSubmit(login)}
					>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="email"
							label="Email Address / Username"
							name="email"
							autoComplete="email"
							autoFocus
							inputRef={register({
								required: {
									value: true,
									message: "Email / Username are required",
								},
							})}
							error={!!errors.email}
							helperText={errors.email && errors.email.message}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							inputRef={register({
								required: {
									value: true,
									message: "Password are required",
								},
							})}
							error={!!errors.password}
							helperText={
								errors.password && errors.password.message
							}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							{loading ? (
								<CircularProgress color="inherit" />
							) : (
								"Sign In"
							)}
						</Button>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

const mapDispatchToProps = (dispatch) => ({
	emailSignInStart: (credentials) => dispatch(emailSignInStart(credentials)),
});
export default connect(null, mapDispatchToProps)(Login);
