import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bool-icon',
  templateUrl: './bool-icon.component.html',
  styleUrls: ['./bool-icon.component.css'],
  inputs: [
	'state: state',
	'on_icon: on_icon',
	'off_icon: off_icon'
  ]
})
export class BoolIconComponent implements OnInit {
	on_icon:string;
	off_icon:string;
	state:boolean;

	@Output() toggle = new EventEmitter();

	constructor() {
       	}

	ngOnInit() {
	}
}
