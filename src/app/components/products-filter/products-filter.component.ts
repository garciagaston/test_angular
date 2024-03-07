import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'products-filter',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.scss',
})
export class ProductsFilterComponent {
  loading: boolean = true;
  subscription!: Subscription;
  categories: string[] = [];
  limits: number[] = [5, 10, 20, 50];
  @Input() category: string = '';
  @Input() limit: number = 10;

  categorySelected: string = this.category;
  limitSelected: number = this.limit;

  @Output() selectedCategory = new EventEmitter();
  @Output() selectedLimit = new EventEmitter();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  onSelectedCategory() {
    console.log('child onSelectedCategory', this.categorySelected);
    this.selectedCategory.emit(this.categorySelected);
  }

  onSelectedLimit() {
    console.log('child onSelectedLimit', this.limitSelected);
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
