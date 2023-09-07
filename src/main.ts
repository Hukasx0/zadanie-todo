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
}

bootstrapApplication(App);
