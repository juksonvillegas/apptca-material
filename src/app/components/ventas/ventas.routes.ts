import { Routes } from '@angular/router';
import { VentasAddeditComponent } from './ventas-addedit/ventas-addedit.component';
import { VentasListaComponent } from './ventas-lista/ventas-lista.component';
import { VentasVerComponent } from './ventas-ver/ventas-ver.component';

export const VentasRutas: Routes = [
    {path: 'agregar', component: VentasAddeditComponent},
    {path: 'lista', component: VentasListaComponent},
    {path: 'ver/:id', component: VentasVerComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
