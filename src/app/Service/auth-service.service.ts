import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY } from './config';
import { AuthResponse } from '../Modal/ResponseDTO';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http:HttpClient,
    private fireauth:AngularFireAuth,
    private router:Router
  ) { }

  signUp(email:string,password:string){
    
    return this.fireauth.createUserWithEmailAndPassword(email,password);
   
    
    // return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,{
    //   email:email,
    //   password:password,
    //   returnSecureToken:true
    // });
  }

  signin(email:string,password:string){

    return this.fireauth.signInWithEmailAndPassword(email,password);

    // return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,{
    //   email:email,
    //   password:password,
    //   returnSecureToken:true
    // });
  }

  logout(){
    this.fireauth.signOut().then(
      ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        this.router.navigate(['']);
      }
    ).catch(
      (error)=>console.log(error)
      
    )
  }
}
