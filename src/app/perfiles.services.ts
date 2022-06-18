import { perfil } from './models/perfil.model';
// import { LoggingService } from './LoggingService.service';
import { Injectable } from '@angular/core';
import { DataServices } from './data.services';
import { Observable } from 'rxjs/internal/Observable';
import { admin } from './models/admin.model';
import { contacto } from './models/contacto.model';

@Injectable()
export class perfilesService {
  perfiles: perfil[] = [];
  contactos: contacto[] = [];

  constructor(private dataService: DataServices) {}

  //Lo usamos para iniciar el arreglo, ya que ya es asincrono desde la BD
  //Se inicializa desde el compoente perfilsComponent
  setperfils(perfil: perfil[]) {
    this.perfiles = perfil;
  }

  setContactos(contactos: contacto[]) {
    this.contactos = contactos;
  }

  obtenerperfiles() :Observable<perfil[]> {
    return this.dataService.cargarPerfiles();
  }

  obtenerAdmins() :Observable<admin[]> {
    return this.dataService.cargarAdmins();
  }
  
  obtenerContactos() :Observable<contacto[]>{
    return this.dataService.cargarContactos();
  }

  agregarperfil(perfil: perfil) {
    if (this.perfiles == null) {
      this.perfiles = [];
    }
    this.perfiles.push(perfil);
    this.dataService.guardarPerfiles(this.perfiles);
    //Si se guarda solo un elemento se debe trabajar cada indice y regenerarlos con cada modificacion
  }
  agregarContacto(contacto: contacto) {
    if (this.contactos == null) {
      this.contactos = [];
    }
    this.contactos.push(contacto);
    this.dataService.guardarContactos(this.contactos);
    //Si se guarda solo un elemento se debe trabajar cada indice y regenerarlos con cada modificacion
    //this.dataService.guardarperfil(perfil, this.perfils.length);
  }

  encontrarperfil(index: number) {
    let perfil: perfil = this.perfiles[index];
    return perfil;
  }

  modificarperfil(index: number, perfil: perfil) {
    
    let perfil1 = this.perfiles[index];
    perfil1.name = perfil.name;
    perfil1.materia = perfil.materia;
    perfil1.calificacion = perfil.calificacion;
    this.dataService.modificarPerfil(index, perfil);
  }

  modificarperfiles() {
    if (this.perfiles != null)
      //Guarda todas las perfils nuevamente para regenerar indicess
      this.dataService.guardarPerfiles(this.perfiles);
  }

  eliminarperfil(index: number) {
    this.perfiles.splice(index, 1);
    this.dataService.eliminarPerfil(index);
    //Se vuelven a guardar todas las perfils para que coincida el indice con el arreglo en memoria
    this.modificarperfiles();
  }
}
