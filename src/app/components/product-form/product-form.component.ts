import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  minDate: string;
  minReleaseDate: string;
  isUpdate: boolean = false;
  showErrorId: boolean = false;
  product: Product = {
    id: '',
    logo: '',
    name: '',
    date_release: '',
    date_revision: '',
    description: ''
  };

  constructor(
    private service: ProductService,
    private sharedService: ShareService,
    private router: Router,
  ) {
    const currentDate = new Date().toISOString().split('T')[0];
    this.minDate = currentDate;
    this.minReleaseDate = currentDate;
  }

  ngOnInit(): void {
    const productToUpdate = this.sharedService.getProduct();
    productToUpdate.date_release = productToUpdate.date_release.split('T')[0];
    productToUpdate.date_revision = productToUpdate.date_revision.split('T')[0];
    if (productToUpdate.id !== '') {
      this.product = productToUpdate;
      this.isUpdate = true;
    }
  }

  onChangeDateRelease(event: any) {
    const selectDate = event.target.valueAsDate
    selectDate.setFullYear(selectDate.getFullYear() + 1);
    this.minReleaseDate = selectDate.toISOString().split('T')[0];
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.isUpdate = false;
  }

  createNewProduct(form: NgForm) {
    form.touched
    if (!form.valid) return;
    if (this.isUpdate) {
      this.updateProduct();
    } else {
      this.service.verifyProduct(this.product.id).subscribe((flag) => {
        this.showErrorId = flag;
        if (!flag) {
          this.createProduct();
        }
      })
    }
  }

  updateProduct() {
    this.service.updateProduct(this.product).subscribe((products: Product[]) => {
      console.log(products);
      this.navigateToHome();
    });
  }
  createProduct() {
    this.service.createProduct(this.product).subscribe((products: Product[]) => {
      console.log(products);
      this.navigateToHome();
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
    this.product = {
      id: '',
      logo: '',
      name: '',
      date_release: '',
      date_revision: '',
      description: ''
    };
    this.sharedService.setProduct(this.product);
    this.showErrorId = false;
  }
}
