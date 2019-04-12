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
import { MercaderiaComponent } from './components/mercaderia/mercaderia.component';
import { CategoriasComponent } from './components/mercaderia/categorias/categorias.component';
import { CategoriasAddeditComponent } from './components/mercaderia/categorias/categorias-addedit/categorias-addedit.component';
import { CategoriasListaComponent } from './components/mercaderia/categorias/categorias-lista/categorias-lista.component';
import { CategoriasEliminarComponent } from './components/mercaderia/categorias/categorias-eliminar/categorias-eliminar.component';

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
    MercaderiaComponent,
    CategoriasComponent,
    CategoriasAddeditComponent,
    CategoriasListaComponent,
    CategoriasEliminarComponent
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
