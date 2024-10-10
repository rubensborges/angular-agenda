import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FullCalendarModule, CommonModule], // Add CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isModalVisible: boolean = false;
  selectedDate: string = '';

  handleDateClick(arg: DateClickArg): void {
    this.selectedDate = arg.dateStr; // Store the clicked date
    this.isModalVisible = true; // Show the modal
  }

  closeModal(): void {
    this.isModalVisible = false; // Hide the modal
  }

  formattedDate(): string {
    const date = new Date(this.selectedDate);
    return date.toLocaleDateString('pt-BR');
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      start: 'prev today next',
      center: 'title',
      right: 'dayGridMonth timeGridWeek timeGridDay listWeek',
    },
    locale: 'pt-BR',
    slotMinTime: '08:00:00',
    slotMaxTime: '18:00:00',
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' },
    ],
    weekends: false,
  };
}
