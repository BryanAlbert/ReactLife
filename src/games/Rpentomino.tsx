import type { LifeState } from "../Types";

// LifeState has the shape [column][row]
export const LoadRpentomino = (newGrid: () => LifeState[][]): LifeState[][] => {
	const grid: LifeState[][] = newGrid();
	grid[24][28] = 'alive';
	grid[23][29] = 'alive';
	grid[24][29] = 'alive';
	grid[25][29] = 'alive';
	grid[25][30] = 'alive';
	return grid;
}
