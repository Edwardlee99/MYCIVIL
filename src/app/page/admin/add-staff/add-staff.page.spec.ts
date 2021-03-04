import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddStaffPage } from './add-staff.page';

describe('AddStaffPage', () => {
  let component: AddStaffPage;
  let fixture: ComponentFixture<AddStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
