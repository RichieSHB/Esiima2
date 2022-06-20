import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  leer : string =  'Las Tres R´s. Rafael: fresco pana muy chill y le hecha ganas Roy: es el cumpleañero y esta jalando chipi Richy: no mas le sabe al backend    Historia:Somos tres amigos que casualmente la inicial de nuestros nombres inician con la letra "R", casualmente siempre hemos trabajado los 3 juntos para sus proyectos.';

  constructor() { }

 
  ngOnInit(): void {
  }

  iniciar(){
    speechSynthesis.cancel();
    let speech = new SpeechSynthesisUtterance(this.leer);
    speechSynthesis.speak(speech);
  }
  detener(){
    speechSynthesis.pause();
  }
  resumir(){
    speechSynthesis.resume();
  }

}


