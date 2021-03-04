import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BirthlistsPage } from './birthlists.page';

describe('BirthlistsPage', () => {
  let component: BirthlistsPage;
  let fixture: ComponentFixture<BirthlistsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthlistsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BirthlistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
