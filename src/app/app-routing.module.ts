import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PostLeadComponent } from './post-lead.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'postleads', component: PostLeadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent, PostLeadComponent]