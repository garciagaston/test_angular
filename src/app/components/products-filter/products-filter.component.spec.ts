import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFilterComponent } from './products-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs';
import { IProduct } from '../../models/product.model';

describe('ProductsFilterComponent', () => {
  let component: ProductsFilterComponent;
  let fixture: ComponentFixture<ProductsFilterComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsFilterComponent, HttpClientModule,
        BrowserAnimationsModule,
        NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories', () => {
    spyOn(productsServiceSpy, 'getCategories').and.returnValue(of(['category1', 'category2']));
    component.getCategories();
    expect(productsServiceSpy.getCategories).toHaveBeenCalled();
  });
});
