import { Component, effect, inject, viewChild } from '@angular/core';
import { MatInputModule, MatLabel, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatSuffix,
    MatIcon,
    MatListOption,
    MatLabel,
    MatInputModule,
    MatSelectionList,
    MatFormField,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  onFIlterTodos($event: MatButtonToggleChange) {
    const filter = $event.value as TodosFilter;
    this.store.updateFilter(filter);
  }
  store = inject(TodosStore);
  filter = viewChild.required(MatButtonToggleGroup);
  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }
  async onTodoToggle($event: boolean, arg1: string) {
    await this.store.updateTodo(arg1, $event);
  }

  async onDeleteTodo($event: MouseEvent, arg1: string) {
    $event.stopPropagation();
    await this.store.deleteTodo(arg1);
  }
  async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }
}
