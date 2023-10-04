import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {

  @HostListener('document:click', ['$event'])

  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showContextMenu = false;
    }
  }

  products: Product[] = []
  productsToSearch: Product[] = []
  itemsPerPage: number = 3;
  currentPage: number = 1;
  options = [3, 5, 10];
  showModal: boolean = false;
  showContextMenu = false;
  contextMenuX = 0;
  contextMenuY = 0;

  constructor(
    private router: Router,
    private service: ProductService,
    private eRef: ElementRef,
    private sharedService: ShareService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.productsToSearch = this.products;
    });
  }

  searchProducts(text: string) {
    this.productsToSearch = this.products;
    this.productsToSearch = this.productsToSearch.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
  }

  pagination() {
    const begin: number = (this.currentPage - 1) * this.itemsPerPage;
    const end: number = begin + Number(this.itemsPerPage);
    return this.productsToSearch.slice(begin, end);
  }

  lastPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  totalPages(): number {
    return Math.ceil(this.productsToSearch.length / this.itemsPerPage);
  }

  onOptionChange() {
    this.currentPage = 1;
  }

  navigateToProductForm() {
    this.router.navigate(['/product']);
  }

  openContextMenu(event: MouseEvent, product: Product) {
    this.sharedService.setProduct(product);
    event.preventDefault();
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
    this.showContextMenu = true;
  }

  closeContextMenu() {
    this.showContextMenu = false;
  }

  actionMenu(option: string) {
    if (option === 'update') {
      this.navigateToProductForm();
    }
    if (option === 'delete') {
      this.openModal();
    }
    this.closeContextMenu();
  }


  openModal() {
    this.showModal = true;
  }

  callToAction(flag: boolean) {
    if (flag) {
      this.deleteProduct();
    }
    this.showModal = false;
  }

  deleteProduct() {
    this.service.deleteProduct(this.sharedService.getProduct().id).subscribe(
      (error) => {
        this.getProducts();
      });
  }
}
