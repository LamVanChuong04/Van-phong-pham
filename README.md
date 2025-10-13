
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
src/
└── app/
    ├── components/              # Các component hiển thị (UI)
    │   ├── cart/                # Giỏ hàng
    │   ├── product/             # Danh sách và chi tiết sản phẩm
    │   ├── auth/                # Đăng nhập, đăng ký
    │   └── shared/              # Navbar, Footer, Toast, Modal
    │
    ├── dtos/                    # Data Transfer Objects (model giao tiếp API)
    │   ├── product.dto.ts
    │   ├── user.dto.ts
    │   └── order.dto.ts
    │
    ├── exceptions/              # Xử lý lỗi chung (custom error handler)
    ├── guards/                  # Route guards (AuthGuard, AdminGuard)
    ├── interceptors/            # HTTP Interceptors (JWT, Error)
    ├── models/                  # Định nghĩa interface/model dữ liệu
    ├── payment-callback/        # Module xử lý callback từ cổng thanh toán
    ├── responses/               # Các response model từ API
    ├── services/                # Giao tiếp API (UserService, ProductService, AuthService)
    ├── styles/                  # CSS & SCSS toàn cục
    │
    ├── app.config.ts            # Cấu hình app chung
    ├── app.config.server.ts     # Cấu hình chạy server-side rendering
    ├── app.routes.ts            # Định nghĩa router
    │
    ├── assets/                  # Ảnh, icon, font, JSON tĩnh
    ├── environments/            # environment.ts / environment.prod.ts
    ├── index.html               # Trang gốc Angular
    ├── main.ts                  # Entry point chính
    ├── main.server.ts           # SSR entry point
    ├── polyfills.ts             # Polyfills cho trình duyệt cũ
    └── styles.scss              # Style toàn cục
---
### Cài NodeJS & Angular CLI
```bash
install nodejs
npm install --legacy-peer-deps
npm start