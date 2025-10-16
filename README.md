
# 🛍️ Website Bán Văn Phòng Phẩm - Frontend (Angular)

[![Angular](https://img.shields.io/badge/Angular-18+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

> 🚀 Ứng dụng frontend hiện đại được xây dựng bằng Angular, phục vụ hệ thống bán hàng văn phòng phẩm, kết nối với backend RESTful API.

---

## 📑 Mục Lục
- [✨ Giới Thiệu](#-giới-thiệu)
- [⚙️ Công Nghệ Sử Dụng](#️-công-nghệ-sử-dụng)
- [📁 Cấu Trúc Thư Mục](#-cấu-trúc-thư-mục)
- [🚀 Cài Đặt & Chạy Dự Án](#-cài-đặt--chạy-dự-án)
- [🔐 Bảo Mật & Auth](#-bảo-mật--auth)
- [🌐 Kết Nối API](#-kết-nối-api)
- [🎨 Giao Diện](#-giao-diện)
- [🧠 Best Practices](#-best-practices)
- [🤝 Đóng Góp](#-đóng-góp)

---

## ✨ Giới Thiệu

Dự án này là **frontend** của hệ thống **bán văn phòng phẩm**, được phát triển bằng **Angular 17**, sử dụng **RESTful API với JWT Authentication**.  
Người dùng có thể:
- 🛒 Xem và mua sản phẩm
- 🔍 Lọc, tìm kiếm, sắp xếp sản phẩm
- 👤 Đăng ký / đăng nhập / phân quyền người dùng
- ❤️ Quản lý giỏ hàng, yêu thích, thanh toán
- 💳 Tích hợp callback thanh toán (VNPay, MoMo)

---

## ⚙️ Công Nghệ Sử Dụng

| Thành phần | Mô tả |
|-------------|-------|
| **Angular 17+** | Framework frontend chính |
| **TypeScript 5+** | Ngôn ngữ lập trình chính |
| **Bootstrap 5.3** | CSS framework giao diện |
| **Angular Router** | Điều hướng trang |
| **Interceptor + Guard** | Xác thực JWT và bảo vệ route |
| **SweetAlert2 / Toast** | Hiển thị thông báo thân thiện |
| **Payment Callback Module** | Xử lý phản hồi thanh toán từ API |

---

## 📁 Cấu Trúc Thư Mục

```bash
├── src/
│   ├── app/
│   │   ├── app/
│   │   │   ├── app.component.html
│   │   │   ├── app.component.scss
│   │   │   └── app.component.ts
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── category/
│   │   │   │   │   ├── insert/
│   │   │   │   │   │   ├── insert.category.admin.component.html
│   │   │   │   │   │   ├── insert.category.admin.component.scss
│   │   │   │   │   │   └── insert.category.admin.component.ts
│   │   │   │   │   ├── update/
│   │   │   │   │   │   ├── update.category.admin.component.html
│   │   │   │   │   │   ├── update.category.admin.component.scss
│   │   │   │   │   │   └── update.category.admin.component.ts
│   │   │   │   │   ├── category.admin.component.html
│   │   │   │   │   ├── category.admin.component.scss
│   │   │   │   │   └── category.admin.component.ts
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── dashboard.admin.component.scss
│   │   │   │   ├── detail-order/
│   │   │   │   │   ├── detail.order.admin.component.html
│   │   │   │   │   ├── detail.order.admin.component.scss
│   │   │   │   │   └── detail.order.admin.component.ts
│   │   │   │   ├── order/
│   │   │   │   │   ├── order.admin.component.html
│   │   │   │   │   ├── order.admin.component.scss
│   │   │   │   │   └── order.admin.component.ts
│   │   │   │   ├── product/
│   │   │   │   │   ├── insert/
│   │   │   │   │   │   ├── insert.product.admin.component.html
│   │   │   │   │   │   ├── insert.product.admin.component.scss
│   │   │   │   │   │   └── insert.product.admin.component.ts
│   │   │   │   │   ├── update/
│   │   │   │   │   │   ├── update.product.admin.component.html
│   │   │   │   │   │   ├── update.product.admin.component.scss
│   │   │   │   │   │   └── update.product.admin.component.ts
│   │   │   │   │   ├── product.admin.component.html
│   │   │   │   │   ├── product.admin.component.scss
│   │   │   │   │   └── product.admin.component.ts
│   │   │   │   ├── user/
│   │   │   │   │   ├── user.admin.component.html
│   │   │   │   │   ├── user.admin.component.scss
│   │   │   │   │   └── user.admin.component.ts
│   │   │   │   ├── admin-routes.ts
│   │   │   │   ├── admin.component.html
│   │   │   │   ├── admin.component.scss
│   │   │   │   └── admin.component.ts
│   │   │   ├── auth-callback/
│   │   │   │   ├── auth-callback.component.html
│   │   │   │   ├── auth-callback.component.scss
│   │   │   │   └── auth-callback.component.ts
│   │   │   ├── base/
│   │   │   │   └── base.component.ts
│   │   │   ├── collections/
│   │   │   │   ├── collections.component.html
│   │   │   │   ├── collections.component.scss
│   │   │   │   └── collections.component.ts
│   │   │   ├── detail-order/
│   │   │   │   ├── order.detail.component.html
│   │   │   │   ├── order.detail.component.scss
│   │   │   │   └── order.detail.component.ts
│   │   │   ├── detail-product/
│   │   │   │   ├── detail-product.component.html
│   │   │   │   ├── detail-product.component.scss
│   │   │   │   └── detail-product.component.ts
│   │   │   ├── footer/
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.scss
│   │   │   │   └── footer.component.ts
│   │   │   ├── header/
│   │   │   │   ├── header.component.html
│   │   │   │   ├── header.component.scss
│   │   │   │   └── header.component.ts
│   │   │   ├── home/
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.scss
│   │   │   │   └── home.component.ts
│   │   │   ├── login/
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.scss
│   │   │   │   └── login.component.ts
│   │   │   ├── order/
│   │   │   │   ├── order.component.html
│   │   │   │   ├── order.component.scss
│   │   │   │   └── order.component.ts
│   │   │   ├── register/
│   │   │   │   ├── register.component.html
│   │   │   │   ├── register.component.scss
│   │   │   │   └── register.component.ts
│   │   │   └── user-profile/
│   │   │       ├── user.profile.component.html
│   │   │       ├── user.profile.component.scss
│   │   │       └── user.profile.component.ts
│   │   ├── dtos/
│   │   │   ├── category/
│   │   │   │   ├── insert.category.dto.ts
│   │   │   │   └── update.category.dto.ts
│   │   │   ├── order/
│   │   │   │   ├── cart.item.dto.ts
│   │   │   │   └── order.dto.ts
│   │   │   ├── payment/
│   │   │   │   └── create.payment.dto.ts
│   │   │   ├── product/
│   │   │   │   ├── insert.product.dto.ts
│   │   │   │   └── update.product.dto.ts
│   │   │   └── user/
│   │   │       ├── login.dto.ts
│   │   │       ├── register.dto.ts
│   │   │       └── update.user.dto.ts
│   │   ├── exceptions/
│   │   │   └── ValidationException.ts
│   │   ├── guards/
│   │   │   ├── admin.guard.ts
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── token.interceptor.ts
│   │   ├── models/
│   │   │   ├── category.ts
│   │   │   ├── order.detail.ts
│   │   │   ├── order.ts
│   │   │   ├── product.image.ts
│   │   │   ├── product.ts
│   │   │   ├── role.ts
│   │   │   └── user.ts
│   │   ├── payment-callback/
│   │   │   ├── payment-callback.component.html
│   │   │   ├── payment-callback.component.scss
│   │   │   └── payment-callback.component.ts
│   │   ├── responses/
│   │   │   ├── order/
│   │   │   │   └── order.response.ts
│   │   │   ├── user/
│   │   │   │   ├── login.response.ts
│   │   │   │   └── user.response.ts
│   │   │   └── api.response.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── cart.service.ts
│   │   │   ├── category.service.ts
│   │   │   ├── coupon.service.ts
│   │   │   ├── http.util.service.ts
│   │   │   ├── order.service.ts
│   │   │   ├── payment.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── role.service.ts
│   │   │   ├── toast.service.ts
│   │   │   ├── token.service.ts
│   │   │   └── user.service.ts
│   │   ├── styles/
│   │   │   └── shared-styles.scss
│   │   ├── app.config.server.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   │   └── .gitkeep
│   ├── environments/
│   │   ├── environment.development.ts
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── polyfills.ts
│   └── styles.scss
├── .editorconfig
├── .gitignore
├── README.md
├── angular.json
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── server.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── yarn.lock


---
## Cài NodeJS & Angular CLI

```bash

install nodejs
npm install --legacy-peer-deps
npm start