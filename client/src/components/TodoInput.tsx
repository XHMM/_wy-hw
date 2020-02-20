import React, { FC, ChangeEventHandler, KeyboardEventHandler } from 'react';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import { KeyboardReturnRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    root: {
      padding: '5px 12px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      flex: 1,
    },
    button: {
      padding: 0,
    },
  };
});

interface Props {
  placeholder: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  onCreate: () => void, // fire when click button or enter key up
  useEnter?: boolean,
}
const TodoInput: FC<Props> = ({ value, placeholder, onChange, onCreate, useEnter = true }) => {
  const classes = useStyles();

  const onEnter:KeyboardEventHandler<HTMLInputElement> = (ev) => {
    if (ev.key === 'Enter') {
      if (useEnter) onCreate();
    }
  };
  const onClick: () => void = () => {
    onCreate();
  };

  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classes.input}
          onKeyUp={onEnter}
        />
        {value !== '' && (
          <IconButton onClick={onClick} className={classes.button} data-testid="button">
            <KeyboardReturnRounded />
          </IconButton>
        )}
      </Paper>
    </>
  );
};

export default TodoInput;
