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
	private id: string;
	private device: Device;
	private pinList: any[];

	constructor(
		private	route: ActivatedRoute,
		private	devicesService:DevicesService
	) { }

	ngOnInit() {
		this.device = new Device();;
		this.pinList = [];
		//when calling routes change
		this.sub = this.route.params.subscribe(params=>{
			this.id = params['id'];
			this.devicesService.getOne(this.id)
				.subscribe(d => {
					this.device = d;
					console.log( JSON.stringify(d.config.pins));
					for (var id in d.config.pins) {
						var pin = d.config.pins[id];
						pin.id = id;
						pin.val = "n/a";
						this.pinList.push(pin);
					}
				});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
