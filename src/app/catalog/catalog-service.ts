import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
   private _products = signal<Product[]>([
    {
      id: 'welsch',
      title: 'Coding the welsch',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-welsch.jpg',
      price: 20,
      stock: 2,
    },
    {
      id: 'world',
      title: 'Coding the world',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-world.jpg',
      price: 18,
      stock: 1,
    },
    {
      id: 'vador',
      title: 'Duck Vador',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-stars.jpg',
      price: 21,
      stock: 2,
    },
    {
      id: 'snow',
      title: 'Coding the snow',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-snow.jpg',
      price: 19,
      stock: 2,
    },
  ]);

  products = this._products.asReadonly();

  hasProductsInStock = computed(() => this.products().some((product) => product.stock > 0));

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
      products.map((currentProduct) =>
        currentProduct.id === productId && currentProduct.stock > 0
          ? { ...currentProduct, stock: currentProduct.stock - 1 }
          : currentProduct
      )
    );
  }
}
