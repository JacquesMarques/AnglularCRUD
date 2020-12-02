import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../product.model";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    id: 0,
    name: '',
    price: 0.0
  }

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log('Id: ', id)
    // @ts-ignore
    this.productService.readById(id).subscribe(product => {
      this.product = product
      console.log(product.id)
    })
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.shoMessage('Produto atualizado com sucesso!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
