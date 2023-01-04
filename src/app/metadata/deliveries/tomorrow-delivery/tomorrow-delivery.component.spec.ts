import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomorrowDeliveryComponent } from './tomorrow-delivery.component';

describe('TomorrowDeliveryComponent', () => {
  let component: TomorrowDeliveryComponent;
  let fixture: ComponentFixture<TomorrowDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomorrowDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TomorrowDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
