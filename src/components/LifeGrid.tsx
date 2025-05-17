import Cell from './Cell';
import type { ReactElement } from 'react';
import type { LifeState } from '../Types';
import { updateGridCell } from '../gridFunctions';
import '../styles/LifeGrid.css';

// Due to performance problems, this component (and the Cell component) have been 
// replaced with the Canvas component. It's left in the codebase for posterity. 

export interface GridProps {
	grid: LifeState[][];
	updateGrid: (grid: LifeState[][]) => void;
}

const LifeGrid = ({ grid, updateGrid }: GridProps): ReactElement => {
	const width: number = grid[0].length;
	const height: number = grid.length;
	return (
		<div className="grid"
			style={{ '--columns': width, '--rows': height } as React.CSSProperties}>
				{grid.map((line, row) => line.map((state, column) => (
					<Cell key={`${line.length * row + column}`} row={row} column={column}
						state={state} updateState={(row: number, column: number, state: LifeState): void =>
							updateGrid(updateGridCell({ grid, row, column, state }))
						} />
				)))}
		</div>
	);
}

export default LifeGrid;
