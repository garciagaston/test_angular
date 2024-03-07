import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-filter',
  standalone: true,
  imports: [MatSelectModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss',
})
export class ProductsFilterComponent implements OnInit {
  loading: boolean = true;
  subscription!: Subscription;
  categories: string[] = [];
  limits: number[] = [5, 10, 20, 50];
  @Input() categorySelected: string = '';
  @Input() limitSelected: number = 10;

  @Output() selectedCategory = new EventEmitter();
  @Output() selectedLimit = new EventEmitter();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  onSelectedCategory() {
    this.selectedCategory.emit(this.categorySelected);
  }

  onSelectedLimit() {
    this.selectedLimit.emit(this.limitSelected);
  }

  getCategories(): void {
    this.loading = true;
    this.subscription = this.productsService
      .getCategories()
      .pipe(
        finalize(() => {
          this.loading = false; //Stop the loading spinner
        }),
      )
      .subscribe({
        next: (res: any) => {
          this.categories = res;
        },
        error: (error: any) => {
          console.error('Get Products Error:', error);
        },
      });
  }
}
