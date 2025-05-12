
import type { LifeState } from './Types';
import './styles/cell.css';

interface CellProps {
	living?: LifeState;
	setLifeState: (living: LifeState) => void;
}

const Cell = ( { living, setLifeState }: CellProps ) => {
	return (
		<div className={ `cell ${living === 'living' ? 'alive' : ''}`}
			onClick={ () => setLifeState(living === 'living' ? 'dead' : 'living')} />
	);
}

export default Cell;
