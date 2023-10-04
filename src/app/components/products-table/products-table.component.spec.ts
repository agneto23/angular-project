import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsTableComponent } from './products-table.component';
import { ProductService } from 'src/app/services/product.service';
import { ShareService } from 'src/app/services/share.service';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  let mockElementRef: Partial<ElementRef>;
  let mockProductService: Partial<ProductService>;
  let mockShareService: Partial<ShareService>;
  let mockRouter: Partial<Router>;

  beforeEach(() => {
    mockElementRef = {};
    mockProductService = {
      createProduct: () => of([]),
      updateProduct: () => of([]),
      verifyProduct: () => of(true),
      getProducts: () => of([]),
      deleteProduct: () => of(''),
    };
    mockShareService = {
      setProduct: () => {},
      getProduct: () => ({
        id: '',
        logo: '',
        name: '',
        date_release: '',
        date_revision: '',
        description: ''
      }),
    };
    mockRouter = {
      navigate: () => Promise.resolve(true),
    };

    TestBed.configureTestingModule({
      declarations: [ProductsTableComponent],
      providers: [
        { provide: ElementRef, useValue: mockElementRef },
        { provide: ProductService, useValue: mockProductService },
        { provide: ShareService, useValue: mockShareService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
