import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PremiumSubscriptionPage } from './premium-subscription.page';

describe('PremiumSubscriptionPage', () => {
  let component: PremiumSubscriptionPage;
  let fixture: ComponentFixture<PremiumSubscriptionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PremiumSubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
