import { Routes } from '@angular/router';
import {DummyList} from '../components/dummy-list/dummy-list';
import {DummyForm} from '../components/dummy-form/dummy-form';

export const routes: Routes = [
  {path: "", redirectTo: "dummies", pathMatch: "full" },
  {path: "dummies", component: DummyList},
  {path: "dummies/create", component: DummyForm},
  {path: "dummies/edit/:id", component: DummyForm}
];
