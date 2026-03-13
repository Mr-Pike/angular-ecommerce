import { Component, inject, Signal } from '@angular/core';
import { ProductCard } from './product/product-card';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { APP_TITLE } from './app.token';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ProductCard, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isHovered = false;
  catalogService = inject(CatalogService);
  basketService = inject(BasketService);
  appTitle = inject(APP_TITLE);

  toggleIsHovered(): void {
    this.isHovered = !this.isHovered;
  }

  products = this.catalogService.products;

  constructor() {
    this.catalogService.fetchProducts().subscribe();
  }

  // products() {
    //return this.catalogService.products();
    //return this.catalogService.fetchProducts().subscribe();
  //}

  get total() {
    return this.basketService.total();
  }

  get count() {
    return this.basketService.count();
  }

  updateTotal(productId: string) {
    this.basketService.addItem(productId).subscribe(
      () => this.catalogService.decreaseStock(productId)
    );
  }

  hasProductsInStock(): Signal<boolean | undefined> {
    return this.catalogService.hasProductsInStock;
  }
}
