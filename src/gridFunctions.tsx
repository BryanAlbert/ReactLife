import type { LifeState } from "./Types";

export const updateGridCell = (grid: LifeState[][], row: number, column: number,
	state: LifeState): LifeState[][] => {
	const update: LifeState[][] = [...grid].map(column => [...column]);
	update[row][column] = state;
	return update;
}

export const computeNextGeneration = (grid: LifeState[][]): LifeState[][] => {
	const next: LifeState[][] = grid.map((row, y) => row.map((cell, x) => {
		return cell;
	}));

	return next;
}

