import { Component,OnInit } from '@angular/core';
import {ApiServiceService} from 'src/app/services/api-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-content',
  templateUrl: './task-content.component.html',
  styleUrls: ['./task-content.component.css']
})

export class TaskContentComponent implements OnInit{
  constructor(private service:ApiServiceService) {}
  readData:any;
  getId:any;

  ngOnInit(): void {
    this.getAllData();
  }
  taskform = new FormGroup({
    'title': new FormControl('',Validators.required),
    'task': new FormControl('',Validators.required),
  });
  InsertData(){
    this.getId=null;
    if(this.taskform.valid){
        this.service.InsertData(this.taskform.value).subscribe((res)=>{
        console.log(res, 'res==>');
        this.taskform.reset();
        this.ngOnInit();
      });
    }
  }

  getAllData(){
    this.getId=null;
    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res==>");
      this.readData = res.data;
    });
  }

  deleteData(id:any){
    this.getId=null;
    let ids =id;
    this.service.deleteData(ids).subscribe((res)=>{
      console.log(res,"res==>");
      this.getAllData();
    });
  }
  getTask(id:any){
    this.getId = id;
    if(this.getId){
      this.service.getSingleData(this.getId).subscribe((res)=>{
        console.log(res,"res==>");
        this.taskform.patchValue({
          'title': res.data[0].title,
          'task':res.data[0].task
        });
      });
    }
  }
  updateTask(){
    console.log(this.taskform.value,'udpatedform');
    if(this.taskform.valid){
      this.service.updateTask(this.taskform.value,this.getId).subscribe((res)=>{
        console.log(res,'All Data Updated');
      });
      this.getId = null;
      this.taskform.reset();
    }
  }
}


