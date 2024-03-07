import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../../models/product.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss',
})
export class ProductsDetailComponent {
  activeModal = inject(NgbActiveModal);
  @Input() productSelected: IProduct | null = null;
}
