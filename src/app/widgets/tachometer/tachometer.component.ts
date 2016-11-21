import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tachometer',
  templateUrl: './tachometer.component.html',
  styleUrls: ['./tachometer.component.css'],
  inputs: [
	'min: min',
	'max: max',
	'val: val'
  ]
})
export class TachometerComponent implements OnInit {
	min:number;
	max:number;
	val:number;

	constructor() {
       	}

	ngOnInit() {
	}
}
