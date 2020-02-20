import {
  NewTodo,
  FinishedTodo,
  TodoStatus,
  requestGetTodos,
  requestCreateTodo,
  requestFinishTodo,
  requestDeleteTodo,
} from '../../requests';
import React, { FC, useState, ChangeEventHandler, useEffect } from 'react';
import { Tabs, Tab, TabsTypeMap, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Todos } from '~components/Todos';
import TodoInput from '~components/TodoInput';

const useStyles = makeStyles(theme => {
  return {
    root: {
      [theme.breakpoints.up('sm')]: {
        padding: '20px 10%',
      },
    },
  };
});

interface Props {}
const Index: FC<Props> = () => {
  const classes = useStyles();

  const [content, setContent] = useState('');
  const [tab, setTab] = useState(TodoStatus.new);
  const [newTodos, setNewTodos] = useState<NewTodo[]>([]);
  const [finishedTodos, setFinishedTodos] = useState<FinishedTodo[]>([]);
  const [fetching, setFetching] = useState(false);
  const [creating, setCreating] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setFetching(true);
    requestGetTodos(tab)
      .then(res => {
        setFetching(false);
        if (tab === TodoStatus.new) setNewTodos(res as NewTodo[]);
        if (tab === TodoStatus.completed) setFinishedTodos(res as FinishedTodo[]);
      })
      .catch(err => {
        setFetching(false);
        setErrorMsg(err.toString());
      });
  }, [tab]);

  const onContentInputChange: ChangeEventHandler<HTMLInputElement> = ev => {
    setContent(ev.target.value);
  };

  const onTabChange: TabsTypeMap['props']['onChange'] = (_ev, val) => {
    setTab(val);
  };

  const resetErrorMsg: () => void = () => {
    setErrorMsg('');
  };

  const createHandler: () => void = () => {
    if (!creating) {
      setCreating(true);
      requestCreateTodo(content)
        .then(t => {
          setCreating(false);
          setNewTodos([t, ...newTodos]);
          setContent('');
        })
        .catch(err => {
          setErrorMsg(err);
          setCreating(false);
        });
    }
  };

  const finishHandler: (id: string) => void = id => {
    if (!finishing) {
      setFinishing(true);
      requestFinishTodo(id)
        .then(() => {
          const updatedNewTodos = [...newTodos].filter(t => t.id !== id);
          setNewTodos(updatedNewTodos);
          setFinishing(false);
        })
        .catch(err => {
          setErrorMsg(err);
          setFinishing(false);
        });
    }
  };

  const deleteHandler: (id: string) => void = id => {
    if (!deleting) {
      setDeleting(true);
      requestDeleteTodo(id)
        .then(() => {
          setDeleting(false);
          if (tab === TodoStatus.new) {
            const updatedTodos = [...newTodos].filter(t => t.id !== id);
            setNewTodos(updatedTodos);
          }
          if (tab === TodoStatus.completed) {
            const updatedTodos = [...finishedTodos].filter(t => t.id !== id);
            setFinishedTodos(updatedTodos);
          }
        })
        .catch(err => {
          setErrorMsg(err);
          setDeleting(false);
        });
    }
  };

  const currentShowedTodos = tab === TodoStatus.new ? newTodos : tab === TodoStatus.completed ? finishedTodos : [];

  return (
    <div className={classes.root}>
      <TodoInput placeholder="接下来要做..." value={content} onChange={onContentInputChange} onCreate={createHandler}/>

      <Tabs value={tab} onChange={onTabChange}>
        <Tab label="进行中" value={TodoStatus.new} data-testid="tab-new"/>
        <Tab label="已完成" value={TodoStatus.completed} data-testid="tab-completed" />
      </Tabs>

      {fetching ? (
        <div>loading</div>
      ) : (
        <Todos type={tab} todos={currentShowedTodos} onDeleteClick={deleteHandler} onFinishClick={finishHandler} />
      )}

      <Snackbar open={errorMsg !== ''} autoHideDuration={3000} message={errorMsg} onClose={resetErrorMsg} />
    </div>
  );
};

export default Index;
