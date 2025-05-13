import type { LifeState } from './Types';
import './styles/cell.css';

interface CellProps {
	row: number;
	column: number;
	living: LifeState;
	setLifeState: (row: number, column: number, living: LifeState) => void;
}

const Cell = ({ living: state, setLifeState, row: row, column: column }: CellProps) => {
	return (
		<div className={ `cell ${state}`}
			onClick={ () => setLifeState(row, column, 
				state === 'alive' ? 'none' : 'alive')} />
	);
}

export default Cell;
