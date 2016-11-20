import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bool-icon',
  templateUrl: './bool-icon.component.html',
  styleUrls: ['./bool-icon.component.css'],
  inputs: [
	'on: on',
	'on_icon: on_icon',
	'off_icon: off_icon'
  ]
})
export class BoolIconComponent implements OnInit {
	on_icon:string;
	off_icon:string;
	on:boolean;

	@Output() toggle = new EventEmitter();

	constructor() {
       	}

	ngOnInit() {
	}
}
