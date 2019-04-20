import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-modelos-addedit',
  templateUrl: './modelos-addedit.component.html',
  styleUrls: ['./modelos-addedit.component.css']
})
export class ModelosAddeditComponent implements OnInit {
  public formGroup: FormGroup;
  modelo = 'modelos/';
  param = '?nombre__icontains=';
  marcas = [];
  id = '';
  dato = {id: '', nombre: '', marca: '-1', marca_nombre: '' , extendido: '' , estado: true };
  isLoading = false;
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
  cargarDatos() {
    this.id = this.rutaActiva.snapshot.params.id;
    if (this.id) {
      this.servicio.getDataId(this.modelo, this.id).subscribe(
        data => {
          this.dato = data;
          console.log(this.dato);
          this.buildForm();
        },
        error => {
          if (error.status === 404) {
            this.router.navigateByUrl('/clientes/lista');
          } else { console.log(error); }
        }
      );
    }
  }
  buildForm() {
    const marc = {id: this.dato.marca, nombre: this.dato.marca_nombre};
    this.formGroup = this.formBuilder.group({
      id: [this.dato.id],
      nombre: [this.dato.nombre, Validators.compose([Validators.required, Validators.minLength(2)])],
      marca: [ marc, Validators.compose([Validators.required, Validators.minLength(2), this.validarMarca() ])],
      extendido: [this.dato.extendido],
    });
    if (!this.dato.estado) {
      this.formGroup.disable();
    }
  }
  buscarMarca(term: string) {
    if (term.length > 1) {
      this.servicio.findDataComplete('marcas/', this.param + this.formGroup.value.marca).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.marcas = data.results;
        },
        error => {
          console.log(error);
        }
      );
    } else {this.marcas = []; }
  }
  validarMarca(): ValidatorFn {
    return (control: AbstractControl) => {
      let error = null;
      if (!control.value.id) {
        error = { number: 'incorrectos digitos' };
      }
      return error;
    };
  }
  displayFn(marca) {
    return marca.nombre;
  }
  guardar() {
    // agregar un check que haya id de marca seleccionada
    this.formGroup.value.marca = this.formGroup.value.marca.id;
    if (!this.id) {
      this.servicio.addData(this.modelo, this.formGroup.value).subscribe(
        data => {
          this.router.navigateByUrl('/modelos/lista');
          this.snackBar.open('Registro agregado...', 'x', {duration: 3000});
        },
        error => {
          this.snackBar.open(error.name, 'x', {duration: 3000});
        }
      );
    } else {
      this.servicio.updateData(this.modelo, this.formGroup.value).subscribe(
        data => {
          this.router.navigateByUrl('/modelos/lista');
          this.snackBar.open('Registro actualizado...', 'x', {duration: 3000});
        },
        error => {
          this.snackBar.open(error.name, 'x', {duration: 3000});
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
  retornar() {
    this.dato.estado = true;
    this.servicio.deleteData(this.modelo, this.dato).subscribe(
      data => {
        this.router.navigateByUrl('/modelos/lista');
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
