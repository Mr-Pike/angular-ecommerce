import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { By } from '@angular/platform-browser';
import { ProductCard } from './product/product-card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
    }).overrideComponent(App, {
      remove: {
        imports: [ProductCard],
      },
      add: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should display the products', () => {
    fixture.detectChanges();
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));

    expect(productDebugElements).toHaveLength(4);

    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(component.products[index]);
    });
  });

  // ----- DOM Testing (the hard way) -----
  it('should update the total when a product emits the "addToBasket" event', () => {
    // Given
    component.total = 99;
    fixture.detectChanges();

    const header = (fixture.nativeElement as HTMLElement).querySelector('header');
    expect(header?.textContent).toContain(99);

    // When
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    productDebugElements[1].triggerEventHandler('addToBasket', component.products[1]);
    fixture.detectChanges();

    // Then
    expect(header?.textContent).toContain(99 + component.products[1].price);
  });

  // ----- Class Testing (the easy way) -----
  it('should update the total when "updateTotal" class method is called', () => {
    // Given
    component.total = 99;

    // When
    component.updateTotal(component.products[1]);

    // Then
    expect(component.total).toBe(99 + component.products[1].price);
  });
});
