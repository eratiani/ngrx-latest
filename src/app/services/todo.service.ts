import { Injectable } from '@angular/core';
import { TODOS } from '../model/mock-data';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  async getTodos() {
    await sleep(1000);
    return TODOS;
  }
  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    await sleep(1000);
    return { id: Math.random().toString(36).substring(2, 9), ...todo } as Todo;
  }
  async deleteTodo(id: string): Promise<void> {
    await sleep(1000);
  }
  async update(id: string, completed: boolean): Promise<void> {
    await sleep(1000);
  }
}
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
