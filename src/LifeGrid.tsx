import Cell from './Cell';
import type { LifeState } from './Types';
import './styles/LifeGrid.css';

export interface GridProps {
	width: number;
	height: number;
	grid: LifeState[][];
	setGrid: (grid: LifeState[][]) => void;
}

const LifeGrid = ({ width, height, grid, setGrid }: GridProps) => {
	const updateLifeState = (row: number, column: number, state: LifeState): void => {
		const update = [...grid];
		update[row][column] = state;
		setGrid(update);
	}

	return (
		<div className="grid"
			style={{ '--columns': width, '--rows': height } as React.CSSProperties}>
			<Cell row={0} column={0} living={grid[0][0]} setLifeState={updateLifeState} />
			<Cell row={0} column={1} living={grid[0][1]} setLifeState={updateLifeState} />
			<Cell row={0} column={2} living={grid[0][2]} setLifeState={updateLifeState} />
			<Cell row={0} column={3} living={grid[0][3]} setLifeState={updateLifeState} />
			<Cell row={0} column={4} living={grid[0][4]} setLifeState={updateLifeState} />
			<Cell row={1} column={0} living={grid[1][0]} setLifeState={updateLifeState} />
			<Cell row={1} column={1} living={grid[1][1]} setLifeState={updateLifeState} />
			<Cell row={1} column={2} living={grid[1][2]} setLifeState={updateLifeState} />
			<Cell row={1} column={3} living={grid[1][3]} setLifeState={updateLifeState} />
			<Cell row={1} column={4} living={grid[1][4]} setLifeState={updateLifeState} />
			<Cell row={2} column={0} living={grid[2][0]} setLifeState={updateLifeState} />
			<Cell row={2} column={1} living={grid[2][1]} setLifeState={updateLifeState} />
			<Cell row={2} column={2} living={grid[2][2]} setLifeState={updateLifeState} />
			<Cell row={2} column={3} living={grid[2][3]} setLifeState={updateLifeState} />
			<Cell row={2} column={4} living={grid[2][4]} setLifeState={updateLifeState} />
			<Cell row={3} column={0} living={grid[3][0]} setLifeState={updateLifeState} />
			<Cell row={3} column={1} living={grid[3][1]} setLifeState={updateLifeState} />
			<Cell row={3} column={2} living={grid[3][2]} setLifeState={updateLifeState} />
			<Cell row={3} column={3} living={grid[3][3]} setLifeState={updateLifeState} />
			<Cell row={3} column={4} living={grid[3][4]} setLifeState={updateLifeState} />
			<Cell row={4} column={0} living={grid[4][0]} setLifeState={updateLifeState} />
			<Cell row={4} column={1} living={grid[4][1]} setLifeState={updateLifeState} />
			<Cell row={4} column={2} living={grid[4][2]} setLifeState={updateLifeState} />
			<Cell row={4} column={3} living={grid[4][3]} setLifeState={updateLifeState} />
			<Cell row={4} column={4} living={grid[4][4]} setLifeState={updateLifeState} />
		</div>
	);
}

export default LifeGrid;
