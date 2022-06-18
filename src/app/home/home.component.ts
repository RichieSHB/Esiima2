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
}
