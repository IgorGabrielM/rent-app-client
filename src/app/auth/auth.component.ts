import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/@core/models/user.model';
import { LoginService } from 'src/@core/services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  userLogin: UserModel

  constructor(
    private loginService: LoginService,

    private router: Router,
    //private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.userLogin = new UserModel()
  }

  async onSubmit() {
    //const loading = await this.loadingCtrl.create({ message: 'Fazendo login...' });
    //loading.present();

    const user = await this.loginService.login(this.userLogin)
    if (user) {
      localStorage.setItem('uid', user.user.uid)

      /*       this.toastService.show('Successo', 'Acesso autorizado.', {
              color: 'success',
              duration: 2000,
              position: 'top',
            }); */
      this.router.navigate(['home'])
      //this.loadingCtrl.dismiss();
    } else {
      /*       this.toastService.show('Erro', 'Verifique os dados informados.', {
              color: 'danger',
              duration: 2000,
              position: 'top',
            }); */
      //this.loadingCtrl.dismiss();
    }
  }


}
