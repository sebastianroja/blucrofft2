import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApifugasydireccionesPageRoutingModule } from './apifugasydirecciones-routing.module';

import { ApifugasydireccionesPage } from './apifugasydirecciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApifugasydireccionesPageRoutingModule
  ],
  declarations: [ApifugasydireccionesPage]
})
export class ApifugasydireccionesPageModule {}
