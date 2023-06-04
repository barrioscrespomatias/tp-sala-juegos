import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoulettewheelComponent } from './roulettewheel.component';

describe('RoulettewheelComponent', () => {
  let component: RoulettewheelComponent;
  let fixture: ComponentFixture<RoulettewheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoulettewheelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoulettewheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
