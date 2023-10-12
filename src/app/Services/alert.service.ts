import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showAlert(title: string, body: string) {
    alert(`${title}\n ${body}`);
  }
}
