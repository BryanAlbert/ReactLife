import React, { useState, useEffect, type ReactElement } from 'react';
import type { LifeState } from '../Types';
import AboutDialog from './About';
import Canvas from './Canvas';
import DiscreteSlider from './Slider';
import Footer from './Footer';
import { loadRpentomino, loadRpentominoCorner } from '../games/Rpentomino';
import { loadGosperGliderGun } from '../games/GosperGliderGun';
import { loadOscillators, } from '../games/Oscillators';
import { loadSpaceShips } from '../games/SpaceShips';
import { computeNextGeneration, generateLoadFunctionInLog, m_gridPadding } from '../gridFunctions';
import '../styles/App.css';

const App = (): ReactElement => {
	const width = 5;
	const height = 5;
	const initialDelay = 500;
	const delayStepSize = 10;
	const minimumDelay = 0;
	const maximumDelay = 1000;

	const [aboutOpen, setAboutOpen] = useState<boolean>(false);
	const [selectedGrid, setSelectedGrid] = useState<string>('none');
	const [grid, setGrid] = useState<LifeState[][]>(newGrid());
	const [generation, setGeneration] = useState<number>(0);
	const [population, setPopulation] = useState<number>(0);
	const [running, setRunning] = useState<boolean>(false);
	const [delay, setDelay] = useState<number>(initialDelay);

	useEffect(() => {
		setAboutOpen(true);
	}, []);

	useEffect(() => {
		const current = grid.flat().map(cell => cell === 'alive' ? 1 : 0).
			reduce<number>((sum, cell) => sum + cell, 0);

		setPopulation(current);
		if (current === 0)
			setRunning(false);
	}, [grid]);

	useEffect(() => {
		const id: number | null = running ? setInterval(next, maximumDelay - delay) : null;
		return () => {
			if (id)
				clearInterval(id);
		}
	}, [running, delay]);

	function newGrid(): LifeState[][] {
		return Array.from({ length: height + 2 * m_gridPadding },
			() => Array.from({ length: width + 2 * m_gridPadding }, () => 'none'));
	}

	const reset = (): void => {
		setRunning(false);
		setSelectedGrid('none');
		setGrid(newGrid());
		setGeneration(0);
		setPopulation(0);
		generateLoadFunctionInLog();
	}

	const handleSelectorChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		setSelectedGrid(event.target.value);
		load(event.target.value)
	}

	const load = (selected: string): void => {
		setRunning(false);
		setGeneration(1);
		switch (selected)
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
			case 'Oscillators':
				setGrid(loadOscillators(newGrid));
				break;
			case 'SpaceShips':
				setGrid(loadSpaceShips(newGrid));
				break;
			case 'GosperGliderGun':
				setGrid(loadGosperGliderGun(newGrid));
				break;
		}
	}

	const next = (): void => {
		setGeneration(generation => generation + 1);
		setGrid(grid => computeNextGeneration(grid));
	}

	return (
		<React.Fragment>
			<AboutDialog open={aboutOpen} setOpen={setAboutOpen} />
			<h2>Conway's Game of Life</h2>
			<div className="horizontal-card">
				<select className="select" value={selectedGrid}
						onChange={(event) => handleSelectorChange(event)}>
					<option value="none">Select a game...</option>
					<option value="R-Pentomino">R-pentomino</option>
					<option value="R-Pentomino-Corner">R-pentomino Test</option>
					<option value="Oscillators">Oscillators</option>
					<option value="SpaceShips">Space Ships</option>
					<option value="GosperGliderGun">Gosper Glider Gun</option>
				</select>
				<p>{`Generation: ${generation}`}</p>
				<p>{`Population: ${population}`}</p>
				<p>{`${running ? "R" : "Not r"}unning`}</p>
			</div>

			<div className="card">
				<Canvas grid={grid} updateGrid={setGrid} />
			</div>

			<div className="horizontal-card">
				<button className="button" type="button" disabled={selectedGrid === 'none'}
					onClick={() => load(selectedGrid)}>Reload</button>
				<button className="button" type="button" disabled={population === 0}
					onClick={() => reset()}>Reset</button>
				<button className="button" type="button" disabled={population === 0 ||
					running} onClick={() => next()}>Next</button>
				<button className="button" type="button" disabled={population === 0}
					onClick={() => setRunning(running => !running)}>{running ? 'Stop' : 'Run'}
				</button>
				<DiscreteSlider initial={initialDelay} min={minimumDelay} max={maximumDelay}
					step={delayStepSize} update={(delay) => setDelay(delay)}/>
			</div>

			<Footer />
		</React.Fragment>
	)
}

export default App;
