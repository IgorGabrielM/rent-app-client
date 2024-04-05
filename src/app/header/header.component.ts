import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/@core/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  getHeaderIsDisabled(): boolean {
    if (this.router.routerState.snapshot.url.toLowerCase().indexOf('contract-information') > -1 || this.router.routerState.snapshot.url === '/') {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.loginService.logout().then(() => {
      window.location.reload();
    })
  }

}
