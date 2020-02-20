import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Todos } from '~components/Todos';
import { TodoStatus, NewTodo, FinishedTodo } from '../requests';

describe('Todos cmp test', () => {
  test('new state Todos', () => {
    const deleteHandlerMock = jest.fn();

    const todos: NewTodo[] = [
      {
        id: '1',
        content: 'todo1',
        createTime: '2012-12-12 10:00',
        status: TodoStatus.new,
      },
      {
        id: '2',
        content: 'todo2',
        createTime: '2012-12-12 11:00',
        status: TodoStatus.new,
      },
    ];
    const { queryByText } = render(<Todos todos={todos} type={TodoStatus.new} onDeleteClick={deleteHandlerMock} />);
    
    expect(queryByText('todo1')).toBeInTheDocument();
    expect(queryByText('todo2')).toBeInTheDocument();
  });

  test('completed state Todos', () => {
    const finishHandlerMock = jest.fn();

    const todos: FinishedTodo[] = [
      {
        id: '1',
        content: 'todo1',
        createTime: '2012-12-12 10:00',
        status: TodoStatus.completed,
        updateTime: '2012-12-13 10:00',
      },
      {
        id: '2',
        content: 'todo2',
        createTime: '2012-12-12 11:00',
        status: TodoStatus.completed,
        updateTime: '2012-12-13 11:00',
      },
    ];
    const { queryByText } = render(
      <Todos todos={todos} type={TodoStatus.completed} onFinishClick={finishHandlerMock} />
    );
    
    expect(queryByText('todo1')).toBeInTheDocument();
    expect(queryByText('todo2')).toBeInTheDocument();
  });
});
