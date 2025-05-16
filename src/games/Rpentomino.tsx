import type { LifeState } from "../Types";

// LifeState[][] has the shape [row][column] (row major)
export const loadRpentomino = (newGrid: () => LifeState[][]): LifeState[][] => {
	const grid: LifeState[][] = newGrid();
	grid[24][28] = 'alive';
	grid[23][29] = 'alive';
	grid[24][29] = 'alive';
	grid[25][29] = 'alive';
	grid[25][30] = 'alive';
	return grid;
}

// LifeState[][] has the shape [row][column] (row major)
// for testing: figure is in the upper left with a 1 cell border, use with 5 x 5 grid
export const loadRpentominoCorner = (newGrid: () => LifeState[][]): LifeState[][] => {
	const grid: LifeState[][] = newGrid();
	grid[2][1] = 'alive';
	grid[1][2] = 'alive';
	grid[2][2] = 'alive';
	grid[3][2] = 'alive';
	grid[3][3] = 'alive';
	return grid;
}
