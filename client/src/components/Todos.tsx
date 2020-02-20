import { TodoStatus, TodoBase } from '../requests';
import React, { FC } from 'react';
import Todo from '~components/Todo';

export const Todos: FC<{
  type: TodoStatus,
  onFinishClick?: (id: string) => void,
  onDeleteClick?: (id: string) => void,
  todos: TodoBase[],
}> = ({ type, onDeleteClick, onFinishClick, todos }) => {
  const sortedTodos = type === TodoStatus.new ? todos.sort(sortDesc('createTime')) : todos.sort(sortDesc('updateTime'));
  return (
    <div>
      {sortedTodos.map(t => {
        const T = (
          <Todo
            key={t.id}
            onDeleteClick={onDeleteClick}
            content={t.content}
            status={t.status}
            createTime={t.createTime}
            id={t.id}
          />
        );
        if (type === TodoStatus.new)
          return React.cloneElement(T, {
            onFinishClick: onFinishClick,
          });
        if (type === TodoStatus.completed)
          return React.cloneElement(T, {
            updateTime: t.updateTime,
          });
        return null;
      })}
    </div>
  );
};

function sortDesc<T extends any>(field: keyof T) {
  return (a: T, b: T) => {
    try {
      return new Date(b[field]).getTime() - new Date(a[field]).getTime();
    } catch (e) {
      return 0;
    }
  };
}
