import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { type ReactElement } from "react";

interface AboutDialogProps {
	open: boolean;
	setOpen: (value: boolean) => void;
}

const AboutDialog = ({ open, setOpen }: AboutDialogProps): ReactElement => (
	<React.Fragment>
		<Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="about-dialog-title"
			aria-describedby="about-dialog-description">
			<DialogTitle>Conway's Game of Life</DialogTitle>
			<DialogContent id="alert-dialog-description">
				Welcome to the Game of Life.
				There are four rules:
				<ol>
					<li>If a cell has fewer than two neighbors it dies of loneliness.</li>
					<li>If a cell has two or three neighbors it lives to see another day.</li>
					<li>If a cell has more than three neighbors it dies of overcrowding.</li>
					<li>If an empty cell has three neighbors, it comes to life!</li>
				</ol>
				<p>Create a community by clicking on the grid to bring cells to life (or death).
					Click <strong>Next</strong> to see what happens to the next generation.
					Click <strong>Run</strong> to see the simulation run.
				</p>
				<p>See <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">
					Conway's Game of Life</a> on Wikipedia for more information.
				</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>Play!</Button>
			</DialogActions>
		</Dialog>
	</React.Fragment>
);

export default AboutDialog;
