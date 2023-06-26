import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApifugasydireccionesPage } from './apifugasydirecciones.page';

describe('ApifugasydireccionesPage', () => {
  let component: ApifugasydireccionesPage;
  let fixture: ComponentFixture<ApifugasydireccionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApifugasydireccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
