import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { materialModules } from '../../../../shared/angular-material/material-modules';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        const redirectUrl = localStorage.getItem('redirectAfterLogin') ?? '/welcome';
        this.router.navigate([redirectUrl]);
      }
    });
  }

  loginWithGoogle(): void {
    localStorage.setItem('redirectAfterLogin', this.router.url);
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}
