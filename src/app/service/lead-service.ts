import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Leads } from "../interface/Leads";

@Injectable()
export class LeadService {

    private url : string = "https://secure-scrubland-24784.herokuapp.com/list/leads";
    constructor(private http: HttpClient) {

    }

    getLeads(): Observable<Leads[]> {
        return this.http.get<Leads[]>(this.url);
    }
}