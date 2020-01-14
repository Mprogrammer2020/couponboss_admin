import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XyzComponent } from './xyz/xyz.component';
 

const routes: Routes = [
  { 'path': 'xyz', component: XyzComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [XyzComponent]
