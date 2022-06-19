import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { admin } from '../models/admin.model';
import { perfil } from '../models/perfil.model';
import { perfilesService } from '../perfiles.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private perfilesService: perfilesService,private authSvc:AuthService, ) { }
  perfiles!: perfil[];
  aux! : perfil;
  perfilesAdmon!: perfil[];
  admin!: admin[];
  mail! : string;
  i:number = 0;
  logged!: boolean;
  public adminC = this.authSvc.authF.currentUser;
  ngOnInit(): void {
    this.perfiles = [];
    this.mail = this.authSvc.Mail;
    this.perfilesService.obtenerperfiles()
    .subscribe(
      (perfiles: perfil[] = []) => {
        //Cargamos los datos de la base de datos al arreglo de personas local 
        for(this.i = 0; this.i <= perfiles.length; this.i++)
        {
          if(perfiles[this.i].correo == this.mail)
          {
            console.log("hOLAAAA: " + this.mail);
            this.perfiles.push(perfiles[this.i]);
            console.log("llegue: " + this.perfiles);
          }
          
        }
        console.log("Aux: " + this.aux);
        this.perfilesService.setperfils(this.perfiles);
      }
    );
    this.perfilesService.obtenerperfiles()
    .subscribe(
      (perfilesAdmon: perfil[] = []) => {
        console.log("Holaaaaaaaa!");
        //Cargamos los datos de la base de datos al arreglo de personas local 
          this.perfilesAdmon = perfilesAdmon;
          this.perfilesService.setperfils(this.perfilesAdmon);
          console.log(this.perfilesAdmon);
      }
    );
    window.document.title = 'Esiima 2';
    this.perfilesService.obtenerAdmins()
    .subscribe(
      (admin: admin[] = []) => {
        //Cargamos los datos de la base de datos al arreglo de personas local 
        this.admin = admin;
        console.log("admin:" + this.admin[0].correo);
      }
    );
    this.logged = this.isLogged(); 
    console.log(this.logged);
    
  }


  registrar(nombre: string,materia: string,calificacion: string, correo:string){
    console.log("hola");
    
    let entrada = new perfil(nombre,materia,calificacion,correo);
    this.perfilesService.agregarperfil(entrada);
  }

  modificar(nombre: string,materia: string,calificacion: string,indice: number, correo:string ){
    console.log(nombre + calificacion + materia + indice);
    
    let entrada = new perfil(nombre,materia,calificacion, correo);
    this.perfilesService.modificarperfil(indice,entrada);
  }

  eliminar(indice: number){
    this.perfilesService.eliminarperfil(indice);
  }

  isAdmin(){
    const currentUser = this.authSvc.usuarioActivo();
    if (currentUser == this.admin[0].correo) {
      return true;
    }
    else
      return false;
  }
  isLogged(){ 
    console.log("entre al logged de home");
    
    return this.logged = this.authSvc.isLogged();
  }
}
