import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule, MAT_EXPANSION_PANEL_DEFAULT_OPTIONS} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-productos-addedit',
  templateUrl: './productos-addedit.component.html',
  styleUrls: ['./productos-addedit.component.css']
})
export class ProductosAddeditComponent implements OnInit {
  public formGroup: FormGroup;
  modelo = 'productos/';
  param = '?nombre__icontains=';
  modelos = [];
  id = '';
  dato = {id: '', marca: '-1', marca_nombre: '', modelo: '-1', modelo_nombre: '' , categoria: '-1', categoria_nombre: '',
  precio: '-1', precio_nombre: '', p_unitario: '', p_punto: '', p_docena: '', estado: true };
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
          this.buildForm();
        },
        error => {
          if (error.status === 404) {
            this.router.navigateByUrl('/productos/lista');
          } else { console.log(error); }
        }
      );
    }
  }
  buildForm() {
    const mode = {id: this.dato.modelo, nombre: this.dato.modelo_nombre};
    const cate = {id: this.dato.categoria, nombre: this.dato.categoria_nombre};
    const prec = {id: this.dato.precio, nombre: this.dato.precio_nombre };
    this.formGroup = this.formBuilder.group({
      id: [this.dato.id],
      categoria: [ cate, Validators.compose([Validators.required, Validators.minLength(2), this.validarSeleccionado() ])],
      modelo: [ mode, Validators.compose([Validators.required, Validators.minLength(2), this.validarSeleccionado() ])],
      precio: [ prec, Validators.compose([Validators.required, Validators.minLength(2), this.validarSeleccionado() ])],
    });
    if (!this.dato.estado) {
      this.formGroup.disable();
    }
  }
  autocomplete(modelo , term: string) {
    if (term.length > 1) {
      this.servicio.findDataComplete(modelo , this.param + term).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.modelos = data.results;
        },
        error => {
          console.log(error);
        }
      );
    } else {this.modelos = []; }
  }
  validarSeleccionado(): ValidatorFn {
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
  public getError(controlName: string): string {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }
  guardar() {
    this.formGroup.value.categoria = this.formGroup.value.categoria.id;
    this.formGroup.value.modelo = this.formGroup.value.modelo.id;
    this.formGroup.value.precio = this.formGroup.value.precio.id;
    if (!this.id) {
      this.servicio.addData(this.modelo, this.formGroup.value).subscribe(
        data => {
          this.router.navigateByUrl('/productos/lista');
          this.snackBar.open('Registro agregado...', 'x', {duration: 3000});
        },
        error => {
          this.snackBar.open(error.name, 'x', {duration: 3000});
        }
      );
    } else {
      this.servicio.updateData(this.modelo, this.formGroup.value).subscribe(
        data => {
          this.router.navigateByUrl('/productos/lista');
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
        this.router.navigateByUrl('/productos/lista');
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
