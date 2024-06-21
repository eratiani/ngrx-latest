import { Todo } from '../model/todo.model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TodosService } from '../services/todo.service';
import { computed, inject } from '@angular/core';

export type TodosFilter = 'all' | 'pending' | 'completed';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
  // filteredTodos: Todo[];
}
const initialState: TodoState = {
  todos: [],
  loading: false,
  filter: 'all',
  // filteredTodos: [],
};
export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todosService = inject(TodosService)) => ({
    async loadAll() {
      patchState(store, { loading: true });

      const todos = await todosService.getTodos();
      patchState(store, { todos, loading: false });
    },
    async addTodo(title: string) {
      const todo = await todosService.addTodo({ title, completed: false });
      patchState(store, (state) => ({
        todos: [...state.todos, todo],
      }));
    },
    async deleteTodo(id: string) {
      await todosService.deleteTodo(id);
      patchState(store, (state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },
    async updateTodo(id: string, completed: boolean) {
      await todosService.update(id, completed);
      patchState(store, (state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed } : { ...todo }
        ),
      }));
    },
    updateFilter(filter: TodosFilter) {
      patchState(store, { filter });
    },
  })),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const todos = state.todos();
      switch (state.filter()) {
        case 'all':
          return todos;
        case 'pending':
          return todos.filter((todo) => !todo.completed);
        case 'completed':
          return todos.filter((todo) => todo.completed);
      }
    }),
  }))
);
