import { Component, OnInit } from '@angular/core';
import { Device } from '../../../models/device';
import { DevicesService } from '../../../services/devices.service';
import { DeviceTypesService } from '../../../services/device-types.service';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-device-reg',
  templateUrl: './device-reg.component.html',
  styleUrls: ['./device-reg.component.css'],
})
export class DeviceRegComponent implements OnInit {
	private submitted:boolean = false;
	private devices: Device[];
	private deviceTypes: any[];
	private dataSubscription: any;
	private timerSubscription: any;

	constructor(
		private devicesService:DevicesService,
		private deviceTypesService:DeviceTypesService
	) { }

	ngOnInit() {
		this.loadDeviceTypes();
	}
	ngOnDestroy() {
		this.timerSubscription.unsubscribe();
		this.dataSubscription.unsubscribe();
	}

	private loadDeviceTypes () {
		console.log("Loading device types");
		this.deviceTypesService.getAll()
			.subscribe(deviceTypes => {
				this.deviceTypes=deviceTypes;
				console.log(JSON.stringify(this.deviceTypes));
			});
		this.refreshData();
	}

	private doTimer():void {
		this.timerSubscription = Observable.timer(5000).first()
			.subscribe(() => this.refreshData());
	}

	private refreshData():void {
		console.log("Refresh");
		this.dataSubscription = this.devicesService.getAll()
			.subscribe(devices => {
				console.log(JSON.stringify(devices));
				this.devices = devices;
				this.doTimer();
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


	private setDeviceType (id,type) {
		var i=this.findItem(id);
		this.devicesService.setType(id,type).subscribe(data => {
			if (i != null ) { this.devices[i].typeID = type; }
		});
	}
	toggleRegistered (d) {
		var id = d._id;
		var newReg = ! d.registered;
		var i=this.findItem(id);
		console.log("Trying to Toggle [",i,"] to ",newReg);
		this.devicesService.register(id,newReg).subscribe(data => {
			if (i != null ) { this.devices[i].registered = newReg; }
			console.log("Toggle Registered for: ",d.deviceID, " to ",this.devices[i].registered);
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
