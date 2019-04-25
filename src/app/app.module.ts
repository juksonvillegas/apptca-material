import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { BarratituloComponent } from './components/shared/barratitulo/barratitulo.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTES } from './app.routes';
import { ClientesAddeditComponent } from './components/clientes/clientes-addedit/clientes-addedit.component';
import { ClientesListaComponent } from './components/clientes/clientes-lista/clientes-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { BuscarComponent } from './components/shared/buscar/buscar.component';
import { PaginatorComponent } from './components/shared/paginator/paginator.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material';
import { ClientesEliminarComponent } from './components/clientes/clientes-eliminar/clientes-eliminar.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedoresAddeditComponent } from './components/proveedores/proveedores-addedit/proveedores-addedit.component';
import { ProveedoresListaComponent } from './components/proveedores/proveedores-lista/proveedores-lista.component';
import { ProveedoresEliminarComponent } from './components/proveedores/proveedores-eliminar/proveedores-eliminar.component';
import { CategoriasComponent } from './components/mercaderia/categorias/categorias.component';
import { CategoriasAddeditComponent } from './components/mercaderia/categorias/categorias-addedit/categorias-addedit.component';
import { CategoriasListaComponent } from './components/mercaderia/categorias/categorias-lista/categorias-lista.component';
import { CategoriasEliminarComponent } from './components/mercaderia/categorias/categorias-eliminar/categorias-eliminar.component';
import { MarcasComponent } from './components/mercaderia/marcas/marcas.component';
import { MarcasAddeditComponent } from './components/mercaderia/marcas/marcas-addedit/marcas-addedit.component';
import { MarcasListaComponent } from './components/mercaderia/marcas/marcas-lista/marcas-lista.component';
import { MarcasEliminarComponent } from './components/mercaderia/marcas/marcas-eliminar/marcas-eliminar.component';
import { ModelosComponent } from './components/mercaderia/modelos/modelos.component';
import { ModelosAddeditComponent } from './components/mercaderia/modelos/modelos-addedit/modelos-addedit.component';
import { ModelosListaComponent } from './components/mercaderia/modelos/modelos-lista/modelos-lista.component';
import { ModelosEliminarComponent } from './components/mercaderia/modelos/modelos-eliminar/modelos-eliminar.component';
import { PreciosComponent } from './components/mercaderia/precios/precios.component';
import { PreciosAddeditComponent } from './components/mercaderia/precios/precios-addedit/precios-addedit.component';
import { PreciosListaComponent } from './components/mercaderia/precios/precios-lista/precios-lista.component';
import { PreciosEliminarComponent } from './components/mercaderia/precios/precios-eliminar/precios-eliminar.component';
import { ProductosComponent } from './components/mercaderia/productos/productos.component';
import { ProductosAddeditComponent } from './components/mercaderia/productos/productos-addedit/productos-addedit.component';
import { ProductosListaComponent } from './components/mercaderia/productos/productos-lista/productos-lista.component';
import { ProdutosEliminarComponent } from './components/mercaderia/productos/produtos-eliminar/produtos-eliminar.component';
import { ConsignacionesComponent } from './components/consignaciones/consignaciones.component';
import { ConsignacionesAddeditComponent } from './components/consignaciones/consignaciones-addedit/consignaciones-addedit.component';
import { ConsignacionesListaComponent } from './components/consignaciones/consignaciones-lista/consignaciones-lista.component';
import { ConsignacionesEliminarComponent } from './components/consignaciones/consignaciones-eliminar/consignaciones-eliminar.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ComprasAddeditComponent } from './components/compras/compras-addedit/compras-addedit.component';
import { ComprasListaComponent } from './components/compras/compras-lista/compras-lista.component';
import { ComprasEliminarComponent } from './components/compras/compras-eliminar/compras-eliminar.component';


@NgModule({
  declarations: [
    AppComponent,
    BarratituloComponent,
    ClientesComponent,
    ClientesAddeditComponent,
    ClientesListaComponent,
    BuscarComponent,
    PaginatorComponent,
    ClientesEliminarComponent,
    ProveedoresComponent,
    ProveedoresAddeditComponent,
    ProveedoresListaComponent,
    ProveedoresEliminarComponent,
    CategoriasComponent,
    CategoriasAddeditComponent,
    CategoriasListaComponent,
    CategoriasEliminarComponent,
    MarcasComponent,
    MarcasAddeditComponent,
    MarcasListaComponent,
    MarcasEliminarComponent,
    ModelosComponent,
    ModelosAddeditComponent,
    ModelosListaComponent,
    ModelosEliminarComponent,
    PreciosComponent,
    PreciosAddeditComponent,
    PreciosListaComponent,
    PreciosEliminarComponent,
    ProductosComponent,
    ProductosAddeditComponent,
    ProductosListaComponent,
    ProdutosEliminarComponent,
    ConsignacionesComponent,
    ConsignacionesAddeditComponent,
    ConsignacionesListaComponent,
    ConsignacionesEliminarComponent,
    ComprasComponent,
    ComprasAddeditComponent,
    ComprasListaComponent,
    ComprasEliminarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    APP_ROUTES,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
