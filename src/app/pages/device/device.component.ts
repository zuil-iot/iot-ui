import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute}  from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  private id: number = 0;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    //when calling routes change
    this._route.params.subscribe((data) =>{
      this.id = data['id'];
    })
  }

}
