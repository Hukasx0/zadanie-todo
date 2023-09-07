import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { TodoElement } from './interfaces/do_zrobienia';

/*
    Progress na obecną chwilę
*/

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Dodaj nowe todos</h1>
    <input [(ngModel)]="inputZnowym" (keyup.enter)="dodajTodo()"
    placeholder="Dodaj nowe todo" />
    <ul>
      <li *ngFor="let todo of doZrobienia">
      {{ todo.text }} | zrobione? {{ todo.isDone ? "tak" : "nie" }}
      <input class="toggle" type="checkbox" [(ngModel)]="todo.isDone" (change)="oznaczZrobione(todo)">
      <button (click)="usunTodo(todo)">Usuń te todo</button>
    </ul>

  `,
})
export class App {
  doZrobienia: TodoElement[] = [];
  inputZnowym: string = '';
  dodajTodo() {
    if (this.inputZnowym !== '') {
      const newElement: TodoElement = {
        text: this.inputZnowym,
        isDone: false,
      };
      this.doZrobienia.push(newElement);
      this.inputZnowym = '';
    }
  }

  usunTodo(todo: TodoElement) {
    const obecnyIndeks = this.doZrobienia.indexOf(todo);
    if (obecnyIndeks !== -1) {
      this.doZrobienia.splice(obecnyIndeks, 1);
    } else {
      alert('How did we get here?');
    }
  }

  oznaczZrobione(todo: TodoElement) {
    todo.isDone = !todo.isDone;
  }
}

bootstrapApplication(App);
