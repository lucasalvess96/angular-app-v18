import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { parseBrDate } from '../../../../shared/constants/formatar-datas';
import { Restaurante } from '../../models/restaurante';
import { RestauranteService } from '../../services/restaurante.service';

@Component({
  selector: 'app-restaurante-detail',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, ReactiveFormsModule],
  templateUrl: './restaurante-detail.component.html',
  styleUrl: './restaurante-detail.component.scss',
})
export class RestauranteDetailComponent implements OnInit {
  restaurante$!: Observable<Restaurante>;

  formatDate = parseBrDate;

  private readonly route = inject(ActivatedRoute);

  private readonly detailService = inject(RestauranteService);

  ngOnInit(): void {
    this.restaurante$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      filter((id: string | null): id is string => id !== null),
      switchMap((id: string) => this.detailService.detail(+id)),
    );
  }
}
