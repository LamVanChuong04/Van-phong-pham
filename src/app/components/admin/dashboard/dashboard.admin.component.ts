import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { BaseComponent } from '../../base/base.component';
import { OrderResponse } from '../../../responses/order/order.response';
import { ApiResponse } from '../../../responses/api.response';
import { FormsModule } from '@angular/forms';

interface TimeFrameMetric {
  key: 'today' | 'week' | 'year';
  label: string;
  invoices: number;
  revenue: number;
}

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard.admin.component.html',
  styleUrls: ['./dashboard.admin.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class DashboardAdminComponent extends BaseComponent implements OnInit {
  isLoading = false;
  errorMessage = '';

  orders: OrderResponse[] = [];
  totalInvoices = 0;
  totalRevenue = 0;

  selectedDate = this.toDateInputString(new Date());
  selectedDateOrders: OrderResponse[] = [];
  selectedDateInvoices = 0;
  selectedDateRevenue = 0;

  timeFrameMetrics: TimeFrameMetric[] = [
    { key: 'today', label: 'Hôm nay', invoices: 0, revenue: 0 },
    { key: 'week', label: 'Tuần này', invoices: 0, revenue: 0 },
    { key: 'year', label: 'Năm nay', invoices: 0, revenue: 0 },
  ];

  async ngOnInit(): Promise<void> {
    await this.loadDashboardData();
  }

  private async loadDashboardData(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      this.orders = await this.fetchAllOrders();
      this.calculateMetrics();
      this.updateSelectedDateMetrics();
    } catch (error) {
      console.error('Failed to load dashboard data', error);
      this.errorMessage =
        'Không thể tải dữ liệu tổng quan. Vui lòng thử lại sau.';
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchAllOrders(): Promise<OrderResponse[]> {
    const results: OrderResponse[] = [];
    const limit = 50;
    let page = 0;
    let totalPages = 1;

    do {
      const response: ApiResponse = await firstValueFrom(
        this.orderService.getAllOrders('', page, limit)
      );

      const pageOrders: OrderResponse[] = response?.data?.orders ?? [];
      totalPages = response?.data?.totalPages ?? page + 1;

      results.push(...pageOrders);
      page += 1;
    } while (page < totalPages);

    return results;
  }

  private calculateMetrics(): void {
    this.totalInvoices = this.orders.length;
    this.totalRevenue = this.sumRevenue(this.orders);

    const now = new Date();

    const todaysOrders = this.getOrdersForDay(now);
    const weeklyOrders = this.getOrdersForWeek(now);
    const yearlyOrders = this.getOrdersForYear(now);

    this.timeFrameMetrics = [
      {
        key: 'today',
        label: 'Hôm nay',
        invoices: todaysOrders.length,
        revenue: this.sumRevenue(todaysOrders),
      },
      {
        key: 'week',
        label: 'Tuần này',
        invoices: weeklyOrders.length,
        revenue: this.sumRevenue(weeklyOrders),
      },
      {
        key: 'year',
        label: 'Năm nay',
        invoices: yearlyOrders.length,
        revenue: this.sumRevenue(yearlyOrders),
      },
    ];
  }

  onSelectedDateChange(): void {
    this.updateSelectedDateMetrics();
  }

  getOrderProductsSummary(order: OrderResponse): string {
    if (!order.order_details?.length) {
      return 'Không có dữ liệu sản phẩm';
    }

    return order.order_details
      .map((detail) => {
        const productName = detail.product?.name ?? 'Sản phẩm';
        const quantity = detail.number_of_products ?? 0;
        return `${productName} (x${quantity})`;
      })
      .join(', ');
  }

  private updateSelectedDateMetrics(): void {
    if (!this.selectedDate) {
      this.selectedDateOrders = [];
      this.selectedDateInvoices = 0;
      this.selectedDateRevenue = 0;
      return;
    }

    const date = new Date(this.selectedDate);
    this.selectedDateOrders = this.getOrdersForDay(date);
    this.selectedDateInvoices = this.selectedDateOrders.length;
    this.selectedDateRevenue = this.sumRevenue(this.selectedDateOrders);
  }

  private getOrdersForDay(target: Date): OrderResponse[] {
    return this.orders.filter((order) =>
      this.isSameCalendarDay(order.order_date, target)
    );
  }

  private getOrdersForWeek(target: Date): OrderResponse[] {
    const startOfWeek = this.startOfWeek(target);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    return this.orders.filter((order) =>
      this.isWithinRange(order.order_date, startOfWeek, endOfWeek)
    );
  }

  private getOrdersForYear(target: Date): OrderResponse[] {
    const startOfYear = new Date(target.getFullYear(), 0, 1);
    const endOfYear = new Date(target.getFullYear() + 1, 0, 1);

    return this.orders.filter((order) =>
      this.isWithinRange(order.order_date, startOfYear, endOfYear)
    );
  }

  private sumRevenue(orders: OrderResponse[]): number {
    return orders.reduce((sum, order) => sum + (order.total_money ?? 0), 0);
  }

  private isSameCalendarDay(
    orderDateInput: Date | string,
    targetDate: Date
  ): boolean {
    const orderDate = this.toDate(orderDateInput);
    if (!orderDate) {
      return false;
    }

    return (
      formatDate(orderDate, 'yyyy-MM-dd', 'vi-VN') ===
      formatDate(targetDate, 'yyyy-MM-dd', 'vi-VN')
    );
  }

  private isWithinRange(
    orderDateInput: Date | string,
    start: Date,
    end: Date
  ): boolean {
    const orderDate = this.toDate(orderDateInput);
    if (!orderDate) {
      return false;
    }

    return orderDate >= start && orderDate < end;
  }

  private startOfWeek(date: Date): Date {
    const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = result.getDay(); // 0 = Chủ nhật
    const diffToMonday = (day === 0 ? -6 : 1) - day;
    result.setDate(result.getDate() + diffToMonday);
    return result;
  }

  private toDateInputString(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'vi-VN');
  }

  private toDate(value: Date | string | null | undefined): Date | null {
    if (!value) {
      return null;
    }

    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
}

