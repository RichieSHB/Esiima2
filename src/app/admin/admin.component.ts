import { Component, OnInit } from '@angular/core';
import { contacto } from '../models/contacto.model';
import { perfilesService } from '../perfiles.services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private perfilesService: perfilesService) { }

  contactos!: contacto[];

  ngOnInit(): void {
    this.perfilesService.obtenerContactos()
    .subscribe(
      (contactos: contacto[] = []) => {
        //Cargamos los datos de la base de datos al arreglo de personas local 
        this.contactos = contactos;
        this.perfilesService.setContactos(this.contactos);
        console.log("obtener personas suscriber:" + this.contactos[0].nombre);
      }
    );
  }

}
