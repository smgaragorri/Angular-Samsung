import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

import { Person } from './../../interfaces/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  genderList = [{ id:1 , value:'Hombre'}, { id:2 , value:'Mujer'}, { id:3 , value:'No especificado'}, { id:4 , value:'Otro'}];
  genderControl = new FormControl('', [Validators.required]);

  do: String = 'insert';
  position: any = 0;

  contacts: Array<Person> = [];

  contact: Person = {
    name: '',
    surname: '',
    age: '',
    dni: '',
    birthday: '',
    favouriteColour: '',
    gender: '',
    notes: '',
  };

  favouriteColours = [
    { id: 1, value: 'Rosa' },
    { id: 2, value: 'Azul' },
    { id: 3, value: 'Negro' },
    { id: 4, value: 'Naranja' },
    { id: 5, value: 'Verde' },
    { id: 6, value: 'Lila' },
    { id: 7, value: 'Rojo' },
    { id: 8, value: 'Amarillo' },
  ];

  constructor() {}

  ngOnInit(): void {}
  add(form: NgForm) {
    if (this.do === 'insert') {
      let birthDate = new Date(this.contact.birthday);
      let day = birthDate.getDay();
      let month = birthDate.getMonth();
      let year = birthDate.getFullYear();
      let ageNum = parseInt(this.contact.age);
  
      this.contact.birthday = `${day}/${month}/${year}`;
      if (ageNum > 0 && ageNum <= 125) {
        this.contacts.push(this.contact);
      }

      this.contact = {
        name: '',
        surname: '',
        age: '',
        dni: '',
        birthday: new Date(),
        favouriteColour: '',
        gender: '',
        notes: '',
      };
    } else {
      this.contacts[this.position] = this.contact;
      this.do = 'insert';
    }
    form.resetForm();
  }

  delete(delPosition: number): void {
    this.contacts.splice(delPosition, 1);
  }
  update(upPosition: number): void {
    this.contact = this.contacts[upPosition];
    this.do = 'update';
    this.position = upPosition;
  }
}
