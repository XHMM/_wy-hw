import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Todo from '~components/Todo';
import { TodoStatus } from '../requests';

describe('Todo cmp test', () => {
  test('new status Todo', () => {
    const finishHandlerMock = jest.fn();
    const { queryByText, getByTestId, queryByTestId } = render(
      <Todo
        id="1"
        createTime="2012-12-12 12:00"
        content="test"
        status={TodoStatus.new}
        onFinishClick={finishHandlerMock}
      />
    );

    expect(queryByText('2012-12-12 12:00')).toBeInTheDocument();
    expect(queryByText('test')).toBeInTheDocument();
    expect(queryByTestId('finishHandler')).toBeInTheDocument();
    expect(queryByTestId('deleteHandler')).not.toBeInTheDocument();

    fireEvent.click(getByTestId('finishHandler'));
    expect(finishHandlerMock.mock.calls.length).toBe(1);
    expect(finishHandlerMock.mock.calls[0][0]).toBe('1');
  });

  test('completed status Todo', () => {
    const deleteHandlerMock = jest.fn();
    const { queryByText, getByTestId, queryByTestId } = render(
      <Todo
        id="2"
        createTime="2012-12-12 12:00"
        content="test"
        status={TodoStatus.completed}
        updateTime="2012-12-13 13:00"
        onDeleteClick={deleteHandlerMock}
      />
    );

    expect(queryByText('2012-12-12 12:00')).toBeInTheDocument();
    expect(queryByText('完成于 2012-12-13 13:00')).toBeInTheDocument();
    expect(queryByText('test')).toBeInTheDocument();
    expect(queryByTestId('finishHandler')).not.toBeInTheDocument();
    expect(queryByTestId('deleteHandler')).toBeInTheDocument();
    fireEvent.click(getByTestId('deleteHandler'));
    expect(deleteHandlerMock.mock.calls.length).toBe(1);
    expect(deleteHandlerMock.mock.calls[0][0]).toBe("2");
  });
});
