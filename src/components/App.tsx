import { useState, useEffect, type ReactElement } from 'react';
import LifeGrid from './LifeGrid';
import Footer from './Footer';
import type { LifeState } from '../Types';
import { loadRpentomino, loadRpentominoCorner } from '../games/Rpentomino';
import { loadGosperGliderGun } from '../games/GosperGliderGun';
import { computeNextGeneration } from '../gridFunctions';
import '../styles/App.css';

const App = (): ReactElement => {
	const width = 60;
	const height = 50;

	const [selectedGrid, setSelectedGrid] = useState<string>('none');
	const [grid, setGrid] = useState<LifeState[][]>(newGrid());
	const [generation, setGeneration] = useState<number>(0);
	const [population, setPopulation] = useState<number>(0);
	const [isChanged, setIsChanged] = useState<boolean>(false);
	const [running, setRunning] = useState<boolean>(false);
	const [intervalId, setintervalId] = useState<number>();
	const [delay, setDelay] = useState<number>(1000);

	useEffect(() => {
		setPopulation(grid.flat().map((cell) => cell === 'alive' ? 1 : 0).
			reduce<number>((sum, cell) => sum + cell, 0));

		setIsChanged(true);
	}, [grid]);

	function newGrid(): LifeState[][] {
		return Array.from({ length: height },
			() => Array.from({ length: width }, () => 'none'));
	}

	const reset = (): void => {
		stopRunning();
		setSelectedGrid('none');
		setGrid(newGrid());
		setGeneration(0);
		setPopulation(0);
		setIsChanged(false);
	}

	const load = (): void => {
		stopRunning();
		setGeneration(1);
		switch (selectedGrid)
		{
			case 'none':
				reset();
				break;
			case 'R-Pentomino':
				setGrid(loadRpentomino(newGrid));
				break;
			case 'R-Pentomino-Corner':
				setGrid(loadRpentominoCorner(newGrid));
				break;
			case 'GosperGliderGun':
				setGrid(loadGosperGliderGun(newGrid));
				break;
		}

		setIsChanged(false);
	}

	const next = (): void => {
		setGeneration(generation => generation + 1);
		setGrid(grid => computeNextGeneration({ grid, width, height }));
	}

	const stopRunning = (): void => {
			setRunning(false);
			clearInterval(intervalId);
	}

	const toggleRunning = (): void => {
		if (running) {
			stopRunning();
		} else {
			setRunning(true);
			setintervalId(setInterval(() => next(), delay));
		}
	}

	const updatedGrid = (grid: LifeState[][]): void => {
		setGrid(grid);
		setIsChanged(true);
	}

	return (
		<>
			<h2>Conway's Game of Life</h2>
			<div className="horizontal-card">
				<select className="select" value={selectedGrid}
						onChange={(selected) => setSelectedGrid(selected.target.value)}>
					<option value="none">none</option>
					<option value="R-Pentomino">R-pentomino</option>
					<option value="GosperGliderGun">Gosper Glider Gun</option>
				</select>
				<p>{`Generation: ${generation}`}</p>
				<p>{`Population: ${population}`}</p>
				<p>{`${running ? "R" : "Not r"}unning`}</p>
			</div>

			<div className="card">
				<LifeGrid grid={grid} updateGrid={updatedGrid} />
			</div>

			<div className="horizontal-card">
				<button className="button" type="button" disabled={selectedGrid === 'none'}
					onClick={() => load()}>{`${isChanged && selectedGrid !== 'none' &&
						population > 0 ? "Rel" : "L"}oad`}</button>
				<button className="button" type="button" disabled={population === 0 ||
					running} onClick={() => next()}>Next</button>
				<button className="button" type="button" disabled={population === 0}
					onClick={() => toggleRunning()}>{running ? 'Stop' : 'Run'}
				</button>
				<button className="button" type="button" disabled={population === 0}
					onClick={() => reset()}>Reset</button>
			</div>

			<Footer />
		</>
	)
}

export default App;
