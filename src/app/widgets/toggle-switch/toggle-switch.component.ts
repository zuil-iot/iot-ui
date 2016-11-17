import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css'],
  inputs: [
	'div_id: div_id',
	'is_checked: is_checked'
  ]
})
export class ToggleSwitchComponent implements OnInit {
	div_id:string;
	is_checked:boolean;
	@Output() toggle = new EventEmitter();

	constructor() {
       	}

	ngOnInit() {
	}

	onClick() {
		console.log("Clicked");
		this.toggle.emit();
	}
}
