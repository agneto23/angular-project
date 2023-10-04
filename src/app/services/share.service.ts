import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  product: Product = {
    id: '',
    logo: '',
    name: '',
    date_release: '',
    date_revision: '',
    description: ''
  };

  setProduct(newProduct: Product) {
    this.product = newProduct;
  }

  getProduct() {
    return this.product;
  }

  constructor() { }
}
