import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMenu = false;
  title = 'apptca-material';
  toggleMenu() {
    this.showMenu = !this.showMenu;
 }
}
