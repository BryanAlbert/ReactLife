# Conway's Game of Life, React
A coding exercise, to run the life simulation in a React app.

## Configuration
To Create a React app in Visual Studio Code:
* Run `npm init -y` to create a Node.js `package.json` file
* Run `npm install react react-dom` to install React
* Run `npm install --save-dev @types/react @types/react-dom` to install React type definitions (necessary for return types of React components, etc.?)
* From the parent directory, run `npm create vite@latest React --template react-ts`, react-life for the package name, react for the framework, TypeScript for the variant
* `npm install @mui/material @mui/icons-material` to install Material UI slider
* `npm install @emotion/react @emotion/styled` to for @mus/styled-engine?
* `cd React`
* `npm install`
* `npm run dev` to launch the app, open http://localhost:5173 to see it

### Update eslint
To get TypeScript-related eslinting:
* Update `eslint.config.js` as per instructions below
* Install relevant packages with `npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-x eslint-plugin-react-dom --save-dev`
* install ESLint extension (Ctrl + Shift + X)

### Configure VS Code Debugging
To get debugging working in VS Code:
* Open `App.tsx`
* In the Debug tab, "create a launch.json file." Choose "Web App (Chrome)"
* Update `"url": "http://localhost:5173"`, `"webRoot": "${workspaceFolder}/src"`
* in the Terminal, `npm run dev` to start the server the F5 to debug

### Copilot settings
I can't have Copilot writing all the code for me, I need to figure it out myself, so... click the monkey in the status bar and turn off "Code Completions (TypeScript JSX)." Note that it also looks like I've already burned through 75% of my Code completions... 

## Rules
Taken from the [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) wikipedia page.

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## Initial thoughts:
* Since each cell's future state is dependent on its neighbors' current states, we can't update cells sequentially. Instead, we'll have an array of cells for the current state and an identically-sized array for future state. 
* An optimization would be to only record cell states that change instead of the state of every cell. 
* An undo/redo buffer would be great. It only needs to be an undo buffer... 

The upside-down R-pentomino example in the Wikipedia article diverges from my version at generation 70... at generation 70 the vertical line of four cells on the left edge ends up missing the middle two cells. Further analysis shows that the wikipedia version computes cells past the edge of the window, which affect cells on the edge, while my version assumes that there is no possibility for life beyond the edge of the window. 

An enhancement, then, could be to compute assuming an infinitely-large field. This could be complicated since some shapes such as "gliders" and "space ships" can traverse the grid indefinitely, requiring a larger and larger grid. We could grow the grid as necessary, which could be problematic with size issues and buffer manipulation. We could also use a different storage mechanism, such as a hash table, which could be implemented with a JavaScript Map object. 

## TODO:
* Prepare materials for the interview, due at noon on Monday
	* Create a list of resources (sites, people, forums, etc.), check browser history, how to list Copilot interactions?
	* Push both Life repos to public repositories, supply a link
	* Provide a link to my albistix repo
	* Provide a link to my Boggle repo, the Windows download, or screenshots? 

* Make components for LifeGrid and Cell (done)
	* LifeGrid holds the array, let's make that an Array of Arrays (start with a simple LifeState)
	* Cell gets a function for setting that cell's state in LifeGrid's data
* We define living? in the CellProps, if we are undefined, let's use a slightly different black than for false. (done)
* Load a initial setting (done)
* Load multiple initial settings (done)
* I'm (accidentally) using a lot of type inference, go through and declare types (done?)
* Install the react-devtools (done) and play with it
* Set size on the buttons so they don't jump around on state changes (done)
* put controls and status bits in a grid so they're lined up horizontally, or put the status on the top? (Top)
* Compute the next generation! (done)
* Add a timer and compute the next generation accordingly (done)
* Use a canvas instead of the Cell collection for performance (done!)
* Add Faster and Slower buttons, etc. (done)
* Make Reload button smarter, change to Load if the select value changes (done)
* Make a different speed control? Click and hold the buttons? Use a slider? (done with a slider)
* Swap the slider so faster (shorter delay) is on the right (done, though the tool tip doesn't really make sense anymore... )
* Add installation instructions to the README (instead of the configuration instructions)
* Log point clicks in code format (e.g. `grid[4][5] = 'alive';`) so that they can be copied and pasted into a new `tsx` file, Reset should write the function signature, etc. (done)
* "Auto Load" when a game is selected from the selector (done, simplified the code quite a bit)
* Change none option in App selector to "Select a game..." (done)
* Add an About page or popup with instructions? Include the rules and instructions--clicking on the grid, loading games, etc. How about on initial load, display the instructions in a dialog with an OK button. 
* Load/save games? 
* Edge issues... expand the grid past the visible dimensions in all directions so that edged computations account for cells beyond the edge... but how far?
	* Dynamically size the array?
	* Use a hash instead? 

## Bugs
* Load a new grid, population doesn't update (fixed)
* Gosper Glider Gun doesn't shoot gliders (fixed)
* Controls' disabled status (fixed)
* On delay 0, don't run the setInterval?  
* Stop running when population goes to zero
* gliders should glide off the edge
* Store grid data in an array and load it instead of hard-coding the grids? 

## Questions
const LifeGrid = ({ width, height, grid, setGrid }: GridProps): JSX.Element => {
* Would you guys include the `: JSX.Element` type declaration on a Component signature? It requires importing type JSX from react which seems awkward, and it sounds like this type can be easily inferred. I decided to leave it off... 

## References
* VS Code Copilot for things like syntax, explaining React nuances like reviewing React.Memo, etc. 
* mdn web docs, e.g. https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
* My albistix React web app
* https://mui.com/material-ui/react-slider/


# React + TypeScript + Vite
(Written to `README.md` by the Vite installation.)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
	extends: [
		// Remove ...tseslint.configs.recommended and replace with this
		...tseslint.configs.recommendedTypeChecked,
		// Alternatively, use this for stricter rules
		...tseslint.configs.strictTypeChecked,
		// Optionally, add this for stylistic rules
		...tseslint.configs.stylisticTypeChecked,
	],
	languageOptions: {
		// other options...
		parserOptions: {
			project: ['./tsconfig.node.json', './tsconfig.app.json'],
			tsconfigRootDir: import.meta.dirname,
		},
	},
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
	plugins: {
		// Add the react-x and react-dom plugins
		'react-x': reactX,
		'react-dom': reactDom,
	},
	rules: {
		// other rules...
		// Enable its recommended typescript rules
		...reactX.configs['recommended-typescript'].rules,
		...reactDom.configs.recommended.rules,
	},
})
```
