import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Subscription, interval } from 'rxjs';
import { AlertService } from 'src/app/Services/alert.service'; // Import the AlertService

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  hasUnreadNotifications: boolean = true;
  title = 'af-notification';
  message: any = null;
  private notificationInterval: Subscription | undefined;

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
    this.notificationInterval = interval(5000).subscribe(() => {
      this.listen();
    });
  }

  ngOnDestroy(): void {
    if (this.notificationInterval) {
      this.notificationInterval.unsubscribe();
    }
  }

  openNotificationsPage() {
    this.router.navigate(['Components/notifications']);
    this.hasUnreadNotifications = false;
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then(
      (currentToken) => {
        if (currentToken) {
          console.log("Hurraaa!!! we got the token.....");
          console.log(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      console.log('Message received. ', payload);
      this.message = payload;
      this.hasUnreadNotifications = true;



    // Check if payload.notification is defined before accessing its properties
    if (payload.notification) {
      const { title, body } = payload.notification;
      this.alertService.showAlert(title , body);
    } else {
      this.alertService.showAlert('No notification', 'No message body');
    }
    });
  }
}
