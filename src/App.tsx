import { useState } from 'react';
import LifeGrid from './LifeGrid';
import  Footer from './Footer';
import './styles/App.css';

const App = () => {
	const [count, setCount] = useState(0);
	const width = 5;
	const height = 5;

	return (
		<>
			<h1>Conway's Game of Life</h1>
			<div className="card">
				<LifeGrid width={width} height={height} />
			</div>
			<div className="card">
				<button type="button" onClick={() => setCount(count => count + 1)}>
					count is {count}
				</button>
			</div>
		<Footer />
		</>
	)
}

export default App;
