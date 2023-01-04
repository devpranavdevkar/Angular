import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleProductsComponent } from './multiple-products.component';

describe('MultipleProductsComponent', () => {
  let component: MultipleProductsComponent;
  let fixture: ComponentFixture<MultipleProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
