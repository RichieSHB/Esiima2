import { perfil } from './models/perfil.model';
// import { LoggingService } from './LoggingService.service';
import { Injectable } from '@angular/core';
import { DataServices } from './data.services';

@Injectable()
export class perfilsService{
    perfiles: perfil[] = [];

    constructor(private loggingService: LoggingService,
                private dataService: DataServices
        ){}

    //Lo usamos para iniciar el arreglo, ya que ya es asincrono desde la BD
    //Se inicializa desde el compoente perfilsComponent    
    setperfils(perfil: perfil[]){
        this.perfils = perfil;
    }

    obtenerperfils(){
        return this.dataService.cargarperfils();
    }

    agregarperfil(perfil: perfil){
        this.loggingService.enviaMensajeAConsola("agregamos perfil:" + perfil.toString());
        if(this.perfiles == null){
            this.perfiles = [];            
        }
        this.perfiles.push(perfil);
        this.dataService.guardarPerfiles(this.perfiles);
        //Si se guarda solo un elemento se debe trabajar cada indice y regenerarlos con cada modificacion
        //this.dataService.guardarperfil(perfil, this.perfils.length);

    }

    encontrarperfil(index:number){
        let perfil:perfil = this.perfiles[index];
        this.loggingService.enviaMensajeAConsola("perfil encontrada:" + perfil.toString());
        return perfil;
    }

    modificarperfil(index:number, perfil:perfil){
        this.loggingService.enviaMensajeAConsola("perfil a modificar:" + perfil.toString() + " con indice:" + index);
        let perfil1 = this.perfiles[index];
        perfil1.nombre = perfil.nombre;
        perfil1.apellido = perfil.apellido;
        this.dataService.modificarperfil(index, perfil);

    }

    modificarperfils(){
        this.loggingService.enviaMensajeAConsola("modificar todas las perfils:");
        if(this.perfils != null)
            //Guarda todas las perfils nuevamente para regenerar indicess
            this.dataService.guardarPerfiles(this.perfiles);
      
    }

    eliminarperfil(index:number){
        this.loggingService.enviaMensajeAConsola("eliminar perfil con indice: " + index); 
        this.perfils.splice(index,1);
        this.dataService.eliminarperfil(index);
        //Se vuelven a guardar todas las perfils para que coincida el indice con el arreglo en memoria
        this.modificarperfils();
    }
}