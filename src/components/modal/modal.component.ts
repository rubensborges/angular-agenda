import { Component, Input } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent extends HomeComponent {}
