import React, { FC } from 'react';
import { CardContent, CardActions, IconButton, Card } from '@material-ui/core';
import { DoneRounded, DeleteRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { TodoStatus } from '../requests';

const useStyles = makeStyles(() => {
  return {
    root: {
      marginBottom: '4px',
    },
    content: {
      padding: '16px 12px 1px',
    },
    time: {
      fontSize: '0.7rem',
      color: 'gray',
      display: 'block',
      marginBottom: '3px',
      textAlign: 'right',
    },
  };
});

interface Props {
  id: string,
  createTime: string,
  updateTime?: string,
  content: string,
  status: TodoStatus,
  onFinishClick?: (id: string) => void,
  onDeleteClick?: (id: string) => void,
}
const Todo: FC<Props> = ({ id, status, content, createTime, updateTime, onDeleteClick, onFinishClick }) => {
  const classes = useStyles();

  const finishHandler: () => void = () => {
    onFinishClick && onFinishClick(id);
  };
  const deleteHandler: () => void = () => {
    onDeleteClick && onDeleteClick(id);
  };
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {status === TodoStatus.completed && updateTime && <span className={classes.time}>完成于 {updateTime}</span>}
        <span className={classes.time}>{createTime}</span>
        {content}
      </CardContent>
      <CardActions>
        {status === TodoStatus.new && (
          <IconButton onClick={finishHandler} size="small" data-testid="finishHandler">
            <DoneRounded />
          </IconButton>
        )}

        {onDeleteClick && (
          <IconButton onClick={deleteHandler} size="small" data-testid="deleteHandler">
            <DeleteRounded />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Todo;
