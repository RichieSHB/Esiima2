import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { admin } from 'src/app/models/admin.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[AuthService]
})
export class NavbarComponent implements OnInit {
  public isLogged = false;

  public user$: Observable<any> = this.authSvc.authF.user;
  admin!: admin[];
  constructor(private authSvc:AuthService, private router:Router) { }

  async ngOnInit() {
  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      window.location.reload()
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  isAdmin(){
    const currentUser = this.authSvc.usuarioActivo();
    
    if (currentUser == this.admin[0].correo) {
      return true;
    }
    else
      return false;
  }
}
