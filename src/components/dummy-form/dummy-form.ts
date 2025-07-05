import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DummyService} from '../../services/dummy-service';
import {Calidad} from '../../models/calidad';

@Component({
  selector: 'app-dummy-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './dummy-form.html',
  styleUrl: './dummy-form.css'
})
export class DummyForm implements OnInit {
  private route = inject(ActivatedRoute)
  private dummyService = inject(DummyService)
  private formBuilder = inject(FormBuilder)
  private router = inject(Router)
  editMode = false;
  formGroup!: FormGroup;
  calidadOptions = Object.values(Calidad)

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true
      this.loadDummy(+id) //pasar de string a number
    }
    this.formGroup = this.formBuilder.group({
      dummy_field: ['', Validators.required],
      calidad: ['', Validators.required],
    })
  }

  loadDummy(id: number) {
    this.dummyService.getById(id).subscribe(dummy => {
      this.formGroup.patchValue({
        dummy_field: dummy.dummy_field,
        calidad: dummy.calidad,
      });
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) return;

    const dummy: DummyCreateDto = this.formGroup.value;
    const id = this.route.snapshot.params['id'];

    const action$ = this.editMode
      ? this.dummyService.update(dummy, id)
      : this.dummyService.create(dummy);

    action$.subscribe(() => {
      this.router.navigate(['/dummies']);
    });

  }
}
