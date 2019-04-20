import { Routes } from '@angular/router';
import { ModelosAddeditComponent } from './modelos-addedit/modelos-addedit.component';
import { ModelosListaComponent } from './modelos-lista/modelos-lista.component';
import { ModelosEliminarComponent } from './modelos-eliminar/modelos-eliminar.component';

export const ModelosRutas: Routes = [
    {path: 'agregar', component: ModelosAddeditComponent},
    {path: 'lista', component: ModelosListaComponent},
    {path: 'eliminar/:id', component: ModelosEliminarComponent},
    {path: 'editar/:id', component: ModelosAddeditComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
