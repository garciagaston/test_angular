import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsTableComponent } from './products-table.component';
import { ProductsService } from '../../services/products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../../models/product.model';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;
  let mockNgbModal: jasmine.SpyObj<NgbModal>;

  const mockProduct: IProduct = {
    id: 1,
    title: 'Sample Product',
    description: 'This is a sample product',
    category: 'Electronics',
    price: 99.99,
    image: 'sample.jpg',
  };

  beforeEach(() => {
    mockProductsService = jasmine.createSpyObj('ProductsService', [
      'getProductById',
    ]);
    mockNgbModal = jasmine.createSpyObj('NgbModal', ['open']);

    TestBed.configureTestingModule({
      imports: [
        ProductsTableComponent,
        HttpClientModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: NgbModal, useValue: mockNgbModal },
      ],
    });

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
  });

  it('should check displayed product table', () => {
    component.productList = [mockProduct];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('#id_' + mockProduct.id)?.textContent,
    ).toContain(mockProduct.id);
    expect(
      compiled.querySelector('#title_' + mockProduct.id)?.textContent,
    ).toContain(mockProduct.title);
  });
});
