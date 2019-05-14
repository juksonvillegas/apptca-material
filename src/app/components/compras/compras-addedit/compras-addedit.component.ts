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
  paramprod = [
    {text: 'Categoria', value: '?categoria__nombre__icontains='},
    {text: 'Modelo', value: '?modelo__nombre__icontains='},
    {text: 'Marca', value: '?modelo__marca__nombre__icontains='}
  ];
  proveedores = [];
  productos = [];
  id = '';
  items: FormArray;
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
      detalles: this.formBuilder.array([
        this.buildFormProd()
      ])
    });
    if (!this.dato.estado) {
      this.formGroup.disable();
    }
  }
  addProduct(): void {
    this.items = this.formGroup.get('detalles') as FormArray;
    this.items.push(this.buildFormProd());
  }
  delProduct(i) {
    this.items.removeAt(i);
  }
  buildFormProd(): FormGroup {
    return this.formBuilder.group({
      producto: '',
      cantidad: '',
      costo: ''
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
      const split = term.split('+');
      if (split.length > 1) {
        let busq = '?';
        split.forEach((value, index) => {
          const param = this.paramprod[index].value.substring(1);
          busq += param + value + '&';
        });
        this.servicio.findDataComplete('productos/', busq).subscribe(
          data => {
          // data results contiene solo el array de datos
          this.productos = data.results;
        },
        error => {
          console.log(error);
        }
        );
        } else {this.productos = []; }
      }
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
  displayFnPro(producto) {
    if (!producto) { return ''; }
    const index = this.productos.findIndex(prod => prod.id === producto);
    return this.productos[index].categoria_nombre.toUpperCase() + ' - ' +
    this.productos[index].marca_nombre.toUpperCase() + ' - ' +
    this.productos[index].modelo_nombre.toUpperCase();
  }
  guardar() {
    let idcompra: number;
    let date: string[];
    if (typeof this.formGroup.value.fecha === 'string') {
      date = this.formGroup.value.fecha.split('T');
    } else {
      date = this.formGroup.value.fecha.toJSON().split('T');
    }
    if (this.formGroup.valid) {
      this.formGroup.value.proveedor = this.formGroup.value.proveedor.id;
      if (!this.id) {
        this.servicio.addData(this.modelo, this.formGroup.value).subscribe(
          data => {
            idcompra = data.id;
            this.formGroup.value.detalles.forEach(detalle => {
              detalle.compra = idcompra;
              console.log(detalle);
              this.servicio.addData('compras_detalle/', detalle).subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                data => {
                  console.log(data);
                },
                error => {
                  this.snackBar.open(error.name, 'x', {duration: 3000});
                }
              );
            });
            this.snackBar.open('Registro agregado...', 'x', {duration: 3000});
          },
          error => {
            this.snackBar.open(error.name, 'x', {duration: 3000});
          }
        );
      }
    }
    this.router.navigateByUrl('/compras/lista');
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
