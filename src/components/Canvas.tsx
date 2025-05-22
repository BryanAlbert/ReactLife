import React, { useEffect, useRef, useState, type ReactElement } from "react";
import { type Point, type LifeState } from "../Types";
import { m_gridPadding, updateGridCell } from "../gridFunctions";

interface CanvasProps {
	grid: LifeState[][];
	updateGrid: (grid: LifeState[][]) => void;
}

const m_cellSize: number = 10;
const m_showBorderRegion = false;

const Canvas = ({ grid, updateGrid }: CanvasProps): ReactElement => {
	const width: number = grid[0].length - (m_showBorderRegion ? 0 : 2 * m_gridPadding);
	const height: number = grid.length - (m_showBorderRegion ? 0 : 2 * m_gridPadding);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [mouseDown, setMouseDown] = useState<boolean>(false);
	const [mouseCell, setMouseCell] = useState<Point>();

	useEffect(() => {
		const canvas: HTMLCanvasElement | null = canvasRef.current;
		if (!canvas)
			return;

		canvas.width = width * (m_cellSize + 1) + 2;
		canvas.height = height * (m_cellSize + 1) + 2;
		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		if (!ctx) {
			console.log('Failed to get a 2d context from the canvas.')
			return;
		}

		for (let y: number = 0; y < height; y++) {
			for (let x: number = 0; x < width; x++) {
				const j = m_showBorderRegion ? y : y + m_gridPadding;
				const i = m_showBorderRegion ? x : x + m_gridPadding;
				ctx.fillStyle = grid[j][i] === 'alive' ? "rgb(200 200 200)" :
					grid[j][i] === 'dead' ? "rgb(50 50 50)" : "rgb(20 20 20)";

				ctx.fillRect(x * (m_cellSize + 1) + 1, y * (m_cellSize + 1) + 1, m_cellSize, m_cellSize);
			}
		}

		ctx.lineWidth = 1;
		ctx.strokeStyle = 'white';
		const offset: number = m_showBorderRegion ? m_gridPadding * (m_cellSize + 1) : 0.5;
		ctx.rect(offset, offset, (grid[0].length - 2 * m_gridPadding) * (m_cellSize + 1) + 1,
			(grid.length - 2 * m_gridPadding) * (m_cellSize + 1) + 1);

		ctx.stroke();
	}, [grid, width, height]);

	const computeMouseCell = (event: React.MouseEvent<HTMLCanvasElement>): Point => {
		// click event coordinates are relative to the viewport (all visible area on the page)
		const bounds: DOMRect | undefined = canvasRef.current?.getBoundingClientRect();
		let row: number = Math.floor((event.clientY - (bounds?.top ?? 0)) / (m_cellSize + 1));
		let column: number = Math.floor((event.clientX - (bounds?.left ?? 0)) / (m_cellSize + 1));
		if (!m_showBorderRegion) {
			row += m_gridPadding;
			column += m_gridPadding;
		}

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
		setMouseDown(true);
		updateCell(computeMouseCell(event));
	});

	return (
		<canvas ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
			onMouseUp={() => setMouseDown(false)} />
	);
}

export default Canvas;
