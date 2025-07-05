import {Component, inject} from '@angular/core'; //inject para inyeccion sin constructor
import {DummyService} from '../../services/dummy-service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'; //para usar formularios reactivos
import {Observable, startWith, Subject, switchMap} from 'rxjs'; //operadores rxjs para manejar flujos de datos reactivos.
import {AsyncPipe} from '@angular/common'; //para trabajar con observables en el HTML
import {Router} from '@angular/router';
import {Calidad} from '../../models/calidad'; //para redirecciones y navegaciòn

@Component({ //define un componente standalone, su selector, imports, template y estilos
  selector: 'app-dummy-list',
  imports: [ //mòdulos necesarios para que el HTML pueda usar directivas y pipes como formGroup, formControlName, | async y routerLink
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './dummy-list.html',
  styleUrl: './dummy-list.css'
})
export class DummyList {
  //inyeccion de dependencias alternativa al constructor
  private dummyService = inject(DummyService); // DummyService para interactuar con la API
  private formBuilder = inject(FormBuilder); // FormBuilder para crear el formulario
  private router = inject(Router); //Router para redireccionar
  calidadOptions = Object.values(Calidad)

  // Formulario reactivo, define el FormGroup con dos campos opcionales
  filterForm: FormGroup = this.formBuilder.group({
    dummyField: [''],
    fromDate: [''],
    calidad: [''],
  })
  // Subject para disparar la bùsqueda y carga de los dummies, un subject es un "disparador" manual. Emite valores con el Subject.next()
  // Subject es un observable y observer al mismo tiempo, es un disparador manual muy útil.
  private filterTrigger$ = new Subject<void>() // El tipo void indica que no se espera emitir datos, solo un "evento vacío"
  //Lista de dummies como observable
  dummies$: Observable<Dummy[]> = this.filterTrigger$.pipe( //cuando el subject hace .next() (emite un evento), se ejecuta el switchMap
    startWith(null), //Para cargar autimaticamente al iniciar el componente
    switchMap(() => { //elige si usar los filtros o traer todos los dummies, switchMap sirve para, en caso de que el observable emita una nueva señal, se cancela el accionar anterior y se sigue con el de la nueva señal.
      const {dummyField, fromDate, calidad} = this.filterForm.value; //setea a cada una de esas variables los valores que coinciden con sus nombres en el formGroup
      const hasFilters = dummyField || fromDate;
      return this.dummyService.searchDummies(dummyField || undefined, fromDate || undefined, calidad || undefined);
    })
  )

  //activa el trigger al que està suscripto el observable de dummies
  filter() {
    this.filterTrigger$.next();
  }

  //llama al service, elimina un dummy por id y emite un evento del trigger para actualizar la tabla
  deleteDummy(id: number) {
    this.dummyService.delete(id).subscribe(() =>
      this.filterTrigger$.next())
  }

  //redirige a la ruta /dummies/edit para actualizar un dummy (esa vista se encarga de buscar el dummy y cargar los campos del formulario)
  updateDummy(id: number) {
    this.router.navigate(['/dummies/edit', id]);
  }

}
