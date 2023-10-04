import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

  httpOptions = {
    headers: new HttpHeaders({
      'authorId': '1',
    })
  };

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/bp/products', this.httpOptions);
  }

  createProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(this.url + '/bp/products', product, this.httpOptions);
  }

  updateProduct(product: Product): Observable<Product[]> {
    return this.http.put<Product[]>(this.url + '/bp/products', product, this.httpOptions);
  }

  deleteProduct(id: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain', 'authorId': '1' }),
  };
    return this.http.delete<string>(this.url + '/bp/products?id=' + id, httpOptions);
  }

  verifyProduct(id: string): Observable<boolean> {
    return this.http.get<boolean>(this.url + '/bp/products/verification?id=' + id, this.httpOptions);
  }
}
