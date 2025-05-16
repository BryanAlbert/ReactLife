import type { LifeState } from "../Types";

// LifeState[][] has the shape [row][column] (row major)
export const loadGosperGliderGun = (newGrid: () => LifeState[][]): LifeState[][] =>	{
	const grid: LifeState[][] = newGrid();
	grid[1][25] = 'alive';
	grid[2][23] = 'alive';
	grid[2][24] = 'alive';
	grid[3][13] = 'alive';
	grid[3][14] = 'alive';
	grid[3][21] = 'alive';
	grid[3][22] = 'alive';
	grid[3][35] = 'alive';
	grid[3][36] = 'alive';
	grid[4][12] = 'alive';
	grid[4][16] = 'alive';
	grid[4][21] = 'alive';
	grid[4][22] = 'alive';
	grid[4][35] = 'alive';
	grid[4][36] = 'alive';
	grid[5][1] = 'alive';
	grid[5][2] = 'alive';
	grid[5][11] = 'alive';
	grid[5][17] = 'alive';
	grid[5][21] = 'alive';
	grid[5][22] = 'alive';
	grid[6][1] = 'alive';
	grid[6][2] = 'alive';
	grid[6][11] = 'alive';
	grid[6][15] = 'alive';
	grid[6][17] = 'alive';
	grid[6][18] = 'alive';
	grid[6][23] = 'alive';
	grid[6][25] = 'alive';
	grid[7][11] = 'alive';
	grid[7][17] = 'alive';
	grid[7][25] = 'alive';
	grid[8][12] = 'alive';
	grid[8][16] = 'alive';
	grid[9][13] = 'alive';
	grid[9][14] = 'alive';
	return grid;
}
