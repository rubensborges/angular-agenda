import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FullCalendarModule, ModalComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isModalVisible: boolean = false;
  selectedDate: string = '';
  patientName: string = '';
  patientEmail: string = '';
  allEvents: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
      this.allEvents = JSON.parse(storedPatients);
    }

    this.initializeCalendarOptions();
  }

  initializeCalendarOptions(): void {
    this.calendarOptions = {
      initialView: 'timeGridWeek',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        start: 'prev today next',
        center: 'title',
        right: 'dayGridMonth timeGridWeek timeGridDay',
      },
      height: '78vh',
      nowIndicator: true,
      eventColor: '#6666e2',
      eventContent: (arg) => {
        return {
          html: `
            <div>
              <div>${arg.event.title}</div>
              <div style="position: absolute; bottom: 0; font-size: 10px; color: #ccc; right: 1px;">
                ${arg.timeText}
              </div>
            </div>
          `,
        };
      },
      locale: 'pt-BR',
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
      },
      slotMinTime: '07:00:00',
      slotMaxTime: '20:00:00',
      slotDuration: '0:15:00',
      dateClick: (arg) => this.handleDateClick(arg),
      events: this.allEvents,
      weekends: false,
      eventDisplay: 'block',
    };
  }

  handleDateClick(arg: DateClickArg): void {
    this.selectedDate = arg.dateStr;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
  formattedDate(): string {
    const date = new Date(this.selectedDate);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString('pt-BR');
  }

  addEvent(patient: { name: string; email: string }): void {
    const newEvent = {
      title: patient.name,
      start: this.selectedDate,
      email: patient.email,
    };

    this.allEvents = [...this.allEvents, newEvent];

    this.updateLocalStorage();

    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.allEvents,
    };

    this.cdr.detectChanges();

    this.closeModal();
    this.patientName = '';
    this.patientEmail = '';
  }

  updateLocalStorage(): void {
    localStorage.setItem('patients', JSON.stringify(this.allEvents));
  }

  calendarOptions: CalendarOptions = {};
}
