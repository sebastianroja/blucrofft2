import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiumSubscriptionPage } from './premium-subscription.page';

const routes: Routes = [
  {
    path: '',
    component: PremiumSubscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiumSubscriptionPageRoutingModule {}
