import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BirthregisterPage } from './birthregister.page';

describe('BirthregisterPage', () => {
  let component: BirthregisterPage;
  let fixture: ComponentFixture<BirthregisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthregisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BirthregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
