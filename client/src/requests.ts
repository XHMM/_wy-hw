const HOST = 'http://localhost:8080';

interface ResponseBase {
  status: number,
  msg?: string,
}
interface ResponseWithData<D> extends ResponseBase {
  data: D,
}

export enum TodoStatus {
  'new' = 'new',
  'completed' = 'completed',
}
export interface TodoBase {
  id: string,
  createTime: string,
  content: string,
  status: TodoStatus,
  updateTime?: string,
}
export interface NewTodo extends TodoBase {
  status: TodoStatus.new,
}
export interface FinishedTodo extends TodoBase {
  updateTime: string,
  status: TodoStatus.completed,
}

export async function requestGetTodos(status: TodoStatus): Promise<NewTodo[] | FinishedTodo[]> {
  const url = `${HOST}/todos/${status}`;
  try {
    const json: ResponseWithData<NewTodo[] | FinishedTodo[]> = await fetch(url).then(res => res.json());
    if (json.status === 200) return json.data;
    else return Promise.reject(json.msg);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function requestCreateTodo(content: string): Promise<NewTodo> {
  const url = `${HOST}/todo`;
  try {
    const json:ResponseWithData<NewTodo> = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content,
      }),
    }).then(res => res.json());
    if (json.status === 200) return json.data;
    return Promise.reject(json.msg);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function requestDeleteTodo(id: string): Promise<void> {
  const url = `${HOST}/todo/${id}`;
  try {
    const json = await fetch(url, {
      method: 'DELETE',
    }).then(res => res.json());
    if (json.status === 200) return;
    return Promise.reject(json.msg);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function requestFinishTodo(id: string): Promise<void> {
  const url = `${HOST}/todo/${id}`;
  try {
    const json = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: TodoStatus.completed
      })
    }).then(res => res.json());
    if (json.status === 200) return;
    return Promise.reject(json.msg);
  } catch (e) {
    return Promise.reject(e);
  }
}
