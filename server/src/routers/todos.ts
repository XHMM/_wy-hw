import { Router, Request, Response, NextFunction } from 'express';
import { TodoStatus } from '../models/todo';
import { asyncWrapper } from './helpers';
import { TodosController } from '../controllers/todos';

export const todosRouter = Router();

todosRouter.get(
  '/todo/:id',
  asyncWrapper(async (req: Request, res: Response) => {
    const todo = await TodosController.getTodoById(req.params.id);
    res.json({
      status: 200,
      data: todo,
    });
  })
);

todosRouter.get(
  '/todos/:status',
  asyncWrapper(async (req: Request, res: Response) => {
    const todos = await TodosController.getTodosByStatus(req.params.status as TodoStatus);
    // console.log(todos);
    res.json({
      status: 200,
      data: todos,
    });
  })
);

// 新建
todosRouter.put(
  '/todo',
  asyncWrapper(async (req: Request, res: Response) => {
    const { content } = req.body;
    if (!content) {
      res.json({
        status: -1,
        msg: "miss 'content'",
      });
      return;
    }

    const todoDoc = await TodosController.createTodo({
      content,
      createTime: new Date(),
      status: TodoStatus.new,
    });
    res.json({
      status: 200,
      data: {
        id: todoDoc.id,
        createTime: todoDoc.createTime,
        content: todoDoc.content,
        status: TodoStatus.new,
      },
    });
  })
);

// 更新
todosRouter.post(
  '/todo/:id',
  asyncWrapper(async (req: Request, res: Response) => {
    function isBodyValid(body: Record<string, any>): boolean {
      const { status } = req.body;
      return !(!status || !Reflect.has(TodoStatus, status));
    }
    if (!isBodyValid(req.body)) {
      res.json({
        status: -1,
        msg: 'body invalid',
      });
      return;
    }

    const { status } = req.body;
    const updated = await TodosController.updateTodoById(req.params.id, status);
    if (updated) {
      res.json({
        status: 200,
      });
    } else {
      res.json({
        status: -1,
        msg: '未找到该TODO或是状态前后一致未被更新',
      });
    }
  })
);

todosRouter.delete(
  '/todo/:id',
  asyncWrapper(async (req: Request, res: Response) => {
    const deleted = await TodosController.deleteTodoById(req.params.id);
    if (deleted) {
      res.json({
        status: 200,
      });
    } else {
      res.json({
        status: -1,
        msg: '未找到该TODO',
      });
    }
  })
);
