import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BaseComponent } from '../base/base.component';
import { Product } from '../../models/product';
import { ApiResponse } from '../../responses/api.response';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-collections',
  standalone: true,
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class CollectionsComponent extends BaseComponent implements OnInit {
  categoryId: number = 0;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categoryName: string = '';

  // UI state
  categoryExpanded: boolean = false;
  brandExpanded: boolean = false;
  sortBy: 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest' = 'name-asc';

  // pagination
  currentPage: number = 1; // 1-based for UI
  totalPages: number = 1;
  pages: number[] = [];
  readonly pageSize: number = 12;

  // simple filter model (client-side demo)
  filters: any = {
    kepgiay: false,
    butphannuoc: false,
    dungcuvanphong: false,
    thienlong: false,
    flexoffice: false,
    diem10: false,
    colokit: false,
    khac: false,
    priceRange: ''
  };

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.categoryId = Number(idParam || 0);
      this.currentPage = 1;
      // Load category name for header
      if (this.categoryId) {
        this.categoryService.getDetailCategory(this.categoryId).subscribe({
          next: (res: ApiResponse) => {
            const cat = res.data;
            this.categoryName = (cat && cat.name) ? cat.name : '';
          }
        });
      }
      this.loadProducts();
    });
  }

  private loadProducts(): void {
    const pageZeroBased = this.currentPage - 1;
    this.productService.getProducts('', this.categoryId, pageZeroBased, this.pageSize).subscribe({
      next: (apiResponse: ApiResponse) => {
        const response = apiResponse.data;
        const list: Product[] = response.products;
        list.forEach((p: Product) => {
          p.url = `${environment.apiBaseUrl}/products/images/${p.thumbnail}`;
        });
        this.products = list;
        this.totalPages = response.totalPages || 1;
        this.pages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
        this.applyFilters();
      }
    });
  }

  setSortBy(value: typeof this.sortBy): void {
    this.sortBy = value;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.products];

    // Simple price filter
    if (this.filters.priceRange) {
      const range = this.filters.priceRange as string;
      if (range.includes('+')) {
        const min = Number(range.replace('+', ''));
        result = result.filter(p => p.price >= min);
      } else {
        const [min, max] = range.split('-').map(v => Number(v));
        result = result.filter(p => p.price >= min && p.price <= max);
      }
    }

    // Sorting
    switch (this.sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // If backend sends created_at, sort by it; fallback to id
        result.sort((a, b) => (b as any).created_at ?? b.id - ((a as any).created_at ?? a.id));
        break;
    }

    this.filteredProducts = result;
  }

  clearFilters(): void {
    this.filters = { ...this.filters, kepgiay: false, butphannuoc: false, dungcuvanphong: false, thienlong: false, flexoffice: false, diem10: false, colokit: false, khac: false, priceRange: '' };
    this.sortBy = 'name-asc';
    this.applyFilters();
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadProducts();
  }

  toggleCategoryExpand(): void { this.categoryExpanded = !this.categoryExpanded; }
  toggleBrandExpand(): void { this.brandExpanded = !this.brandExpanded; }

  onProductClick(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}


