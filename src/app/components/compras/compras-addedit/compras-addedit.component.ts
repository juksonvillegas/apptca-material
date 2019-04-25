import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-compras-addedit',
  templateUrl: './compras-addedit.component.html',
  styleUrls: ['./compras-addedit.component.css']
})
export class ComprasAddeditComponent implements OnInit {
  public formGroup: FormGroup;
  modelo = 'compras/';
  param = '?nombre__icontains=';
  proveedores = [];
  id = '';
  dato = {id: '', proveedor: '', proveedor_nombre: '', flete: 0, fecha: '', estado: true };
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
            this.router.navigateByUrl('/compras/lista');
          } else { console.log(error); }
        }
      );
    }
  }
  buildForm() {
    const prov = {id: this.dato.proveedor, nombre: this.dato.proveedor_nombre};
    this.formGroup = this.formBuilder.group({
      id: [this.dato.id],
      proveedor: [ prov, Validators.compose([Validators.required, Validators.minLength(2), this.validarProveedor() ])],
      fecha: [this.dato.fecha, Validators.required],
      flete: [this.dato.flete, Validators.compose(
        [Validators.required, this.validarFlete() ])],
      productos: this.formBuilder.array([

      ])
    });
    if (!this.dato.estado) {
      this.formGroup.disable();
    }
  }
  buildFormProd(): FormGroup {
    return this.formBuilder.group({
      producto: [Validators.compose([Validators.required])]
    });
  }
  buscarProveedor(term: string) {
    if (term.length > 1) {
      this.servicio.findDataComplete('proveedores/', this.param + this.formGroup.value.proveedor).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.proveedores = data.results;
        },
        error => {
          console.log(error);
        }
      );
    } else {this.proveedores = []; }
  }
  buscarProducto(term: string) {
    if (term.length > 1) {
      this.servicio.findDataComplete('productos/', this.param + this.formGroup.value.proveedor).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.proveedores = data.results;
        },
        error => {
          console.log(error);
        }
      );
    } else {this.proveedores = []; }
  }
  validarProveedor(): ValidatorFn {
    return (control: AbstractControl) => {
      let error = null;
      if (!control.value.id) {
        error = { number: 'Incorrectos digitos' };
      }
      return error;
    };
  }
  validarFlete(): ValidatorFn {
    return (control: AbstractControl) => {
      let error = null;
      if (control.value < 1) {
        error = { number: ' Ingrese valor de flete' };
      }
      return error;
    };
  }
  displayFn(proveedor) {
    return proveedor.nombre;
  }
  guardar() {
    console.log(this.formGroup.value);
    console.log('guardando');
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
    console.log('retornando');
  }
  ngOnInit() {
  }

}
