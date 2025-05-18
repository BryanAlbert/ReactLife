import { useState, useEffect, type ReactElement } from 'react';
import type { LifeState } from '../Types';
import Canvas from './Canvas';
import Footer from './Footer';
import { loadRpentomino, loadRpentominoCorner } from '../games/Rpentomino';
import { loadGosperGliderGun } from '../games/GosperGliderGun';
import { computeNextGeneration } from '../gridFunctions';
import '../styles/App.css';
import DiscreteSlider from './Slider';

const App = (): ReactElement => {
	const width = 60;
	const height = 50;
	const initialDelay = 1000;
	const delayStepSize = 50;
	const minimumDelay = 0;
	const maximumDelay = 1000;

	const [selectedGrid, setSelectedGrid] = useState<string>('none');
	const [currentGrid, setCurrentGrid] = useState<string>('none');
	const [grid, setGrid] = useState<LifeState[][]>(newGrid());
	const [generation, setGeneration] = useState<number>(0);
	const [population, setPopulation] = useState<number>(0);
	const [isChanged, setIsChanged] = useState<boolean>(false);
	const [running, setRunning] = useState<boolean>(false);
	const [delay, setDelay] = useState<number>(initialDelay);

	useEffect(() => {
		setPopulation(grid.flat().map(cell => cell === 'alive' ? 1 : 0).
			reduce<number>((sum, cell) => sum + cell, 0));

		setIsChanged(true);
	}, [grid]);

	useEffect(() => {
		const id: number | null = running ? setInterval(next, delay) : null;
		return () => {
			if (id)
				clearInterval(id);
		}
	}, [running, delay]);

	function newGrid(): LifeState[][] {
		return Array.from({ length: height },
			() => Array.from({ length: width }, () => 'none'));
	}

	const reset = (): void => {
		setRunning(false);
		setDelay(initialDelay);
		setSelectedGrid('none');
		setCurrentGrid('none');
		setGrid(newGrid());
		setGeneration(0);
		setPopulation(0);
		setIsChanged(false);
	}

	const load = (): void => {
		setRunning(false);
		setGeneration(1);
		setCurrentGrid(selectedGrid);
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
		console.log(`Computing next generation at ${new Date().toISOString()}`);
		setGeneration(generation => generation + 1);
		setGrid(grid => computeNextGeneration({ grid, width, height }));
	}

	const changeDelay = (offset: number): void => {
		console.log(`Changing delay to: ${Math.max(minimumDelay, delay + offset)}`);
		setDelay(delay => Math.max(minimumDelay, delay + offset));
	}

	const updateDelay = (delay: number): void => {
		console.log(`Changing delay to: ${delay}`);
		setDelay(delay);
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
						onChange={selected => setSelectedGrid(selected.target.value)}>
					<option value="none">none</option>
					<option value="R-Pentomino">R-pentomino</option>
					<option value="GosperGliderGun">Gosper Glider Gun</option>
				</select>
				<p>{`Generation: ${generation}`}</p>
				<p>{`Population: ${population}`}</p>
				<p>{`${running ? "R" : "Not r"}unning`}</p>
			</div>

			<div className="card">
				<Canvas grid={grid} width={width} height={height} updateGrid={updatedGrid} />
			</div>

			<div className="horizontal-card">
				<button className="button" type="button" disabled={selectedGrid === 'none'}
					onClick={() => load()}>{`${isChanged && selectedGrid !== 'none' &&
					selectedGrid === currentGrid ? "Rel" : "L"}oad`}</button>
				<button className="button" type="button" disabled={population === 0}
					onClick={() => reset()}>Reset</button>
				<button className="button" type="button" disabled={population === 0 ||
					running} onClick={() => next()}>Next</button>
				<button className="button" type="button" disabled={population === 0}
					onClick={() => setRunning(running => !running)}>{running ? 'Stop' : 'Run'}
				</button>
				<DiscreteSlider initial={initialDelay} min={minimumDelay} max={maximumDelay}
					step={delayStepSize} update={updateDelay}/>
			</div>

			<Footer />
		</>
	)
}

export default App;
