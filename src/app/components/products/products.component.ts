import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IProduct } from '../../models/product.model';
import { ProductsFilterComponent } from '../products-filter/products-filter.component';
import { ProductsTableComponent } from '../products-table/products-table.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ProductsFilterComponent,
    ProductsTableComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  loading: boolean = true;
  subscription!: Subscription;
  category: string = '';
  limit: number = 10;
  products: IProduct[] = [];

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    if (this.localStorageService.getItem('token') === null) {
      this.navigateToLogin();
    }
    this.getProducts();
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.localStorageService.clear();
    this.navigateToLogin();
  }

  getProducts(): void {
    this.loading = true;
    this.subscription = this.productsService
      .getProducts(this.limit, this.category)
      .pipe(
        finalize(() => {
          this.loading = false; //Stop the loading spinner
        }),
      )
      .subscribe({
        next: (res: any) => {
          this.products = res;
        },
        error: (error: any) => {
          console.error('Get Products Error:', error);
        },
      });
  }

  selectedCategory(category: string) {
    this.category = category;
    this.getProducts();
  }

  selectedLimit(limit: number) {
    this.limit = limit;
    this.getProducts();
  }
}
