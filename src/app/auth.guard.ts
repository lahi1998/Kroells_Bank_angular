import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('jwtToken');

    if (token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
