import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-ventas-addedit',
  templateUrl: './ventas-addedit.component.html',
  styleUrls: ['./ventas-addedit.component.css']
})
export class VentasAddeditComponent implements OnInit {
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
  ) { }

  ngOnInit() {
  }
  buildForm() {
    const prov = {id: this.dato.proveedor, nombre: this.dato.proveedor_nombre};
    this.formGroup = this.formBuilder.group({
      id: [this.dato.id],
      proveedor: [ prov, Validators.compose([Validators.required, Validators.minLength(2), this.validarProveedor() ])],
      fecha: [this.dato.fecha, Validators.required],
      flete: [this.dato.flete, Validators.compose(
        [Validators.required ])],
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
}
