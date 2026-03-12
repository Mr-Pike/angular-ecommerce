import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCard } from './product/product-card';
import { Product } from './product/product';
import { CatalogService } from './catalog/catalog-service';
import { BasketService } from './basket/basket-service';
import { APP_TITLE } from './app.token';

@Component({
  selector: 'app-root',
  imports: [ProductCard],
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

  get products() {
    return this.catalogService.products();
  }

  get total() {
    return this.basketService.total();
  }

  get count() {
    return this.basketService.count();
  }

  updateTotal(product: Product) {
    this.basketService.addItem(product);
    this.catalogService.decreaseStock(product.id);
  }

  hasProductsInStock(): Signal<boolean> {
    return this.catalogService.hasProductsInStock;
  }
}
