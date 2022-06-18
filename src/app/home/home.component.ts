import { Component, OnInit } from '@angular/core';
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
  perfiles!: perfil[]
  admin!: admin[];

  public adminC = this.authSvc.authF.currentUser;
  ngOnInit(): void {this.perfilesService.obtenerperfiles()
    .subscribe(
      (perfiles: perfil[] = []) => {
        //Cargamos los datos de la base de datos al arreglo de personas local 
        this.perfiles = perfiles;
        this.perfilesService.setperfils(this.perfiles);
        console.log("obtener personas suscriber:" + this.perfiles[0].name);
      }
    );
    
    this.perfilesService.obtenerAdmins()
    .subscribe(
      (admin: admin[] = []) => {
        //Cargamos los datos de la base de datos al arreglo de personas local 
        this.admin = admin;
        console.log("admin:" + this.admin[0].correo);
      }
    );

  }

  registrar(nombre: string,materia: string,calificacion: string){
    console.log("hola");
    
    let entrada = new perfil(nombre,materia,calificacion);
    this.perfilesService.agregarperfil(entrada);
  }

  modificar(nombre: string,materia: string,calificacion: string,indice: number){
    console.log(nombre + calificacion + materia + indice);
    
    let entrada = new perfil(nombre,materia,calificacion);
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
}
