import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Person } from './../../interfaces/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  genderList = [
    { id: 1, value: 'Hombre' },
    { id: 2, value: 'Mujer' },
    { id: 3, value: 'No especificado' },
    { id: 4, value: 'Otro' },
  ];

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

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}
  add(form: NgForm) {
    if (this.do === 'insert') {
      this.contact.birthday = this.datePipe.transform(
        this.contact.birthday,
        'dd/MM/yyyy'
      );
      this.contacts.push(this.contact);
    } else {
      this.contact.birthday = this.datePipe.transform(
        this.contact.birthday,
        'dd/MM/yyyy'
      );
      this.contacts[this.position] = this.contact;
      this.do = 'insert';
    }
    this.contact = {
      name: '',
      surname: '',
      age: '',
      dni: '',
      birthday: '',
      favouriteColour: '',
      gender: '',
      notes: '',
    };
    form.resetForm();
  }

  delete(delPosition: number): void {
    this.contacts.splice(delPosition, 1);
  }
  update(upPosition: number): void {
    this.contact = this.contacts[upPosition];
    var birthDate = this.contact.birthday.split('/');
    this.contact.birthday = new Date(
      parseInt(birthDate[2], 10),
      parseInt(birthDate[1], 10) - 1,
      parseInt(birthDate[0], 10)
    );
    this.do = 'update';
    this.position = upPosition;
  }
}
