import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', {
      id: 1,
      title: 'TITLE',
      description: 'DESC',
      photo: 'url',
      price: 9.99,
      stock: 10,
    });

    fixture.detectChanges();
  });

  it ('should display the product photo as image url', () => {
    const photoElement: HTMLImageElement = fixture.nativeElement.querySelector('.card-img-top');
    expect(photoElement.src).toContain('url');
  });

  it ('should display the product description', () => {
    const descriptionElement: HTMLElement = fixture.nativeElement.querySelector('.card-header');
    expect(descriptionElement.textContent).toBe('DESC');
  });

  it ('should display the product title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.card-link');
    expect(titleElement.textContent).toBe('TITLE');
  });

  it ('should display the product price', () => {
    const priceElement: HTMLElement = fixture.nativeElement.querySelector('.card-text');
    expect(priceElement.textContent).toContain('9.99');
  });

  it ('should emit addtobasket event whent the product when add to basket button is clicked', () => {
    //given
    const button = fixture.nativeElement.querySelector('button');
    vi.spyOn(component.addToBasket, 'emit');

    //when
    button.click();

    //then
    //expect(component.addToBasket.emit).toHaveBeenCalledOnce();
    // or this to compare exactly the emitted product.
    expect(component.addToBasket.emit).toHaveBeenCalledExactlyOnceWith({
      id: 1,
      title: 'TITLE',
      description: 'DESC',
      photo: 'url',
      price: 9.99,
      stock: 10,
    });
  });

});
