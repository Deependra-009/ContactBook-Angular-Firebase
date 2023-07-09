import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Student } from '../Modal/Student';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  UID:string="";

  setUID(uid:String){
    this.UID="/"+uid;
  }

  constructor(
    private afs:AngularFirestore
  ) { }

  addStudent(student:Student){
    student.id=this.afs.createId();
    return this.afs.collection(this.UID).add(student);
  }

  getAllStudent(){
    return this.afs.collection(this.UID).snapshotChanges();
  }

  deleteStudent(student:Student){
    return this.afs.doc(this.UID+'/'+student.id).delete();
  }

  updateStudent(student:Student){
    this.deleteStudent(student);
    this.addStudent(student);
  }


}
