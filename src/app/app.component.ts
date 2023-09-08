import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TodoElement } from './interfaces/do_zrobienia';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  doZrobienia: TodoElement[] = [];
  inputZnowym: string = '';
  pokazWykonane = true;
  pokazNiewykonane = true;

  ngOnInit(): void {
    this.doZrobienia = this.wczytajZlocalStorage();
  }

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

  private wczytajZlocalStorage(): TodoElement[] {
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : [];
  }
}

bootstrapApplication(AppComponent);
