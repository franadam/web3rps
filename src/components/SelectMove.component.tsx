import React, { FC } from 'react';

import { Moves } from '../context/Game.context';
import { FormControl, MenuItem, Select, SelectProps } from '@mui/material';

export const SelectMove: FC<SelectProps> = ({ ...props }): JSX.Element => {
  return (
    <FormControl
      fullWidth
      variant="outlined"
    >
      <Select {...props}>
        {Object.values(Moves).map((key, index) => (
          <MenuItem
            key={key}
            value={index + 1}
          >
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
