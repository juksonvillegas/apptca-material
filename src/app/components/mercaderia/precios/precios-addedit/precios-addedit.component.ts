import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-precios-addedit',
  templateUrl: './precios-addedit.component.html',
  styleUrls: ['./precios-addedit.component.css']
})
export class PreciosAddeditComponent implements OnInit {
  public formGroup: FormGroup;
  modelo = 'precios/';
  id = '';
  dato = {id: '', nombre: '', unitario: '', punto: '', docena: '', estado: true };
  constructor(
    private formBuilder: FormBuilder,
    private servicio: ApiService,
    private snackBar: MatSnackBar,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {
    this.cargarDatos();
    this.buildForm();
  }

  ngOnInit() {
  }
  private buildForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.dato.id],
      nombre: [this.dato.nombre, Validators.compose([Validators.required, Validators.minLength(5)])],
      unitario: [this.dato.unitario, Validators.compose([Validators.required, Validators.minLength(5)])],
      punto: [this.dato.punto, Validators.compose([Validators.required, Validators.minLength(5)])],
      docena: [this.dato.docena, Validators.compose([Validators.required, Validators.minLength(5)])],
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
            this.router.navigateByUrl('/precios/lista');
          } else { console.log(error); }
        }
      );
    }
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
          this.router.navigateByUrl('/precios/lista');
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
        this.router.navigateByUrl('/precios/lista');
        this.snackBar.open('Registro recuperado...', 'x', {duration: 5000});
      },
      error => {
        this.snackBar.open(error.name, 'x', {duration: 3000});
      }
    );
  }
}
