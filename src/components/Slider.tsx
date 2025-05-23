import { useState, type ReactElement } from "react";
import { Slider } from '@mui/material';
import '../styles/Slider.css'

interface SliderProps {
	initial: number;
	min: number;
	step: number;
	max: number;
	update: (value: number) => void;
}

const DiscreteSlider = ({ initial, min, max, step, update }: SliderProps): ReactElement => {
	const [value, setValue] = useState<number>(initial);
	const handleChange = (_: Event, newValue: number): void => {
		setValue(newValue);
		update(newValue);
	}

	return (
		<div className="slider">
			<Slider value={value} min={min} max={max} step={step}
				valueLabelDisplay="auto" onChange={handleChange} />
		</div>
	)
}

export default DiscreteSlider;
