import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyUserPage } from './modify-user.page';

describe('ModifyUserPage', () => {
  let component: ModifyUserPage;
  let fixture: ComponentFixture<ModifyUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
