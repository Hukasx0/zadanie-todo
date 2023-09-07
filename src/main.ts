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
    <ng-container *ngIf="(todo.isDone && pokazWykonane) || (!todo.isDone && pokazNiewykonane)">
      {{ todo.text }} | {{ todo.isDone ? '✅' : '❌' }}
      <input class="toggle" type="checkbox" [(ngModel)]="todo.isDone" (click)="oznaczZrobione(todo)" />
      <button (click)="usunTodo(todo)">Usuń to todo</button>
    </ng-container>
  </li>
</ul>

  <button (click)="pokazanieWykonanych()" >
    {{ pokazWykonane ? "ukryj wykonane" : "cofnij" }}
  </button> <br />
  <button (click)="pokazanieNiewykonanych()" >
    {{ pokazNiewykonane ? "ukryj niewykonane" : "cofnij" }}
  </button> <br />
  `,
})
export class App {
  doZrobienia: TodoElement[] = [];
  inputZnowym: string = '';
  pokazWykonane = true;
  pokazNiewykonane = true;

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

  pokazanieNiewykonanych() {
    this.pokazNiewykonane = !this.pokazNiewykonane;
  }

  pokazanieWykonanych() {
    this.pokazWykonane = !this.pokazWykonane;
  }
}

bootstrapApplication(App);
