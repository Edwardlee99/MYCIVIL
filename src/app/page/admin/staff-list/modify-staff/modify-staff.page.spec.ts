import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyStaffPage } from './modify-staff.page';

describe('ModifyStaffPage', () => {
  let component: ModifyStaffPage;
  let fixture: ComponentFixture<ModifyStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
