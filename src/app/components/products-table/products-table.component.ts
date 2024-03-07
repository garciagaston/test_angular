import { Component, Input, inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { IProduct } from '../../models/product.model';
import { MatTableModule } from '@angular/material/table';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsDetailComponent } from '../products-detail/products-detail.component';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
})
export class ProductsTableComponent {
  @Input() productList: IProduct[] = [];
  subscription!: Subscription;
  loading: boolean = true;
  displayedColumns: string[] = ['id', 'title', 'price', 'action'];
  showProductDetail: boolean = false;
  product: IProduct | null = null;
  private modalService = inject(NgbModal);

  constructor(private productsService: ProductsService) {}

  openProductDetail(productId: number): void {
    this.product = null;
    this.loading = true;
    this.subscription = this.productsService
      .getProductById(productId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (res: any) => {
          this.product = res;
          const modalRef = this.modalService.open(ProductsDetailComponent);
          modalRef.componentInstance.productSelected = this.product;
        },
        error: (error: any) => {
          console.error('Get Product Error:', error);
        },
      });
  }
}
