import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {SrvService} from '../service/srv-service.service';
import { Student } from '../service/studentmodel';

@Component({
  selector: 'app-showstudent',
  templateUrl: './showstudent.component.html',
  styleUrls: ['./showstudent.component.css']
})
export class ShowstudentComponent implements OnInit {

  id: number;

  showstudent: any;
  constructor(private srv: SrvService, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(param => {
      this.id = parseInt(param.id,10);
    })
   }

 async ngOnInit() {

    if (this.id){
      await this.srv.getStudents().then(()=>{
        (this.srv.students).forEach(student=>{
          if (student.id === this.id){

            this.showstudent = student;
           console.log(this.showstudent)
            
          }
          })
      })
    }

  }

}
