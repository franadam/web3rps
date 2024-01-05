import React, { DetailedHTMLProps, FC, SelectHTMLAttributes } from 'react';

import { Moves } from '../context/Game.context';

interface Props
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
}

export const SelectMove: FC<Props> = ({ ...props }): JSX.Element => {
  return (
    <select {...props}>
      {Object.values(Moves).map((key, index) => (
        <option
          key={key}
          value={index + 1}
        >
          {key}
        </option>
      ))}
    </select>
  );
};
