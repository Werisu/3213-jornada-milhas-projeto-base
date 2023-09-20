import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  perfilComponent: boolean = true;
  titulo: string = 'Olá pessoa';
  textoBotao: string = 'ATUALIZAR';

  deslogar(){
    console.log('logout realizado');
  }

  atualizar(){
    console.log('atualizar realizado');
  }
}
