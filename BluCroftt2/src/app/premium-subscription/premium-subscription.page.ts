import { Component } from '@angular/core';

@Component({
  selector: 'app-premium-subscription',
  templateUrl: './premium-subscription.page.html',
  styleUrls: ['./premium-subscription.page.scss'],
})
export class PremiumSubscriptionPage {

  constructor() { }

  
  subscribe() {
    
    console.log('Suscripción realizada');
  }

}
