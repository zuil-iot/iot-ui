import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-device-reg',
  templateUrl: './device-reg.component.html',
  styleUrls: ['./device-reg.component.css'],
})
export class DeviceRegComponent implements OnInit {
	private submitted:boolean = false;
	private devices;

	constructor() { 
	}

	ngOnInit() {
		this.devices=[ 
			{ _id: "abc123", deviceID: "123", name: "abc", registered: true },
			{ _id: "xyz456", deviceID: "456", name: "xyz" , registered: false}
		];
	}
	toggleRegistered (d) {
		console.log("Toggle Registered: ",d.deviceID);
	}
	delete(id) {
		console.log("Delete: ",id);
	}

}
