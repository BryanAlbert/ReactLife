import type { LifeState, Point } from './Types'

export const m_gridPadding = 35;

export interface GridCellProps {
	grid: LifeState[][];
	row: number;
	column: number;
	state: LifeState
}

export interface GridProps {
	grid: LifeState[][];
	width: number;
	height: number
}

export const updateGridCell = ({ grid, row, column, state }: GridCellProps): LifeState[][] => {
	const update: LifeState[][] = [...grid].map(column => [...column]);
	update[row][column] = state;
	return update;
}

export const translateGrid = (grid: LifeState[][], gridPadding: number=m_gridPadding): LifeState[][] => {
	const width: number = grid[0].length;
	const height: number = grid.length;
	const translated: LifeState[][] = Array.from({ length: height },
		() => Array.from({ length: width }, () => 'none'));

	for (let row: number = 0; row < height - 2 * gridPadding; row++)
		for (let column: number = 0; column < width - 2 * gridPadding; column++)
			translated[row + gridPadding][column + gridPadding] = grid[row][column];

	return translated;
}

// returning a number so that we can add them up to count total neighbors
const isCellAlive = ({ grid, width, height }: GridProps, { row, column }: Point): number => {
	return column < 0 || column >= width || row < 0 || row >= height ? 0 :
		grid[row][column] === 'alive' ? 1 : 0;
}

const countNeighbors = ({ grid, width, height }: GridProps,	{ row, column }: Point): number => {
	const directions: Point[] = [
		{ row: 1, column: 0 },
		{ row: 1, column: 1 },
		{ row: 0, column: 1 },
		{ row: -1, column: 1 },
		{ row: -1, column: 0 },
		{ row: -1, column: -1 },
		{ row: 0, column: -1 },
		{ row: 1, column: -1 }
	];

	return directions.reduce((sum, offset) => sum +
		isCellAlive({ grid, width, height },
			{ row: row + offset.row, column: column + offset.column }), 0);
}

export const computeNextGeneration = (grid: LifeState[][]): LifeState[][] => {
	const width: number = grid[0].length;
	const height: number = grid.length;
	const next: LifeState[][] = grid.map((line, row) => line.map((state, column) => {
		const neighborCount: number = countNeighbors({ grid, width, height }, { row, column });
		return state === 'alive' ?
			neighborCount > 1 && neighborCount < 4 ? 'alive' : 'dead' :
			neighborCount == 3 ? 'alive' : 'none';
	}));

	return next;
}

// On Reset, write the signature for a new load grid function to the console log. The
// Canvas component's onClick handler writes the cell data, e.g. grid[4][5] = 'alive';.
// To create a new game, Reset then click each cell in the grid to write the data.
// Copy the output from console output and paste it to a new .tsx file, then add it
// to the App component's selector control and the load function.
export const generateLoadFunctionInLog = (): void => {
	console.log("import type { LifeState } from '../Types';\n");
	console.log('export const load = (newGrid: () => LifeState[][]): LifeState[][] => {');
	console.log('const grid: LifeState[][] = newGrid();');
}
