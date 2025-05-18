import { useState, type ReactElement } from "react";
import { Slider } from '@mui/material';

interface SliderProps {
  initial: number;
  min: number;
  step: number;
  max: number;
  update: (value: number) => void;
}

const DiscreteSlider = ({ initial, min, max, step, update }: SliderProps): ReactElement => {
  const [value, setValue] = useState<number>(initial);
  const handleChange = (event: Event, newValue: number): void => {
    setValue(newValue);
    update(newValue);
  }

  return (
    <Slider value={value} min={min} max={max} step={step} onChange={handleChange} />
  )
}

export default DiscreteSlider;
