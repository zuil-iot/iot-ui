import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-analog-bar',
  templateUrl: './analog-bar.component.html',
  styleUrls: ['./analog-bar.component.css'],
  inputs: [
	'min: min',
	'max: max',
	'val: val'
  ]
})
export class AnalogBarComponent implements OnInit {
	min:number;
	max:number;
	val:number;
	base_hue:number;

	constructor() {
		this.base_hue = this.base_hue || 60;
       	}

	ngOnInit() {
	}
}
