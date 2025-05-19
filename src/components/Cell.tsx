import type { ReactElement } from 'react';
import type { LifeState } from '../Types';
import '../styles/cell.css';

// Due to performance problems, this component (and the LifeGrid component) have been
// replaced with the Canvas component. It's left in the codebase for posterity.

interface CellProps {
	row: number;
	column: number;
	state: LifeState;
	updateState: (row: number, column: number, living: LifeState) => void;
}

const Cell = ({ row, column, state, updateState }: CellProps): ReactElement => (
	<div className={`cell ${state}`}
		onClick={() => updateState(row, column, state === 'alive' ? 'none' : 'alive')} />
)

export default Cell;
