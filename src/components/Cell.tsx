import type { ReactElement } from 'react';
import type { LifeState } from '../Types';
import '../styles/cell.css';

interface CellProps {
	row: number;
	column: number;
	state: LifeState;
	updateState: (row: number, column: number, living: LifeState) => void;
}

const Cell = ({ row, column, state, updateState }: CellProps): ReactElement => {
	return (
		<div className={ `cell ${state}`}
			onClick={() => updateState(row, column, state === 'alive' ? 'none' : 'alive')} />
	);
}

export default Cell;
