import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { IProduct } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsComponent,
        HttpClientModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productsServiceSpy = TestBed.inject(
      ProductsService,
    ) as jasmine.SpyObj<ProductsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Product List');
  });

  it('should get products when category is selected', () => {
    const product: IProduct = {
      id: 1,
      title: 'Sample Product',
      description: 'This is a sample product',
      category: 'Electronics',
      price: 99.99,
      image: 'sample.jpg',
    };
    spyOn(productsServiceSpy, 'getProducts').and.returnValue(of([product]));
    component.selectedCategory('category1');
    expect(productsServiceSpy.getProducts).toHaveBeenCalled();
  });

  it('should get products when limited is selected', () => {
    const product: IProduct = {
      id: 1,
      title: 'Sample Product',
      description: 'This is a sample product',
      category: 'Electronics',
      price: 99.99,
      image: 'sample.jpg',
    };
    spyOn(productsServiceSpy, 'getProducts').and.returnValue(of([product]));
    component.selectedLimit(10);
    expect(productsServiceSpy.getProducts).toHaveBeenCalled();
  });
});
