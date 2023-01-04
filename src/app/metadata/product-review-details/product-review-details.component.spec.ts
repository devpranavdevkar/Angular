import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewDetailsComponent } from './product-review-details.component';

describe('ProductReviewDetailsComponent', () => {
  let component: ProductReviewDetailsComponent;
  let fixture: ComponentFixture<ProductReviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductReviewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
