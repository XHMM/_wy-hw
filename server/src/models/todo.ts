import { prop, getModelForClass, plugin, modelOptions } from '@typegoose/typegoose';
import { format } from 'date-fns';
import * as mongooseLeanGetters from 'mongoose-lean-getters';

export enum TodoStatus {
  'new' = 'new',
  'completed' = 'completed',
}

@plugin(mongooseLeanGetters)
@modelOptions({
  schemaOptions: {
    toObject: {
      getters: true,
    },
    toJSON: {
      getters: true,
    },
  },
})
export class TodoSchema {
  @prop({
    required: true,
    set(val: Date): Date {
      return val;
    },
    get(val: Date): string {
      return format(val, 'yyyy-MM-dd HH:mm');
    },
  })
  createTime: Date;

  @prop({
    // set & get必须得同时定义
    set(val: Date): Date {
      return val;
    },
    get(val: Date | undefined): string | undefined {
      if (val instanceof Date) return format(val, 'yyyy-MM-dd HH:mm');
      else return val;
    },
  })
  updateTime?: Date;

  @prop({
    required: true,
  })
  content: string;

  @prop({
    required: true,
    enum: TodoStatus,
  })
  status: TodoStatus;
}

export const todoModel = getModelForClass(TodoSchema);
