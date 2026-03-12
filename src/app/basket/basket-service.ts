import { computed, Injectable, signal } from '@angular/core';
import { BasketItem } from './basket-item';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private _items = signal<BasketItem[]>([]);

  items = this._items.asReadonly();

  total = computed<number>(() => this.items().reduce((total, item) => total + item.price, 0));
  count = computed<number>(() => this.items().length);

  addItem(item: BasketItem): void {
    this._items.update(items => [...items, item]);
    //this.total.update((total) => total + item.price);
  }
 
}
