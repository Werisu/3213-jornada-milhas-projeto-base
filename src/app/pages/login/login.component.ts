import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]],
    });
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const senha = this.loginForm.get('senha')?.value;

    this.authService.autenticar(email, senha).subscribe({
      next: (value) => {
        console.log('Login realizado com sucesso!', value);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('Erro ao realizar login!', error);
      },
    });
  }
}
