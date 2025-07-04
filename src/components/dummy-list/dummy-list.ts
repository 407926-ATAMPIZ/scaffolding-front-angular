import {Component, inject, OnInit} from '@angular/core';
import {DummyService} from '../../services/dummy-service';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dummy-list',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './dummy-list.html',
  styleUrl: './dummy-list.css'
})
export class DummyList implements OnInit {
  private dummyService = inject(DummyService)
  private formBuilder = inject(FormBuilder)
  readonly filterForm = this.formBuilder.group({
    dummyField: [''],
    fromDate: ['']
  })
  private readonly filterTrigger$ = new BehaviorSubject<void>(undefined);

  dummies$?: Observable<Dummy[]> = this.filterTrigger$.pipe(
    switchMap(() => {
      const {dummyField, fromDate} = this.filterForm.getRawValue();
      const hasFilters = dummyField || fromDate;
      return hasFilters
        ? this.dummyService.searchDummies(dummyField ?? undefined, fromDate ?? undefined)
        : this.dummyService.getAll();
    })
  )


  ngOnInit() {
    this.filterTrigger$.next();
  }

  onFilter(): void {
    this.filterTrigger$.next();
  }

  deleteDummy(id: number) {
    this.dummyService.delete(id).subscribe({
      error: err => console.log('deleteDummy failed:', err.message),
    })
    this.onFilter()
  }

}
