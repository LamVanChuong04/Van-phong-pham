import { Injectable, Inject } from '@angular/core';
import { Product } from '../models/product';
import { CommonModule, DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: Map<number, number> = new Map<number, number>(); // Dùng Map để lưu trữ giỏ hàng, key là id sản phẩm, value là số lượng
  localStorage?:Storage;
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
    // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service            
    this.refreshCart()
  }
  public  refreshCart(){
    const storedCart = this.localStorage?.getItem(this.getCartKey());
    if (storedCart) {
      this.cart = new Map(JSON.parse(storedCart));
    } else {
      this.cart = new Map<number, number>();
    }
    this.emitCartCount();
  }
  private getCartKey():string {    
    const userResponseJSON = this.localStorage?.getItem('user');
    let userResponse: any = null;
    try {
      userResponse = userResponseJSON ? JSON.parse(userResponseJSON) : null;
    } catch {
      userResponse = null;
    }
    debugger
    // Use a stable guest key when not logged in
    return `cart:${userResponse?.id ?? 'guest'}`;

  }

  addToCart(productId: number, quantity: number = 1): void {
    debugger
    if (this.cart.has(productId)) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên `quantity`
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào với số lượng là `quantity`
      this.cart.set(productId, quantity);
    }
     // Sau khi thay đổi giỏ hàng, lưu trữ nó vào localStorage
    this.saveCartToLocalStorage();
    this.emitCartCount();
  }
  
  getCart(): Map<number, number> {
    return this.cart;
  }
  // Lưu trữ giỏ hàng vào localStorage
  private saveCartToLocalStorage(): void {
    debugger
    this.localStorage?.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
  }  
  setCart(cart : Map<number, number>) {
    this.cart = cart ?? new Map<number, number>();
    this.saveCartToLocalStorage();
    this.emitCartCount();
  }
  // Hàm xóa dữ liệu giỏ hàng và cập nhật Local Storage
  clearCart(): void {
    this.cart.clear(); // Xóa toàn bộ dữ liệu trong giỏ hàng
    this.saveCartToLocalStorage(); // Lưu giỏ hàng mới vào Local Storage (trống)
    this.emitCartCount();
  }

  // Utility for logout flow to zero the displayed count immediately, and
  // ensure guest cart is empty as well.
  resetForLogout(): void {
    this.cart = new Map<number, number>();
    // Remove both potential keys (user and guest)
    const userKey = this.getCartKey();
    try { this.localStorage?.removeItem(userKey); } catch {}
    try { this.localStorage?.removeItem('cart:guest'); } catch {}
    this.emitCartCount();
  }

  private emitCartCount(): void {
    const total = Array.from(this.cart.values()).reduce((sum, qty) => sum + qty, 0);
    this.cartCountSubject.next(total);
  }
}
