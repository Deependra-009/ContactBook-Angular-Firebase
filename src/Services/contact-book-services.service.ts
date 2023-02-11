import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactBookServicesService {

  URL="https://fir-practise-6de48-default-rtdb.firebaseio.com/ContactList.json"

  constructor(
    private http:HttpClient
  ) { }

  saveContacts(ContactList:any[]){
    return this.http.put(this.URL,ContactList)
  }

  getContacts(){
    return this.http.get(this.URL);
  }

  
}
