import { Component, Inject, inject } from '@angular/core';
import { BG_IMG_URL, LOGO_URL } from '../../constants/config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  logoUrl = LOGO_URL
  bgUrl = BG_IMG_URL

  email!: string
  password!: string
  loginService = inject(LoginService)
  router = inject(Router)
  toasterService = inject(ToastrService)

  ngOnInit() {
    if (this.loginService.isLoggedIn) {
      this.router.navigateByUrl('/login')
    }
  }

  onSubmit() {
    // caso email ou senha sejam invalidos
    if (!this.email || !this.password) {
      this.toasterService.error("seu email e sua senha")
      return
    }
    // caso sejam validos
    this.loginService.login(this.email, this.password)
    this.toasterService.success("vc conseguiu logar")
    this.router.navigateByUrl('/home')
  }

}
