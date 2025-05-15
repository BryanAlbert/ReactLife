import Cell from './Cell';
import type { LifeState } from '../Types';
import { updateGridCell } from '../gridFunctions';
import '../styles/LifeGrid.css';

export interface GridProps {
	grid: LifeState[][];
	updateGrid: (grid: LifeState[][]) => void;
}

const LifeGrid = ({ grid, updateGrid }: GridProps) => {
	const width: number = grid[0].length;
	const height: number = grid.length;

	const updateState = (row: number, column: number, state: LifeState): void => {
		updateGrid(updateGridCell(grid, row, column, state));
	}

	return (
		<div className="grid"
			style={{ '--columns': width, '--rows': height } as React.CSSProperties}>
				{grid.map((row, y) => row.map((state, x) => (
					<Cell key={`${row.length * y + x}`} row={y} column={x}
						state={state} updateState={updateState} />
				)))}
		</div>
	);
}

export default LifeGrid;
