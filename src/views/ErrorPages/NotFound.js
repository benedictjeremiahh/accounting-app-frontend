import { Card, Divider, Grid } from "@material-ui/core";
import React from "react";
import { useStyles } from "./NotFound.styles";

const NotFound = () => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<Grid
				container
				justify="center"
				alignContent="center"
				alignItems="center"
			>
				<h1>404</h1>
				<Divider orientation="vertical" flexItem variant="middle" />
				<h3>Error Not Found</h3>
			</Grid>
		</Card>
	);
};

export default NotFound;
