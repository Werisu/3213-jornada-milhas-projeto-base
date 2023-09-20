import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { TokenService } from 'src/app/core/services/token.service';
import { PessoaUsuaria } from 'src/app/core/types/type';
import { FormularioService } from '../../core/services/formulario.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  titulo: string = 'Olá ';
  textoBotao: string = 'ATUALIZAR';
  perfilComponent: boolean = true;

  token = '';
  nome = '';
  cadastro!: PessoaUsuaria;
  form: FormGroup | null = null;

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private formularioService: FormularioService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarCadastro().subscribe((cadastro) => {
      this.cadastro = cadastro;
      this.nome = cadastro.nome;
      this.carregarFormulario();
    })
  }

  carregarFormulario() {
    this.form = this.formularioService.getCadastro();
    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      cidade: this.cadastro.cidade,
      email: this.cadastro.email,
      genero: this.cadastro.genero,
      telefone: this.cadastro.telefone,
      estado: this.cadastro.estado,
      senha: this.cadastro.senha
    });
  }

  atualizar() {
    const dadosAtualizados: PessoaUsuaria = {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      cpf: this.form?.value.cpf,
      cidade: this.form?.value.cidade,
      email: this.form?.value.email,
      genero: this.form?.value.genero,
      telefone: this.form?.value.telefone,
      estado: this.form?.value.estado,
      senha: this.form?.value.senha
    }

    this.cadastroService.editarCadastro(dadosAtualizados).subscribe({
      next: () => {
        alert('Cadastro atualizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('Erro ao atualizar cadastro', error);
      }
    });
  }

  deslogar(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
