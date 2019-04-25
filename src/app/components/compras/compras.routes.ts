import { Routes } from '@angular/router';
import { ComprasAddeditComponent } from './compras-addedit/compras-addedit.component';
import { ComprasListaComponent } from './compras-lista/compras-lista.component';
import { ComprasEliminarComponent } from './compras-eliminar/compras-eliminar.component';

export const ComprasRutas: Routes = [
    {path: 'agregar', component: ComprasAddeditComponent},
    {path: 'lista', component: ComprasListaComponent},
    {path: 'eliminar/:id', component: ComprasEliminarComponent},
    {path: 'editar/:id', component: ComprasAddeditComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
