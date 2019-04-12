import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ApiService } from '../../../api.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proveedores-addedit',
  templateUrl: './proveedores-addedit.component.html',
  styleUrls: ['./proveedores-addedit.component.css']
})
export class ProveedoresAddeditComponent implements OnInit {
  public formGroup: FormGroup;
  modelo = 'proveedores/';
  id = '';
  dato = {id: '', nombre: '', telefono: '', estado: true };
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
    // ejemplo de serializacion
    this.formGroup = this.formBuilder.group({
      id: [this.dato.id],
      nombre: [this.dato.nombre, Validators.compose([Validators.required, Validators.minLength(5)])],
      telefono: [this.dato.telefono, Validators.compose([Validators.required, this.isNumeric(9)])],
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
            this.router.navigateByUrl('/proveedores/lista');
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
  public getError(controlName: string): string {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }
  guardar() {
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
          this.router.navigateByUrl('/proveedores/lista');
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
        this.router.navigateByUrl('/proveedores/lista');
        this.snackBar.open('Registro recuperado...', 'x', {duration: 5000});
      },
      error => {
        this.snackBar.open(error.name, 'x', {duration: 3000});
      }
    );
  }
  ngOnInit() {
  }

}
