import type { LifeState, Point } from './Types'

export interface GridCellProps {
	grid: LifeState[][],
	x: number,
	y: number,
	state: LifeState
}

export const updateGridCell = ({ grid, x, y, state }: GridCellProps): LifeState[][] => {
	const update: LifeState[][] = [...grid].map(column => [...column]);
	update[x][y] = state;
	return update;
}	

export interface GridProps {
	grid: LifeState[][],
	width: number,
	height: number
}
		
const isCellAlive = ({ grid, width, height }: GridProps, { x, y }: Point): number => {
	// LifeState[][] has the shape [row][column] (row major) so... swap x and y
	return x < 0 || x >= width || y < 0 || y >= height ? 0 :
		grid[y][x] === 'alive' ? 1 : 0;
}

const countNeighbors = ({ grid, width, height }: GridProps,	{ x, y }: Point): number => {
	const directions: Point[] = [
		{ x: 1, y: 0 },
		{ x: 1, y: 1 },
		{ x: 0, y: 1 },
		{ x: -1, y: 1 },
		{ x: -1, y: 0 },
		{ x: -1, y: -1 },
		{ x: 0, y: -1 },
		{ x: 1, y: -1 }
	];

	return directions.reduce((sum, offset) => sum +
		isCellAlive({ grid, width, height }, { x: x + offset.x, y: y + offset.y }), 0);
}
	
export const computeNextGeneration = ({ grid, width, height }: GridProps):
	LifeState[][] => {
	const next: LifeState[][] = grid.map((row, y) => row.map((state, x) => {
		const neighborCount: number = countNeighbors({ grid, width, height }, {x, y});
		return state === 'alive' ?
			neighborCount > 1 && neighborCount < 4 ? 'alive' : 'dead' :
			neighborCount == 3 ? 'alive' : 'none';
	}));

	return next;
}

