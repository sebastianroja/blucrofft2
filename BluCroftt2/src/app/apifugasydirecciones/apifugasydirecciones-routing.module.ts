import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApifugasydireccionesPage } from './apifugasydirecciones.page';

const routes: Routes = [
  {
    path: '',
    component: ApifugasydireccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApifugasydireccionesPageRoutingModule {}
