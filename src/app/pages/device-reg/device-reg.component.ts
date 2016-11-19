import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device';
import { DevicesService } from '../../services/devices.service';


@Component({
  selector: 'app-device-reg',
  templateUrl: './device-reg.component.html',
  styleUrls: ['./device-reg.component.css'],
})
export class DeviceRegComponent implements OnInit {
	private submitted:boolean = false;
	private devices: Device[];

	constructor(private devicesService:DevicesService) { 
	}

	ngOnInit() {
		this.devicesService.get()
			.subscribe(devices => {
				this.devices = devices;
			});

	}
	toggleRegistered (d) {
		var id = d._id;
		var newReg = ! d.config.registered;
		this.devicesService.register(id,newReg).subscribe(data => {
			d.config.registered = newReg;
			console.log("Toggle Registered: ",d.deviceID, " to ",d.config.registered);
		});
	}
	updateAlias(d) {
		this.devicesService.setAlias(d._id,d.config.alias).subscribe(data => {
			console.log("Update Alias for: ",d.deviceID, " to ",d.config.alias);
		});
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
