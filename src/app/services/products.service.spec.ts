import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { IProduct } from '../models/product.model';
import { FAKE_STORE_API_URL } from '../../constants';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products without category', () => {
    const limit = 5;
    service.getProducts(limit, '').subscribe((products: IProduct[]) => {
      expect(products).toBeTruthy();
      expect(products.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(
      `${FAKE_STORE_API_URL}/products?limit=${limit}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, name: 'Product 1' }]); // Mock response
  });

  it('should retrieve products with category', () => {
    const limit = 5;
    const category = 'electronics';
    service.getProducts(limit, category).subscribe((products: IProduct[]) => {
      expect(products).toBeTruthy();
      expect(products.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(
      `${FAKE_STORE_API_URL}/products/category/${category}?limit=${limit}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, name: 'Product 1' }]); // Mock response
  });

  it('should retrieve a product by ID', () => {
    const productId = 1;
    service.getProductById(productId).subscribe((product: IProduct) => {
      expect(product).toBeTruthy();
      expect(product.id).toEqual(productId);
    });

    const req = httpMock.expectOne(
      `${FAKE_STORE_API_URL}/products/${productId}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush({ id: 1, name: 'Product 1' }); // Mock response
  });

  it('should retrieve categories', () => {
    service.getCategories().subscribe((categories: string[]) => {
      expect(categories).toBeTruthy();
      expect(categories.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(`${FAKE_STORE_API_URL}/products/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(['Electronics', 'Clothing']); // Mock response
  });
});
