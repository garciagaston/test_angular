import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product.model';
import { FAKE_STORE_API_URL } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(limit: number, category: string): Observable<IProduct[]> {
    if (category) {
      return this.http.get<IProduct[]>(
        `${FAKE_STORE_API_URL}/products/category/${category}?limit=${limit}`,
      );
    }
    return this.http.get<IProduct[]>(
      `${FAKE_STORE_API_URL}/products?limit=${limit}`,
    );
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(
      `${FAKE_STORE_API_URL}/products/${productId}`,
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${FAKE_STORE_API_URL}/products/categories`);
  }
}
