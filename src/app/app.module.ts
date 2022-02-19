import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import { AppRoutingModule, routingComponents} from './app-routing.module';
import {MatButtonModule} from '@angular/material/button'
import { AppComponent } from './app.component';
import {
    MatInputModule,
} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card'; 
import {MatTableModule} from '@angular/material/table'; 
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { AddLeadComponent } from './adddialog.component';
import { RouterModule } from '@angular/router';
import { PostLeadComponent } from './post-lead.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PostLeadComponent,
  ],
  entryComponents: [AddLeadComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    MatInputModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent, PostLeadComponent]
})
export class AppModule { }
