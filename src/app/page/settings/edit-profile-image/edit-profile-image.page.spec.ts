import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditProfileImagePage } from './edit-profile-image.page';

describe('EditProfileImagePage', () => {
  let component: EditProfileImagePage;
  let fixture: ComponentFixture<EditProfileImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
