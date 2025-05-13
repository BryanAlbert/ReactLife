import { useState } from 'react';
import LifeGrid from './LifeGrid';
import  Footer from './Footer';
import type { LifeState } from './Types';
import './styles/App.css';

const App = () => {
	const width = 5;
	const height = 5;

	const [grid, setGrid] = useState<LifeState[][]>(newGrid());
	
	function newGrid(): LifeState[][] {
		return Array.from({ length: height},
			() => Array.from({ length: width}, () => 'none'));
	}
		
	const reset = (): void => {
		setGrid(newGrid());
	}

	return (
		<>
			<h1>Conway's Game of Life</h1>
			<div className="card">
				<LifeGrid width={width} height={height} grid={grid} setGrid={setGrid} />
			</div>
			<div className="card">
				<button type="button" onClick={() => reset()}>
					Reset
				</button>
			</div>
		<Footer />
		</>
	)
}

export default App;
