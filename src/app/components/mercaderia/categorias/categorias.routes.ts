import { Routes } from '@angular/router';
import { CategoriasAddeditComponent } from './categorias-addedit/categorias-addedit.component';
import { CategoriasListaComponent } from './categorias-lista/categorias-lista.component';
import { CategoriasEliminarComponent } from './categorias-eliminar/categorias-eliminar.component';

export const CategoriasRutas: Routes = [
    {path: 'agregar', component: CategoriasAddeditComponent},
    {path: 'lista', component: CategoriasListaComponent},
    {path: 'eliminar/:id', component: CategoriasEliminarComponent},
    {path: 'editar/:id', component: CategoriasAddeditComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
