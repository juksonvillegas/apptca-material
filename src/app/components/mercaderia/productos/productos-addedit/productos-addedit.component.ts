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
  dato = {id: '', marca: '-1', marca_nombre: '' , categoria: '-1', categoria_nombre: '',
  precio: '-1', p_unitario: '', p_punto: '', p_docena: '', estado: true };
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
    const cate = {id: this.dato.categoria, nombre: this.dato.categoria_nombre};
    const prec = {id: this.dato.precio, p_unitario: this.dato.p_unitario, p_punto: this.dato.p_punto, p_docena: this.dato.p_docena };
    this.formGroup = this.formBuilder.group({
      id: [this.dato.id],
      categoria: [ cate, Validators.compose([Validators.required, Validators.minLength(2), this.validarSeleccionado() ])],
      modelo: [ marc, Validators.compose([Validators.required, Validators.minLength(2), this.validarSeleccionado() ])],
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
    console.log('guardando');
    this.formGroup.value.categoria = this.formGroup.value.categoria.id;
    this.formGroup.value.modelo = this.formGroup.value.modelo.id;
    this.formGroup.value.precio = this.formGroup.value.precio.id;
    console.log(this.formGroup.value);
  }
  retornar() {
    console.log('retornando');
  }
  ngOnInit() {
  }

}
