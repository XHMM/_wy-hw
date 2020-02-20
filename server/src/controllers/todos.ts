import { TodoSchema, TodoStatus, todoModel } from '../models/todo';
import {  DocumentType } from '@typegoose/typegoose';

export class TodosController {
  @catchAsyncError(null)
  static async createTodo(body: TodoSchema): Promise<DocumentType<TodoSchema> | null> {
    return await todoModel.create(body);
  }

  @catchAsyncError(null)
  static async getTodoById(id: string): Promise<DocumentType<TodoSchema> | null> {
    return await todoModel.findById(id).exec();
  }

  @catchAsyncError([])
  static async getTodosByStatus(status: TodoStatus): Promise<DocumentType<TodoSchema>[]> {
    return await todoModel.find({ status }).exec();
  }

  @catchAsyncError(false)
  static async updateTodoById(id: string, newStatus: TodoStatus): Promise<boolean> {
    const { nModified } = await todoModel
      .updateOne({ _id: id }, {
        status: newStatus,
        updateTime: new Date(),
      } as Partial<TodoSchema>)
      .exec();
    return nModified === 1;
  }

  @catchAsyncError(false)
  static async deleteTodoById(id: string): Promise<boolean> {
    const { deletedCount } = await todoModel.deleteOne({ _id: id }).exec();
    return deletedCount === 1;
  }
}

function catchAsyncError(returnWhenError: any): MethodDecorator {
  return function(target, name, descriptor: any): any {
    const originalFn = descriptor.value;
    descriptor.value = async function(...args) {
      try {
        return await originalFn.bind(this, ...args)();
      } catch (e) {
        console.error(e);
        return returnWhenError;
      }
    };
  };
}
