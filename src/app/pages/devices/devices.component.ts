import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device';
import { DevicesService } from '../../services/devices.service';
//import { Router } from 'angular/router'


@Component({
  selector: 'app-device-reg',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
	private submitted:boolean = false;
	private devices: Device[];

	constructor(private devicesService:DevicesService) { 
	}

	ngOnInit() {
		this.devicesService.getAll()
			.subscribe(devices => {
				this.devices = devices;
			});

	}

	findItem(id) {
		var items = this.devices;
		for (var i=0;i<items.length;i++) {
			if (items[i]._id == id) {
				return i;	
			}
		}
		return null;
	}

	toggleRegistered (d) {
		var id = d._id;
		var newReg = ! d.config.registered;
		var i=this.findItem(id);
		console.log("Trying to Toggle [",i,"] to ",newReg);
		this.devicesService.register(id,newReg).subscribe(data => {
			if (i != null ) { this.devices[i].config.registered = newReg; }
			console.log("Toggle Registered: ",d.deviceID, " to ",this.devices[i].config.registered);
		});
	}
	updateAlias(d) {
		this.devicesService.setAlias(d._id,d.alias).subscribe(data => {
			console.log("Update Alias for: ",d.deviceID, " to ",d.alias);
		});
	}
	delete(id) {
		console.log("Delete: ",id);
		this.devicesService.delete(id).subscribe( data => {
			var i=this.findItem(id);
			if (i != null ) { this.devices.splice(i,1); }
		});
	}
	viewDevice(deviceID) {
//		this.router.navigate(['pages/device/'..deviceID]);
	}

}
