import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FullCalendarModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isModalVisible: boolean = false;
  selectedDate: string = '';
  dateTime: string = '';
  patientEmail: string = '';
  patientName: string = '';
  allEvents: any[] = [];
  emailForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
    });
  }

  handleDateClick(arg: DateClickArg): void {
    this.selectedDate = arg.dateStr;
    this.dateTime = arg.date.toTimeString().slice(0, 5);
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.emailForm.reset();
  }

  formattedDate(): string {
    const date = new Date(this.selectedDate);
    return date.toLocaleDateString('pt-BR');
  }

  ngOnInit(): void {
    const events = localStorage.getItem('customers');
    if (events) {
      this.allEvents = JSON.parse(events);
    }
    this.calendarOptions.events = this.allEvents;
  }

  onSubmit() {
    if (this.emailForm.valid) {
      this.patientName = this.emailForm.value.name;
      this.patientEmail = this.emailForm.value.email;

      const newEvent = {
        title: this.patientName,
        start: this.selectedDate,
        email: this.patientEmail,
      };

      this.allEvents.push(newEvent);
      localStorage.setItem('customers', JSON.stringify(this.allEvents));

      this.calendarOptions.events = [...this.allEvents];

      const subject = 'Este é um assunto de testes em um programa de testes';
      const body = `Olá ${
        this.patientName
      }, como vai? O horário da sua consulta está marcado para o dia ${this.formattedDate()} às ${
        this.dateTime
      }.`;

      const mailtoLink = `mailto:${
        this.patientEmail
      }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`;

      this.closeModal();
      window.location.href = mailtoLink;
    }
  }

  calendarOptions: CalendarOptions = {
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
            <div>${arg.event.title}</div>  <!-- Ensure title is displayed -->
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
    allDaySlot: false,

    slotMinTime: '07:00:00',
    slotMaxTime: '20:00:00',
    slotDuration: '0:15:00',
    dateClick: (arg) => this.handleDateClick(arg),
    events: this.allEvents,
    weekends: false,
    eventDisplay: 'block',
  };
}
