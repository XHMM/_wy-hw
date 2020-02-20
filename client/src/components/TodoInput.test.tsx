import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoInput from '~components/TodoInput';

describe('TodoInput cmp test', () => {
  test('with Enter on',  () => {
    const onChangeMock = jest.fn();
    const onCreateMock = jest.fn();

    const { getByPlaceholderText, getByTestId, rerender, queryByTestId } = render(
      <TodoInput placeholder="占位符" value="" onChange={onChangeMock} onCreate={onCreateMock} />
    );
    
    expect(queryByTestId('button')).not.toBeInTheDocument();
    const inputElement = getByPlaceholderText('占位符');
    expect(inputElement).toBeInTheDocument();
    fireEvent.input(inputElement, {
      target: {
        value: 'hi',
      },
    });
    expect(onChangeMock.mock.calls.length).toBe(1);

    rerender(<TodoInput placeholder="占位符" value="hi" onChange={onChangeMock} onCreate={onCreateMock} />);
    
    const clickElement = getByTestId('button') 
    expect(clickElement).toBeInTheDocument();
    fireEvent.click(getByTestId('button'));
    expect(onCreateMock.mock.calls.length).toBe(1);
    fireEvent.keyUp(inputElement, {
      key: 'Enter',
    });
    expect(onCreateMock.mock.calls.length).toBe(2);
  });

  test('with Enter off', () => {
    const onChangeMock = jest.fn();
    const onCreateMock = jest.fn();

    const { getByPlaceholderText } = render(
      <TodoInput
        placeholder="占位符"
        value="some thing"
        onChange={onChangeMock}
        onCreate={onCreateMock}
        useEnter={false}
      />
    );
    const inputElement = getByPlaceholderText('占位符');

    expect(inputElement).toBeInTheDocument();

    fireEvent.keyUp(inputElement, {
      key: 'Enter',
    });
    expect(onCreateMock.mock.calls.length).toBe(0);
  });
});
