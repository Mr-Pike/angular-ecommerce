import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../product/product';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
 
  private httpClient = inject(HttpClient);

  private _products = signal<Product[] | undefined>(undefined);
  
  fetchProducts() : Observable<Product[]> {
    return this.httpClient
      .get<Product[]>('http://localhost:8080/api/products')
      .pipe(tap(products => this._products.set(products)));
  }

  products = this._products.asReadonly();

  hasProductsInStock = computed(() =>
    this.products()?.some((product: Product) => product.stock > 0),
  );

  /*decreaseStock(productId: string): void {
    this._products.update((products: Product[]) => {
      return products.map((currentProduct: Product) => {
        if (currentProduct.id === productId && currentProduct.stock > 0) {
          return { ...currentProduct, stock: currentProduct.stock - 1 } as Product;
        } else {
          return currentProduct;
        }
      }); 
    });
  }*/

  decreaseStock(productId: string): void {
    this._products.update((products) =>
      products?.map((currentProduct) =>
        currentProduct.id === productId && currentProduct.stock > 0
          ? { ...currentProduct, stock: currentProduct.stock - 1 }
          : currentProduct
      )
    );
  }
}
