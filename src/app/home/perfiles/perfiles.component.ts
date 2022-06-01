import { Component, Input, OnInit } from '@angular/core';
import { perfil } from 'src/app/models/perfil.model';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {
  perfilesService: any;
  perfiles!: perfil;

  constructor() { }

  ngOnInit(): void {
  }

}
