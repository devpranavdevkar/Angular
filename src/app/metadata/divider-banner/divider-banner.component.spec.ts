import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerBannerComponent } from './divider-banner.component';

describe('DividerBannerComponent', () => {
  let component: DividerBannerComponent;
  let fixture: ComponentFixture<DividerBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividerBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
