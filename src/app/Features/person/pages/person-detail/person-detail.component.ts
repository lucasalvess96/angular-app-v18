import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { CpfMaskPipe } from '../../../../shared/pipes/cpf/cpf-mask.pipe';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, ReactiveFormsModule, CpfMaskPipe],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss',
})
export class PersonDetailComponent implements OnInit {
  person$!: Observable<Person>;

  private readonly route = inject(ActivatedRoute);

  private readonly personService = inject(PersonService);

  ngOnInit(): void {
    this.person$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      filter((id: string | null): id is string => id !== null),
      switchMap((id: string) => this.personService.detail(+id)),
    );
  }
}
