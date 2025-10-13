# 🛍️ My Văn Phòng Phẩm - Frontend (Angular)

## 🧭 Giới thiệu

Đây là **frontend** của dự án **My Văn Phòng Phẩm**, được xây dựng bằng **Angular 17** và **Bootstrap 5**.  
Ứng dụng cho phép người dùng xem sản phẩm, lọc theo danh mục, thêm vào giỏ hàng, và thao tác với API backend (Spring Boot).

---

## ⚙️ Công nghệ sử dụng

| Thành phần | Phiên bản |
|-------------|------------|
| Angular | 17.x |
| TypeScript | 5.x |
| Bootstrap | 5.x |

---

## 🚀 Tính năng
- Hiển thị danh sách sản phẩm  
- Lọc sản phẩm
- Xem chi tiết sản phẩm  
- Thêm sản phẩm vào giỏ hàng  
- Xóa sản phẩm khỏi giỏ hàng  
- Hiển thị tổng tiền trong giỏ  
- Hỗ trợ phân trang và toast thông báo
---

## 🧱 Cấu trúc thư mục
src/
 ├─ app/
 │   ├─ components/                # 🧩 Các component hiển thị UI
 │   │   ├─ header/
 │   │   │   ├─ header.component.ts
 │   │   │   ├─ header.component.html
 │   │   │   └─ header.component.scss
 │   │   ├─ footer/
 │   │   ├─ home/
 │   │   ├─ category-page/
 │   │   ├─ product-detail/
 │   │   ├─ cart/
 │   │   └─ shared/                # Các component tái sử dụng
 │
 │   ├─ dtos/                      # 📦 Data Transfer Objects
 │   │   ├─ product.dto.ts
 │   │   ├─ category.dto.ts
 │   │   └─ user.dto.ts
 │
 │   ├─ exceptions/                # ⚠️ Xử lý lỗi ứng dụng
 │   │   ├─ http-error-handler.ts
 │   │   └─ app-error.model.ts
 │
 │   ├─ guards/                    # 🔒 Route Guards
 │   │   ├─ auth.guard.ts
 │   │   └─ admin.guard.ts
 │
 │   ├─ interceptors/              # ⚙️ HTTP Interceptors
 │   │   ├─ auth.interceptor.ts
 │   │   ├─ error.interceptor.ts
 │   │   └─ loading.interceptor.ts
 │
 │   ├─ models/                    # 📘 Interface & Model (domain objects)
 │   │   ├─ product.model.ts
 │   │   ├─ category.model.ts
 │   │   ├─ user.model.ts
 │   │   └─ cart-item.model.ts
 │
 │   ├─ payment-callback/          # 💳 Xử lý callback từ cổng thanh toán 
 │   │   ├─ payment-callback.component.ts
 │   │   └─ payment-callback.service.ts
 │
 │   ├─ responses/                 # 📤 Định nghĩa cấu trúc phản hồi từ backend
 │   │   ├─ api-response.model.ts
 │   │   ├─ paginated-response.model.ts
 │   │   └─ error-response.model.ts
 │
 │   ├─ services/                  # 🔧 Service kết nối API
 │   │   ├─ product.service.ts
 │   │   ├─ category.service.ts
 │   │   ├─ auth.service.ts
 │   │   ├─ cart.service.ts
 │   │   └─ toast.service.ts
 │
 │   ├─ styles/                    # 🎨 SCSS toàn cục hoặc mixin
 │   │   ├─ _variables.scss
 │   │   ├─ _mixins.scss
 │   │   └─ theme.scss
 │
 │   ├─ app.config.ts              # Cấu hình ứng dụng (Angular standalone)
 │   ├─ app.config.server.ts       # Config riêng khi chạy SSR
 │   ├─ app.routes.ts              # Định nghĩa route chính
 │   └─ app.component.ts
 │
 ├─ assets/                        # 🖼️ Hình ảnh, icon, fonts, JSON
 │   ├─ images/
 │   ├─ icons/
 │   └─ mock-data/
 │
 ├─ environments/                  # 🌍 Môi trường build
 │   ├─ environment.ts
 │   └─ environment.prod.ts
 │
 ├─ index.html                     # HTML gốc
 ├─ main.ts                        # Entry chính của Angular
 ├─ main.server.ts                 # Entry khi chạy Angular Universal
 ├─ polyfills.ts                   # Polyfills cho trình duyệt cũ
 ├─ styles.scss                    # SCSS toàn cục
 └─ tsconfig.app.json
### Cài NodeJS & Angular CLI
```bash
install nodejs
npm install --legacy-peer-deps
npm start