import { useEffect, useRef, type ReactElement } from "react";
import type { LifeState } from "../Types";
import { updateGridCell } from "../gridFunctions";

interface CanvasProps {
	grid: LifeState[][];
	width: number;
	height: number;
	updateGrid: (grid: LifeState[][]) => void;
}

const m_cellSize: number = 10;

const Canvas = ({ grid, width, height, updateGrid }: CanvasProps): ReactElement => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
 
	useEffect(() => {
		const canvas: HTMLCanvasElement | null = canvasRef.current;
		if (!canvas)
			return;

		const width: number = grid[0].length;
		const height: number = grid.length;
		canvas.width = width * (m_cellSize + 1);
		canvas.height = height * (m_cellSize + 1);
		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		if (!ctx)
			return;
		
		for (let y: number = 0; y < height; y++) {
			for (let x: number = 0; x < width; x++) {
				ctx.fillStyle = grid[y][x] === 'alive' ? "rgb(200 200 200)" :
					grid[y][x] === 'dead' ? "rgb(50 50 50)" : "rgb(20 20 20)";
				ctx.fillRect(x * (m_cellSize + 1), y * (m_cellSize + 1), m_cellSize, m_cellSize);
			}
		}
	}, [grid, width, height]);

	const clickHandler = ((event: React.MouseEvent<HTMLCanvasElement>): void => {
		const bounds: DOMRect | undefined = canvasRef.current?.getBoundingClientRect();
		const row: number = Math.floor((event.clientY - (bounds?.top ?? 0)) / (m_cellSize + 1));
		const column: number = Math.floor((event.clientX - (bounds?.left ?? 0)) / (m_cellSize + 1));

		// log new grid cell value (see generateLoadFunctionInLog)
		const state = grid[row][column] === 'alive' ? 'none' : 'alive';
		console.log(`\tgrid[${row}][${column}] = 'alive';`);
		updateGrid(updateGridCell({ grid, row, column, state }));
	});

	return (
		<canvas ref={canvasRef} width={width * 10} height={height * 10}
			onClick={clickHandler} />
	);
}

export default Canvas;
