import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiumSubscriptionPageRoutingModule } from './premium-subscription-routing.module';

import { PremiumSubscriptionPage } from './premium-subscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremiumSubscriptionPageRoutingModule
  ],
  declarations: [PremiumSubscriptionPage]
})
export class PremiumSubscriptionPageModule {}
