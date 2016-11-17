import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device';


@Component({
  selector: 'app-device-reg',
  templateUrl: './device-reg.component.html',
  styleUrls: ['./device-reg.component.css'],
})
export class DeviceRegComponent implements OnInit {
	private submitted:boolean = false;
	private devices: Device[];

	constructor() { 
	}

	ngOnInit() {
		this.devices=[ 
			{ _id: "abc123", deviceID: "123", alias: "abc", registered: true },
			{ _id: "xyz456", deviceID: "456", alias: "xyz" , registered: false}
		];
	}
	toggleRegistered (d) {
		var tmpItem = d;
		tmpItem.registered = !d.registered;
//		this.service.update(tmpItem).subscribe(data => {
			d.registered = tmpItem.registered;
			console.log("Toggle Registered: ",d.deviceID, " to ",d.registered);
//		}
	}
	updateAlias(d,newAlias) {
		var tmpItem = d;
		tmpItem.alias = newAlias;
//		this.service.update(tmpItem).subscribe(data => {
			d.alias = tmpItem.alias;
			console.log("Update Alias for: ",d.deviceID, " to ",d.alias);
//		}
	}
	delete(id) {
		console.log("Delete: ",id);
		var items = this.devices;
//		this.service.delete(id).subscribe( data => {
			for (var i=0;i<items.length;i++) {
				if (items[i]._id == id) {
					items.splice(i,1);
				}
			}
//		});
	}

}
