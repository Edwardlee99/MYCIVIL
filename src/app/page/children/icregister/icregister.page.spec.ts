import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IcregisterPage } from './icregister.page';

describe('IcregisterPage', () => {
  let component: IcregisterPage;
  let fixture: ComponentFixture<IcregisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcregisterPage ],
      imports: [IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(IcregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
