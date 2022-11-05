import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageOptionComponent } from './components/manage-option/manage-option.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'manage', component: ManageOptionComponent },
  { path: '',   redirectTo: '/first-component', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
