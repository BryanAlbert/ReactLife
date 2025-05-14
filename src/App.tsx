import { useState } from 'react';
import LifeGrid from './LifeGrid';
import  Footer from './Footer';
import type { LifeState } from './Types';
import { LoadRpentomino } from './games/Rpentomino';
import { LoadGosperGliderGun } from './games/GosperGliderGun';
import './styles/App.css';

const App = () => {
	const width = 60;
	const height = 50;

	const [selectedGrid, setSelectedGrid] = useState<string>('none');
	const [grid, setGrid] = useState<LifeState[][]>(newGrid());
	const [generation, setGeneration] = useState<number>(0);
	const [population, setPopulation] = useState<number>(0);
	const [isChanged, setIsChanged] = useState<boolean>(false);
	const [running, setRunning] = useState<boolean>(false);

	function newGrid(): LifeState[][] {
		return Array.from({ length: height },
			() => Array.from({ length: width }, () => 'none'));
	}
		
	const reset = (): void => {
		setSelectedGrid('none');
		setGrid(newGrid());
		setGeneration(0);
		setPopulation(0);
		setIsChanged(false);
		setRunning(false);
	}

	const load = (): void => {
		switch (selectedGrid)
		{
			case 'none':
				reset();
				break;
			case 'R-Pentomino':
				setGrid(LoadRpentomino(newGrid));
				break;
			case 'GosperGliderGun':
				setGrid(LoadGosperGliderGun(newGrid));
				break;
		}

		setIsChanged(false);
	}

	const toggleRunning = (): void => {
		setRunning(running => !running);
		setIsChanged(true);
	}

	const next = (): void => {
		setIsChanged(true);
	}

	const updatedGrid = (grid: LifeState[][]): void => {
		setGrid(grid);
		const flat = grid.flat().map((cell) => cell === 'alive' ? 1 : 0);
		setPopulation(flat.reduce<number>((sum, cell) => sum + cell, 0));
		setIsChanged(true);
	}

	return (
		<>
			<h2>Conway's Game of Life</h2>
			<div className="card">
				<LifeGrid grid={grid} updateGrid={updatedGrid} />
			</div>
			<div className="card">
				<div className="horizontal-card">
					<p>{`Generation: ${generation}`}</p>
					<p>{`Population: ${population}`}</p>
					<p>{`${running ? "R" : "Not r"}unning`}</p>
					<select className="select" value={selectedGrid}
							onChange={(selected) => setSelectedGrid(selected.target.value)}>
						<option value="none">none</option>
						<option value="R-Pentomino">R-pentomino</option>
						<option value="GosperGliderGun">Gosper Glider Gun</option>
					</select>
				</div>
				<div className="horizontal-card">
					<button type="button" onClick={() => reset()}>Reset</button>
					<button type="button" disabled={selectedGrid === 'none'}
						onClick={() => load()}>{`${isChanged && selectedGrid !== 'none' ?
						"Rel" : "L"}oad`}</button>
					<button type="button" onClick={() => next()}>Next</button>
					<button type="button"
						onClick={() => toggleRunning()}>{running ? 'Pause' : 'Run'}
					</button>
				</div>
			</div>
		<Footer />
		</>
	)
}

export default App;
