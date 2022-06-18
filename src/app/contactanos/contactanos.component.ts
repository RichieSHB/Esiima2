import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { contacto } from '../models/contacto.model';
import { perfilesService } from '../perfiles.services';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {
  contactos!: contacto[];
  user!: FormGroup;
  constructor(private _fb: FormBuilder,private perfilesService: perfilesService) {}

  createForm() {
    this.user = this._fb.group({
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required],
      email: ["", Validators.email]
    });
  }

  ngOnInit(): void {
    this.createForm();
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

  async onSubmit() {
    const contacto: contacto = this.user.value;
    try {
      const user = await this.perfilesService.agregarContacto(contacto);
      
    } catch (error) {
      
    }
  }

}
