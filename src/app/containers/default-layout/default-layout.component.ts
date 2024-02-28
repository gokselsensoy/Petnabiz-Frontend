import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { AuthService } from 'src/app/services/auth.service';
import { UserForLogin } from 'src/app/models/dtos/userForLogin';
import { User } from 'src/app/models/entities/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  currentUser!: User;
  isAdmin: boolean = false;

  public navItems = navItems;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }



  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
    
    this.isAdmin = this.currentUser.roles.includes('Yönetici');

    const itemsToHide = ['Icons'];

    this.navItems.forEach(item => {
      // Item'ı gizle
      if (item.name && itemsToHide.includes(item.name)) {
        item.attributes = { hidden: !this.isAdmin };
      }
    
      // Children'ları gizle
      if (item.children) {
        item.children.forEach(child => {
          if (child.name && itemsToHide.includes(child.name)) {
            child.attributes = { hidden: !this.isAdmin };
          }
        });
      }
    });
    // this.navItems.forEach(item => {
    //   if (item.children) {
    //     item.children.forEach(child => {
    //       if (child.name && itemsToHide.includes(child.name)) {
    //         child.attributes = { hidden: !this.isAdmin };
    //       }
    //     });
    //   }
    // });
    // const cardsMenuItem = this.navItems.find(item => item.name === 'Hayvanlarım');
    
    // if (cardsMenuItem && cardsMenuItem.children) {
    //   const changeClinicMenuItem = cardsMenuItem.children.find(child => child.name === 'Cards', 'Carousel');
      
    //   if (changeClinicMenuItem) {
    //     changeClinicMenuItem.attributes = {hidden: !this.isAdmin}
    //   }
    // }
  }
}
