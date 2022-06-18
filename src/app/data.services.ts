import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { perfil } from "./models/perfil.model";
import { admin } from "./models/admin.model";


@Injectable()
export class DataServices {
    constructor(private httpClient: HttpClient){}

    cargarPerfiles(){
        return this.httpClient.get<perfil[]>('https://esiima-2-default-rtdb.firebaseio.com/datos.json');
    }

    cargarAdmins(){
        return this.httpClient.get<admin[]>('https://esiima-2-default-rtdb.firebaseio.com/datos.json');
    }

    guardarPerfiles(perfiles: perfil[]){
        console.log(perfiles.toString);
        
        this.httpClient.put('https://esiima-2-default-rtdb.firebaseio.com/datos.json',perfiles)
        .subscribe(
            response => console.log("Resultado: " + response),
            error => console.log("Error: " + error)
        )
    }

    modificarPerfil(index:number, perfiles: perfil){
        let url: string;
        url = 'https://esiima-2-default-rtdb.firebaseio.com' + '/datos/' + (index) + '.json';
        console.log("url de modificarPersona:" + url);
        this.httpClient.put( url, perfiles)
            .subscribe(
                (response) => {
                    console.log("resultado modificar Persona: " + response);
                },
                (error) => console.log("Error en modificar Persona: " + error)
            );
    }

    eliminarPerfil(index:number){
        let url: string;
        url = 'https://esiima-2-default-rtdb.firebaseio.com' + '/datos/' + (index) + '.json';
        console.log("url de eliminarPersona:" + url);
        this.httpClient.delete( url)
            .subscribe(
                (response) => {
                    console.log("resultado eliminar Persona: " + response);
                },
                (error) => console.log("Error en eliminar Persona: " + error)
            );
    }

    isAdmin(){
        let url: string;

        url = 'https://esiima-2-default-rtdb.firebaseio.com' + '/datos/' + (index) + '.json';
         
    }
}

