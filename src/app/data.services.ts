import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { perfil } from "./models/perfil.model";

@Injectable()
export class DataServices {
    constructor(private httpClient: HttpClient){}

    guardarPerfiles(perfiles: perfil[]){
        this.httpClient.post('https://esiima-2-default-rtdb.firebaseio.com/datos.json',perfiles)
        .subscribe(
            response => console.log("Resultado: " + response),
            error => console.log("Error: " + error)
        )
    }
}

