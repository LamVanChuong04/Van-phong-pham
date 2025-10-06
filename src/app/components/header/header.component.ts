import { Component, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { UserResponse } from '../../responses/user/user.response';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';  
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        NgbModule,
        RouterModule
    ]
})
export class HeaderComponent extends BaseComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;
  cartCount: number = 0;

  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    // Refresh header user state on navigation changes (e.g., after login/logout)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        // refresh cart key on user change
        this.cartService.refreshCart();
      }
    });

    // Subscribe to cart count updates
    this.cartService.cartCount$.subscribe(count => this.cartCount = count);
    // Initialize current count
    this.cartService.refreshCart();
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    if (index === 0) {
      this.router.navigate(['/user-profile']);
    } else if (index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = null;
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/orders']);
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item    
  }

  setActiveNavItem(index: number) {
    this.activeNavItem = index;
    //console.error(this.activeNavItem);
  }
  
}
