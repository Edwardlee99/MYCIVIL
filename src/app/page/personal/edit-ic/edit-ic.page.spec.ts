import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditIcPage } from './edit-ic.page';

describe('EditIcPage', () => {
  let component: EditIcPage;
  let fixture: ComponentFixture<EditIcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditIcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
