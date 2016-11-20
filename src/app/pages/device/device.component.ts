import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute}  from '@angular/router';
import { Device } from '../../models/device';
import { DevicesService } from '../../services/devices.service';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
	private sub: any;
	id: string;
	private device: Device;

	constructor(
		private	route: ActivatedRoute,
		private	devicesService:DevicesService
	) { }

	ngOnInit() {
		this.device = new Device();;
		//when calling routes change
		this.sub = this.route.params.subscribe(params=>{
			this.id = params['id'];
			this.devicesService.getOne(this.id)
				.subscribe(d => {
					console.log( JSON.stringify(d));
					this.device = d;
				});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
