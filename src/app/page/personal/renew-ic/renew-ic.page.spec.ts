import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { RenewIcPage } from './renew-ic.page';

describe('RenewIcPage', () => {
  let component: RenewIcPage;
  let fixture: ComponentFixture<RenewIcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewIcPage ],
      imports: [IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RenewIcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
