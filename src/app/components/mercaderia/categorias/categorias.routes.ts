import { Routes } from '@angular/router';
import { CategoriasAddeditComponent } from './categorias-addedit/categorias-addedit.component';
import { CategoriasListaComponent } from './categorias-lista/categorias-lista.component';
import { CategoriasEliminarComponent } from './categorias-eliminar/categorias-eliminar.component';

export const CategoriasRutas: Routes = [
    {path: 'agregar', component: CategoriasAddeditComponent, outlet: 'categorias'},
    {path: 'lista', component: CategoriasListaComponent, outlet: 'categorias'},
    {path: 'eliminar/:id', component: CategoriasEliminarComponent, outlet: 'categorias'},
    {path: 'editar/:id', component: CategoriasAddeditComponent, outlet: 'categorias'},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
