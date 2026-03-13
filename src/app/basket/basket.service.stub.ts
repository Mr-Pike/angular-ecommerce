import { Injectable, signal } from '@angular/core';
import { BasketItem } from './basket-item';
import { BasketService } from './basket.service';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class BasketStubService implements Partial<BasketService> {
  items = signal<BasketItem[]>([]);

  total = signal(0);
  count = signal(0);

  addItem(productId: string) : Observable<BasketItem> {
    return EMPTY;
  }
}