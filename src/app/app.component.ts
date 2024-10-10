import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HomeComponent } from '../components/home/home.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-root',
  standalone: true, // Standalone component flag
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    FullCalendarModule, // Register FullCalendar here
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'new-angular-project';

  // Optional: Add calendar plugins and events for FullCalendar
  calendarPlugins = [];
  calendarEvents = [];
}
