import { Component, Inject, NgModule, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddLeadComponent } from './adddialog.component';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Leads } from './interface/Leads';
import axios from 'axios';
import { LeadService } from './service/lead-service';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DecimalPipe]
})


export class AppComponent implements OnInit {

  message = '';
  filter = new FormControl('');
  Leads$!: Observable<Leads[]>;
  title = '';
  firstName = '';
  lastName = '';
  email = '';
  assignee = '';
  leadStatus = '';
  leadSource = '';
  leadRating: number = 0;
  phone = '';
  companyName = '';
  industry = '';
  addressLine1 = '';
  addressLine2 = '';
  city = '';
  state = '';
  id = '';
  country = '';
  zipcode = '';
  buttonDisabled: boolean = false;
  // search( text: string, pipe: PipeTransform) {
  //   return this.leads.filter(leads => {
  //     const term = text.toLowerCase();
  //     return leads.title.toLowerCase().includes(term) || pipe.transform(leads.firstName).includes(term);
  //   })
  // }
  closeResult: string = '';
  private url : string = "https://secure-scrubland-24784.herokuapp.com/list/leads";
  public leads:Leads[] = [];
  constructor(public dialog: MatDialog,private modalService: NgbModal, pipe: DecimalPipe, private router: Router, private http: HttpClient) {
    this.Leads$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => {
        return this.leads.filter(leads => {
          const term = text.toLowerCase();
           return leads.title.toLowerCase().includes(term) || leads.firstName.toLowerCase().includes(term) || leads.lastName.toLowerCase().includes(term) || pipe.transform(leads.firstName)?.includes(term) || pipe.transform(leads.lastName)?.includes(term) || pipe.transform(leads.email)?.includes(term);
        })
      })
    )
  }

  ngOnInit() {
    axios({
      method: "GET",
      url: "https://secure-scrubland-24784.herokuapp.com/list/leads",
    }).then((response) => {
      
     const leadArray:Leads[]= response.data;
     this.leads = response.data;
     console.log(leadArray);
    })
  }

  onDialog1(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  handleUpload(event: any) {
    console.log('value', event.target.value);
    
  }

  onDeleteLead() {
    this.buttonDisabled = true;
    axios({
      method: 'DELETE',
      url: `https://secure-scrubland-24784.herokuapp.com/delete/lead/${this.id}`
    }).then((response) => {
      const data = response.data;
      this.message = data;
      console.log(data);
      this.buttonDisabled = false;
      axios({
        method: "GET",
        url: "https://secure-scrubland-24784.herokuapp.com/list/leads",
      }).then((response) => {
        
       const leadArray:Leads[]= response.data;
       this.leads = response.data;
       console.log(leadArray);
       this.modalService.dismissAll();
      })
    }).catch((err) => {
      this.buttonDisabled = false;
      console.log('err', err);
    })
  }

  onEditLead() {
    this.buttonDisabled = true;
    axios({
      method: 'PUT',
      url: `https://secure-scrubland-24784.herokuapp.com/patch/lead/${this.id}`,
      data: {
        title: this.title,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        assignee: this.assignee, 
        leadStatus: this.leadStatus, 
        leadSource: this.leadSource, 
        leadRating: this.leadRating, 
        phone: this.phone, 
        companyName: this.companyName, 
        industry: this.industry, 
        addressLine2: this.addressLine2, 
        addressLine1: this.addressLine1,
        city: this.city, 
        state: this.state, 
        country: this.country, 
        zipcode: this.zipcode
      }
    }).then((response) => {
      console.log(response.data);
      axios({
        method: "GET",
        url: "https://secure-scrubland-24784.herokuapp.com/list/leads",
      }).then((response) => {
        
       const leadArray:Leads[]= response.data;
       this.leads = response.data;
       console.log(leadArray);
       this.modalService.dismissAll();
      this.buttonDisabled = false;
      })
    }).catch((err) => {
      console.log('err', err);
    })
  }

  onEdit(id: any, content: any, title: string, firstName: string, lastName: string, email: string, assignee: string, leadStatus: string, leadSource: string, leadRating: number, phone: string, companyName: string, industry: string, addressLine1: string, addressLine2: string, city: string, state: string, country: string, zipcode: string) {
    this.id = id;
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.assignee = assignee;
    this.leadSource = leadSource;
    this.leadStatus = leadStatus;
    this.leadRating = leadRating;
    this.phone = phone;
    this.companyName = companyName;
    this.industry = industry;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    console.log('addressLine1', this.addressLine1);
    console.log('addressLine2', this.addressLine2);
    this.city = city;
    this.state = state;
    this.country = country;
    this.zipcode = zipcode;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log('id', id);
  }

  onDelete(id: any, content: any) {
    this.id = id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log('id', id);
  }

  onTitle(event: any) {
    this.title = event.target.value;
    
    console.log('title', this.title);
  }

  onFirstName(event: any) {
    this.firstName = event.target.value;
    
    console.log('title', this.firstName);
  }

  onLastName(event: any) {
    this.lastName = event.target.value;
    
    console.log('title', this.lastName);
  }

  onEmail(event: any) {
    this.email = event.target.value;
    
    console.log('title', this.email);
  }

  onAssignee(event: any) {
    this.assignee = event.target.value;
    
    console.log('title', this.assignee);
  }

  onLeadStatus(event: any) {
    this.leadStatus = event.target.value;
    
    console.log('title', this.assignee);
  }

  onLeadSource(event: any) {
    this.leadSource = event.target.value;
    
    console.log('title', this.assignee);
  }

  onLeadRating(event: any) {
    this.leadRating = event.target.value;
    
    console.log('title', this.assignee);
  }

  onPhone(event: any) {
    this.phone = event.target.value;
    
    console.log('title', this.assignee);
  }

  onCompanyName(event: any) {
    this.companyName = event.target.value;
    
    console.log('title', this.assignee);
  }

  onIndustry(event: any) {
    this.industry = event.target.value;
    
    console.log('title', this.assignee);
  }

  onAddressLine1(event: any) {
    this.addressLine1 = event.target.value;
    
    console.log('title', this.assignee);
  }

  onAddressLine2(event: any) {
    this.addressLine2 = event.target.value;
    
    console.log('title', this.assignee);
  }

  onCity(event: any) {
    this.city = event.target.value;
    
    console.log('title', this.assignee);
  }

  onState(event: any) {
    this.state = event.target.value;
    
    console.log('title', this.assignee);
  }

  onCountry(event: any) {
    this.country = event.target.value;
    
    console.log('title', this.assignee);
  }

  onZipcode(event: any) {
    this.zipcode = event.target.value;
    
    console.log('title', this.assignee);
  }

  onPostLead() {
    this.buttonDisabled = true;
    axios({
      method: "POST",
      url: "https://secure-scrubland-24784.herokuapp.com/post/leads",
      data: {
        title: this.title,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        assignee: this.assignee,
        leadStatus: this.leadStatus,
        leadSource: this.leadSource,
        leadRating: this.leadRating,
        phone: this.phone,
        companyName: this.companyName,
        industry: this.industry,
        addressLine1: this.addressLine1,
        addressLine2: this.addressLine2,
        city: this.city,
        state: this.state,
        country: this.country,
        zipcode: this.zipcode
      }
    }).then((response) => {
      
     const leadArray:Leads[]= response.data;
     this.leads = response.data;
     
     console.log(leadArray);
     axios({
      method: "GET",
      url: "https://secure-scrubland-24784.herokuapp.com/list/leads",
    }).then((response) => {
      
     const leadArray:Leads[]= response.data;
     this.leads = response.data;
     console.log(leadArray);
    })
     this.modalService.dismissAll();
     this.show = true;
     this.buttonDisabled = false;
    }).catch((err) => {
      this.buttonDisabled = false;
      console.log('err', err);
      this.modalService.dismissAll();
      this.show1 = true;
    })
  }

  show = false;

  close() {
    this.show = false;
  }

  show1 = false;

  close1() {
    this.show1 = false;
  }

  openDialog(content:any)  {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  Title = 'lead-management-frontend';
}

export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
