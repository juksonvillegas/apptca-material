import { Routes } from '@angular/router';
import { PreciosAddeditComponent } from './precios-addedit/precios-addedit.component';
import { PreciosListaComponent } from './precios-lista/precios-lista.component';
import { PreciosEliminarComponent } from './precios-eliminar/precios-eliminar.component';

export const PreciosRutas: Routes = [
    {path: 'agregar', component: PreciosAddeditComponent},
    {path: 'lista', component: PreciosListaComponent},
    {path: 'eliminar/:id', component: PreciosEliminarComponent},
    {path: 'editar/:id', component: PreciosAddeditComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
