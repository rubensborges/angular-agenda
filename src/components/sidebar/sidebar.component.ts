import { Component } from '@angular/core';
import MenuItemsComponent from '../menu-items/menu-items.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuItemsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
