import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../../models/product.model';
import { ProductsDetailComponent } from './products-detail.component';

describe('ProductsDetailComponent', () => {
  let component: ProductsDetailComponent;
  let fixture: ComponentFixture<ProductsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDetailComponent],
      providers: [NgbActiveModal], // Provide NgbActiveModal as a dependency
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a null productSelected initially', () => {
    expect(component.productSelected).toBeNull();
  });

  it('should set productSelected when input changes', () => {
    const mockProduct: IProduct = {
      id: 1,
      title: 'Sample Product',
      description: 'This is a sample product',
      category: 'Electronics',
      price: 99.99,
      image: 'sample.jpg',
    };
    component.productSelected = mockProduct;
    expect(component.productSelected).toEqual(mockProduct);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(
      mockProduct.title,
    );
    expect(compiled.querySelector('#category')?.textContent).toContain(
      mockProduct.category,
    );
    expect(compiled.querySelector('#description')?.textContent).toContain(
      mockProduct.description,
    );
    expect(compiled.querySelector('#price')?.textContent).toContain(
      mockProduct.price,
    );
  });
});
