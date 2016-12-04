import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bool-circle',
  templateUrl: './bool-circle.component.html',
  styleUrls: ['./bool-circle.component.css'],
  inputs: [
	'state: state',
	'size: size',
	'color: color'
  ]
})
export class BoolCircleComponent implements OnInit {
	state:boolean;
	color:string;
	size:string;

	@Output() toggle = new EventEmitter();

	constructor() {
       	}

	ngOnInit() {
	}
}
