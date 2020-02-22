import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RestService } from 'src/app/rest.service';
import { Salao } from 'src/app/model/salao';



@Component({
  selector: 'app-associacao-salao',
  templateUrl: './associacao-salao.component.html',
  styleUrls: ['./associacao-salao.component.scss']
})
export class AssociacaoSalaoComponent  {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  salaoCtrl = new FormControl();
  filteredSaloes: Observable<Salao[]>;
  saloes: Salao[] = [];
  allSaloes: Salao[] = [];

  @ViewChild('salaoInput', {static: false}) salaoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private api: RestService) {

    api.getSaloes().subscribe(resp => this.allSaloes = resp);

    this.filteredSaloes = this.salaoCtrl.valueChanges.pipe(
        startWith(null),
        map((salao: string | null) => salao ? this._filter(salao) : this.allSaloes.slice()));
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.saloes.push(this.allSaloes.find(element => element.nome === value.trim()));
      }

      if (input) {
        input.value = '';
      }

      this.salaoCtrl.setValue(null);
    }
  }

  remove(salao: Salao): void {
    const index = this.saloes.indexOf(salao);

    if (index >= 0) {
      this.saloes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.saloes.push(this.allSaloes.find(element => element.nome === event.option.viewValue));
    this.salaoInput.nativeElement.value = '';
    this.salaoCtrl.setValue(null);
  }

  private _filter(filter: string): Salao[] {

    let filterValue = filter
    if(filter.toLocaleLowerCase) {
      filterValue = filter.toLowerCase();
    } 

    return this.allSaloes.filter(salao => salao.nome.toLowerCase().indexOf(filterValue) > 0);
  }

  associar():void {
    this.api.associateSaloes(this.saloes);
  }

}