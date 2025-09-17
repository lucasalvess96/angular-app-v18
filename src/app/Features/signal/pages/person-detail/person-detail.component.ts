import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { finalize } from 'rxjs';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { CpfMaskPipe } from '../../../../shared/pipes/cpf/cpf-mask.pipe';
import { Person } from '../../../person/models/person';
import { PersonService } from '../../../person/services/person.service';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, ReactiveFormsModule, CpfMaskPipe],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss',
})
export class PersonDetailComponent {
  person = signal<Person | null>(null);

  loading = signal(false);

  private readonly route = inject(ActivatedRoute);
  private readonly personService = inject(PersonService);

  constructor() {
    const idSignal = toSignal(this.route.paramMap, {
      initialValue: this.route.snapshot.paramMap,
    });

    effect(
      () => {
        const id = idSignal().get('id');
        if (id) {
          this.loading.set(true);
          this.personService
            .detail(+id)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe((data: Person) => this.person.set(data));
        } else {
          this.person.set(null);
        }
      },
      { allowSignalWrites: true },
    );
  }
}
