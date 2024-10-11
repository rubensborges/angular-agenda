// modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() selectedDate: string = ''; // Receive selectedDate
  @Input() patientName: string = ''; // Receive patientName
  @Input() patientEmail: string = ''; // Receive patientEmail
  @Output() closeModalEvent = new EventEmitter<void>(); // Emit event to close modal
  @Output() addEventEvent = new EventEmitter<{ name: string; email: string }>(); // Emit new event

  closeModal(): void {
    this.closeModalEvent.emit(); // Emit close modal event
  }

  confirmEvent(): void {
    // Emit new patient details
    this.addEventEvent.emit({
      name: this.patientName,
      email: this.patientEmail,
    });
    this.closeModal(); // Close modal after adding event
  }
}
