import { useState } from 'react';
import type { LifeState } from './Types';
import Cell from './Cell';
import './styles/LifeGrid.css';

const LifeGrid = () => {
  const [lifeState, setLifeState] = useState<LifeState>('dead');

  const updateLifeState = (living: LifeState) => {
    setLifeState(living);
  }

  return (
    <Cell living={lifeState} setLifeState={updateLifeState} />
  );
}

export default LifeGrid;
