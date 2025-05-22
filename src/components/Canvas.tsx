import React, { useEffect, useRef, useState, type ReactElement } from "react";
import { type Point, type LifeState } from "../Types";
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
	const [mouseDown, setMouseDown] = useState<boolean>(false);
	const [mouseCell, setMouseCell] = useState<Point>();

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

	const computeMouseCell = (event: React.MouseEvent<HTMLCanvasElement>): Point => {
		const bounds: DOMRect | undefined = canvasRef.current?.getBoundingClientRect();
		const row: number = Math.floor((event.clientY - (bounds?.top ?? 0)) / (m_cellSize + 1));
		const column: number = Math.floor((event.clientX - (bounds?.left ?? 0)) / (m_cellSize + 1));
		return { row, column };
	}
		
	const updateCell = ((cell: Point, force?: boolean): void => {
		const state = force ? 'alive' : grid[cell.row][cell.column] === 'alive' ? 'none' : 'alive';
		setMouseCell(cell);
		updateGrid(updateGridCell({ grid, row: cell.row, column: cell.column, state }));
	});

	const handleMouseMove = ((event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
		if (mouseDown && mouseCell) {
			const cell: Point = computeMouseCell(event);
			if (mouseCell.row != cell.row || mouseCell?.column != cell.column) {
				updateCell({ column: cell.column, row: cell.row }, true);
			}
		}
	});

	const handleMouseDown = ((event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
		const cell: Point = computeMouseCell(event);
		setMouseDown(true);
		updateCell(cell);
	});

	return (
		<canvas ref={canvasRef} width={width * 10} height={height * 10}
			onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
			onMouseUp={() => setMouseDown(false)} />
	);
}

export default Canvas;
