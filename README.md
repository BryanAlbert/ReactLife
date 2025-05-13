# Conway's Game of Life, React
A coding exercise, to run the life simulation in a React app.

## Configuration
To Create a React app in Visual Studio Code:
* Run `npm init -y` to create a Node.js `package.json` file
* Run `npm install react react-dom` to install React
* From the parent directory, run `npm create vite@latest React --template react-ts`, react-life for the package name, react for the framework, TypeScript for the variant
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
* Make components for LifeGrid and Cell
	* LifeGrid holds the array, let's make that an Array of Arrays (start with a simple LifeState)
	* Cell gets a function for setting that cell's state in LifeGrid's data
* We define living? in the CellProps, if we are undefined, let's use a slightly different black than for false. 
* Load a initial setting
* Load multiple initial settings

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
