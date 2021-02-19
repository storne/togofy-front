import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservaComponent } from './pages/reserva/reserva.component';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent,
  },
  {
    path:"reservas",
    component:ReservaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
