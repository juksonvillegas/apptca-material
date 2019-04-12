import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ApiService } from '../../../api.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-addedit',
  templateUrl: './clientes-addedit.component.html',
  styleUrls: ['./clientes-addedit.component.css']
})
export class ClientesAddeditComponent {
  public formGroup: FormGroup;
  modelo = 'clientes/';
  id = '';
  dato = {id: '', nombre: '', telefono: '', dni: '', nacimiento: '', sexo: true, mayorista: false, estado: true };
  constructor(
    private formBuilder: FormBuilder,
    private servicio: ApiService,
    private snackBar: MatSnackBar,
    private rutaActiva: ActivatedRoute,
    private router: Router) {
      this.buildForm();
      this.cargarDatos();
    }
  private buildForm() {
    const spliteao = this.dato.nacimiento.split('-');
    const date = new FormControl(new Date(+spliteao[0], +spliteao[1] - 1 , +spliteao[2]).toJSON());
    // ejemplo de serializacion
    this.formGroup = this.formBuilder.group({
      id: [this.dato.id],
      nombre: [this.dato.nombre, Validators.compose([Validators.required, Validators.minLength(10)])],
      dni: [this.dato.dni, Validators.compose([this.isNumeric(8)])],
      telefono: [this.dato.telefono, Validators.compose([Validators.required, this.isNumeric(9)])],
      sexo: this.dato.sexo,
      nacimiento: date,
      mayorista: this.dato.mayorista
    });
    if (!this.dato.estado) {
      this.formGroup.disable();
    }
  }
  cargarDatos() {
    this.id = this.rutaActiva.snapshot.params.id;
    if (this.id) {
      this.servicio.getDataId(this.modelo, this.id).subscribe(
        data => {
          this.dato = data;
          this.buildForm();
        },
        error => {
          if (error.status === 404) {
            this.router.navigateByUrl('/clientes/ver');
          } else { console.log(error); }
        }
      );
    }
  }
  isNumeric(l: number): ValidatorFn {
    return (control: AbstractControl) => {
      let error = { number: 'incorrectos digitos' };
      if (control.value !== null) {
        if (control.value.toString().length === l) {
          let contador = 0;
          for (let i = 0; i < control.value.length; i++) {
            const a = parseInt(control.value.charAt(i), 10);
            if (isNaN(a)) {
              contador++;
            }
            if ( contador === 0) {
              error = null;
            }
          }
        }
      }
      return error;
    };
  }
  guardar() {
    let date: string[];
    if (typeof this.formGroup.value.nacimiento === 'string') {
      date = this.formGroup.value.nacimiento.split('T');
    } else {
      date = this.formGroup.value.nacimiento.toJSON().split('T');
    }
    this.formGroup.value.nacimiento = date[0];
    if (!this.id) {
      this.servicio.addData(this.modelo, this.formGroup.value).subscribe(
        data => {
          this.snackBar.open('Registro agregado...', 'x', {duration: 3000});
          this.formGroup.reset();
        },
        error => {
          this.snackBar.open(error.name, 'x', {duration: 3000});
        }
      );
    } else {
      this.servicio.updateData(this.modelo, this.formGroup.value).subscribe(
        data => {
          this.router.navigateByUrl('/clientes/lista');
          this.snackBar.open('Registro actualizado...', 'x', {duration: 3000});
        },
        error => {
          this.snackBar.open(error.name, 'x', {duration: 3000});
        }
      );
    }
  }
  retornar() {
    this.dato.estado = true;
    this.servicio.deleteData(this.modelo, this.dato).subscribe(
      data => {
        this.router.navigateByUrl('/clientes/lista');
        this.snackBar.open('Registro recuperado...', 'x', {duration: 5000});
      },
      error => {
        this.snackBar.open(error.name, 'x', {duration: 3000});
      }
    );
  }
  public getError(controlName: string): string {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }
}
