import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarrylistsPage } from './marrylists.page';

describe('MarrylistsPage', () => {
  let component: MarrylistsPage;
  let fixture: ComponentFixture<MarrylistsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarrylistsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarrylistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
