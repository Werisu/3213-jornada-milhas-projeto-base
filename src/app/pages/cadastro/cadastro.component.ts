import { Component } from '@angular/core';
import { FormularioService } from '../../core/services/formulario.service';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  perfilComponent = false;

  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService
  ) { }

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro();

    if(formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as PessoaUsuaria;
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          //"Pa$$w0rd!"
          console.log('Cadastrado com sucesso!', value);
        },
        error: (error) => {
          console.log('Erro ao cadastrar!', error);
        }
      })
    }
    console.log('Cadastrado com sucesso!', formCadastro?.value);
  }
}
