import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  cartItemCount=new BehaviorSubject(0) //To hold cart item count

  searchTerm=new BehaviorSubject('') //To hold search value

  constructor(private http:HttpClient) {
    this.cartCount()
  }

  BASE_URL = 'https://ecart-a6ak.onrender.com'

  getAllProducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }

  //api function to view particular products from the database
  viewProduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
  }

  //api function to add products to the wishlist
  addTowishlist(id:any,title:any,price:any,image:any){
    const body = {
      id,
      title,
      price,
      image
    }
    return this.http.post(`${this.BASE_URL}/wishlists/add-to-wishlist`, body)
  }

  //view wishlist product
  viewWishlist(){
    return this.http.get(`${this.BASE_URL}/wishlists/view-all-wishlists`)
  }

  //delete wishlist products
  deleteWishlistProduct(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlist/delete-wishlist-product/${id}`)

  }
  //add to cart
  addToCart(product:any){
    //get the product details - id,title,price,image,quantity

    const body = {
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
    return this.http.post(`${this.BASE_URL}/carts/add-to-cart`, body)

  }

  //get cart product
  getCart(){
    return this.http.get(`${this.BASE_URL}/carts/get-cart`)
  }

  //To get cart products count
  cartCount(){
    this.getCart().subscribe((result:any)=>{
      this.cartItemCount.next(result.length)
    })
  }

  //delete cart product
  deleteProduct(id:any){
    return this.http.delete(`${this.BASE_URL}/carts/delete-product/${id}`)
  }

  //increment product
  incrementProduct(id:any){
    return this.http.get(`${this.BASE_URL}/carts/increment-product/${id}`)
  }
  //decrement product
  decrementCartProductCount(id:any){
    return this.http.get(`${this.BASE_URL}/carts/decrement-product/${id}`)
  }
  
}
