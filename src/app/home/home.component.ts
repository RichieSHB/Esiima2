import { Component, OnInit } from '@angular/core';
import { perfil } from '../models/perfil.model';
import { perfilesService } from '../perfiles.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private perfilesService: perfilesService) { }
  perfiles!: perfil[]

  ngOnInit(): void {this.perfilesService.obtenerperfiles()
    .subscribe(
      (perfiles: perfil[] = []) => {
        //Cargamos los datos de la base de datos al arreglo de personas local 
        this.perfiles = perfiles;
        this.perfilesService.setperfils(this.perfiles);
        console.log("obtener personas suscriber:" + this.perfiles[0].name);
      }
    );
    
  }

  registrar(nombre: string,email: string){
    console.log("hola");
    
    let entrada = new perfil(nombre,email);
    this.perfilesService.agregarperfil(entrada);
  }
}
