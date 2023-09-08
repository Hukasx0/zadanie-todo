import 'zone.js/dist/zone';
import { Component, Input } from '@angular/core';
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
  <br />
  <br />
  <div *ngIf="zwrocWszystkie() > 0; else brak_zadan">
    Ukończyłeś {{ procentUkonczonych() | number:'1.0-0' }}% zadań! Czyli {{ zwrocUkonczone() }}/{{ zwrocWszystkie() }}
  </div>
  <br />
  <br />
  <button (click)="eksportujJakoJson()">Eksportuj jako plik .json</button>
  <ng-template #brak_zadan>
    <span>Nie masz jeszcze żadnych zadań, dodaj jakieś, np. "kup kawę"</span>
  </ng-template>
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
      this.zapiszDoLocalStorage();
      this.inputZnowym = '';
    }
  }

  usunTodo(todo: TodoElement) {
    const obecnyIndeks = this.doZrobienia.indexOf(todo);
    if (obecnyIndeks !== -1) {
      this.doZrobienia.splice(obecnyIndeks, 1);
      this.zapiszDoLocalStorage();
    } else {
      console.error('How did we get here?');
    }
  }

  oznaczZrobione(todo: TodoElement) {
    todo.isDone = !todo.isDone;
    this.zapiszDoLocalStorage();
  }

  pokazanieNiewykonanych() {
    this.pokazNiewykonane = !this.pokazNiewykonane;
  }

  pokazanieWykonanych() {
    this.pokazWykonane = !this.pokazWykonane;
  }

  zwrocUkonczone(): number {
    return this.doZrobienia.filter((todo) => todo.isDone).length;
  }

  zwrocWszystkie(): number {
    return this.doZrobienia.length;
  }

  procentUkonczonych(): number {
    return (this.zwrocUkonczone() / this.zwrocWszystkie()) * 100;
  }

  eksportujJakoJson() {
    const dataToExport = JSON.stringify(this.doZrobienia);
    const blob = new Blob([dataToExport], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_twoich_todos.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // zapisywanie do lokalnej pamięci przeglądarki, po odświeżeniu todos powinny zostać
  private zapiszDoLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.doZrobienia));
  }
}

bootstrapApplication(App);
