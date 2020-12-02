import { Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {ProductService} from "../product.service";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    id: 0,
    name: '',
    price: 0.0
  }

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    // @ts-ignore
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    // @ts-ignore
    this.productService.delete(this.product.id).subscribe(product => {
      this.productService.shoMessage('Produto excluído com sucesso!')
      this.router.navigate(['/products'])
    })
  }


  cancel(): void {
    this.router.navigate(['/products'])
  }

}
