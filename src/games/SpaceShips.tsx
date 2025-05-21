import { translateGrid } from "../gridFunctions";
import type { LifeState } from "../Types";

export const loadSpaceShips = (newGrid: () => LifeState[][]): LifeState[][] => {
const grid: LifeState[][] = newGrid();
	grid[4][3] = 'alive';
	grid[4][4] = 'alive';
	grid[4][5] = 'alive';
	grid[3][5] = 'alive';
	grid[2][4] = 'alive';

	grid[2][13] = 'alive';
	grid[4][13] = 'alive';
	grid[5][14] = 'alive';
	grid[5][15] = 'alive';
	grid[5][16] = 'alive';
	grid[5][17] = 'alive';
	grid[4][17] = 'alive';
	grid[3][17] = 'alive';
	grid[2][16] = 'alive';

	grid[10][8] = 'alive';
	grid[12][8] = 'alive';
	grid[13][9] = 'alive';
	grid[13][10] = 'alive';
	grid[13][11] = 'alive';
	grid[13][12] = 'alive';
	grid[13][13] = 'alive';
	grid[12][13] = 'alive';
	grid[11][13] = 'alive';
	grid[10][12] = 'alive';
	grid[9][10] = 'alive';

	grid[18][3] = 'alive';
	grid[20][3] = 'alive';
	grid[21][4] = 'alive';
	grid[21][5] = 'alive';
	grid[21][6] = 'alive';
	grid[21][7] = 'alive';
	grid[21][8] = 'alive';
	grid[21][9] = 'alive';
	grid[20][9] = 'alive';
	grid[19][9] = 'alive';
	grid[18][8] = 'alive';
	grid[17][5] = 'alive';
	grid[17][6] = 'alive';
	return translateGrid(grid);
}
