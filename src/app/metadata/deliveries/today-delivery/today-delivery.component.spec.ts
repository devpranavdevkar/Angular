import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayDeliveryComponent } from './today-delivery.component';

describe('TodayDeliveryComponent', () => {
  let component: TodayDeliveryComponent;
  let fixture: ComponentFixture<TodayDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
