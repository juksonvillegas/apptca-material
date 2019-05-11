import { Routes } from '@angular/router';
import { ComprasAddeditComponent } from './compras-addedit/compras-addedit.component';
import { ComprasListaComponent } from './compras-lista/compras-lista.component';
import { ComprasVerComponent } from './compras-ver/compras-ver.component';

export const ComprasRutas: Routes = [
    {path: 'agregar', component: ComprasAddeditComponent},
    {path: 'lista', component: ComprasListaComponent},
    {path: 'ver/:id', component: ComprasVerComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
