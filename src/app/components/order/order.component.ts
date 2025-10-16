import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environment';
import { OrderDTO } from '../../dtos/order/order.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrderComponent extends BaseComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  orderForm: FormGroup;
  cartItems: { product: Product, quantity: number }[] = [];
  cart: Map<number, number> = new Map();
  purchasedProducts: Product[] = [];

  totalAmount: number = 0;        // tổng hiện tại (sau giảm nếu có)
  originalTotal: number = 0;      // tổng gốc chưa giảm
  couponDiscount: number = 0;     // số tiền giảm
  couponApplied: boolean = false;

  orderData: OrderDTO = {
    user_id: 0,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    status: 'pending',
    note: '',
    total_money: 0,
    payment_method: 'vnpay',
    shipping_method: 'express',
    coupon_code: '',
    cart_items: []
  };

  constructor() {
    super();
    this.orderForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      note: ['', Validators.required],
      couponCode: [''],
      shipping_method: ['express'],
      payment_method: ['vnpay']
    });
  }

  ngOnInit(): void {
    const userId = this.tokenService.getUserId();
    this.productService.getPurchasedProductsByUser(userId).subscribe({
      next: (products: Product[]) => {
        // Gắn URL đầy đủ cho từng sản phẩm
        this.purchasedProducts = products.map(p => ({
          ...p,
          thumbnail: `${environment.apiBaseUrl}/products/images/${p.thumbnail}`
        }));
      },
      error: (err) => {
        console.error('Lỗi tải sản phẩm đã mua:', err);
      }
    });

    this.orderData.user_id = this.tokenService.getUserId();
    this.orderForm.patchValue({ ...this.orderData });

    this.cart = this.cartService.getCart();
    const productIds = Array.from(this.cart.keys());
    if (productIds.length === 0) return;

    this.productService.getProductsByIds(productIds).subscribe({
      next: (apiResponse: ApiResponse) => {
        const products: Product[] = apiResponse.data || [];
        this.cartItems = productIds.map(id => {
          const product = products.find(p => p.id === id)!;
          product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          return {
            product,
            quantity: this.cart.get(id)!
          };
        });
      },
      complete: () => this.calculateTotal(),
      error: (error: HttpErrorResponse) => {
        this.toastService.showToast({
          error,
          defaultMsg: 'Lỗi tải thông tin sản phẩm',
          title: 'Lỗi Giỏ Hàng'
        });
      }
    });
  }

  /** Tính tổng tiền (gốc và sau giảm) */
  calculateTotal(): void {
    this.originalTotal = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    if (this.couponApplied && this.couponDiscount > 0) {
      this.totalAmount = this.originalTotal - this.couponDiscount;
    } else {
      this.totalAmount = this.originalTotal;
    }
  }

  /** Áp mã giảm giá */
  applyCoupon(): void {
    const couponCode = this.orderForm.get('couponCode')!.value;
    if (couponCode) {
      this.couponService.calculateCouponValue(couponCode, this.originalTotal)
        .subscribe({
          next: (apiResponse: any) => {
            const newTotal = apiResponse.data.result;
            this.couponDiscount = this.originalTotal - newTotal;
            this.totalAmount = newTotal;
            this.couponApplied = true;
          },
          error: () => {
            this.toastService.showToast({
              defaultMsg: 'Mã giảm giá không hợp lệ',
              title: 'Lỗi Coupon'
            });
          }
        });
    }
  }

  /** Xóa mã giảm giá => quay lại giá gốc */
  removeCoupon(): void {
    this.couponApplied = false;
    this.couponDiscount = 0;
    this.totalAmount = this.originalTotal;
    this.orderForm.get('couponCode')!.setValue('');
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updateCartFromCartItems();
      this.calculateTotal();
    }
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.updateCartFromCartItems();
    this.calculateTotal();
  }

  confirmDelete(index: number): void {
  if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
    this.cartItems.splice(index, 1);
    this.updateCartFromCartItems();
    this.calculateTotal();
    
    this.toastService.showToast({
      error: null,
      defaultMsg: 'Sản phẩm đã được xóa khỏi giỏ hàng.',
      title: 'Thành công'
    });
  }
}


  private updateCartFromCartItems(): void {
    this.cart.clear();
    this.cartItems.forEach(item => {
      this.cart.set(item.product.id, item.quantity);
    });
    this.cartService.setCart(this.cart);
  }

  // phần placeOrder giữ nguyên logic của bạn
  placeOrder() {
    if (this.orderForm.valid) {
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      };
      this.orderData.cart_items = this.cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity
      }));
      this.orderData.total_money = this.totalAmount;

      if (this.orderData.payment_method === 'vnpay') {
        const amount = this.orderData.total_money || 0;
        this.paymentService.createPaymentUrl({ amount, language: 'vn' })
          .subscribe({
            next: (res: ApiResponse) => {
              const paymentUrl = res.data;
              const vnp_TxnRef = new URL(paymentUrl).searchParams.get('vnp_TxnRef') || '';
              this.orderService.placeOrder({
                ...this.orderData,
                vnp_txn_ref: vnp_TxnRef
              }).subscribe({
                next: () => window.location.href = paymentUrl,
                error: (err: HttpErrorResponse) => {
                  this.toastService.showToast({
                    error: err,
                    defaultMsg: 'Lỗi trong quá trình đặt hàng',
                    title: 'Lỗi Đặt Hàng'
                  });
                }
              });
            },
            error: (err: HttpErrorResponse) => {
              this.toastService.showToast({
                error: err,
                defaultMsg: 'Lỗi kết nối đến cổng thanh toán',
                title: 'Lỗi Thanh Toán'
              });
            }
          });
      } else {
        this.orderService.placeOrder(this.orderData).subscribe({
          next: () => {
            this.cartService.clearCart();
            this.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => {
            this.toastService.showToast({
              error: err,
              defaultMsg: 'Lỗi trong quá trình đặt hàng',
              title: 'Lỗi Đặt Hàng'
            });
          }
        });
      }
    } else {
      this.toastService.showToast({
        error: 'Vui lòng điền đầy đủ thông tin bắt buộc',
        defaultMsg: 'Vui lòng điền đầy đủ thông tin bắt buộc',
        title: 'Lỗi Dữ Liệu'
      });
      this.orderForm.markAllAsTouched();
    }
  }
  onProductClick(productId: number) {
    debugger;
    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/products', productId]);
  }
}
