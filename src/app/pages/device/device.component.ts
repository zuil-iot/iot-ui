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
	private pinMap: any;
	private name: string;

	constructor(
		private	route: ActivatedRoute,
		private	devicesService:DevicesService
	) { }

	loadPinList(d) {
		console.log( "device: ",JSON.stringify(d));
		// Load Config
		console.log( "config: ",JSON.stringify(d.config.pins));
		var cnt=0;
		for (var id in d.config.pins) {
			var pin = d.config.pins[id];
			pin.id = id;
			pin.req_val = "-";
			pin.cur_val = "-";
			this.pinList.push(pin);
			this.pinMap[id]=cnt++;
		}
		// Load Requested  Val
		if (d.req_state.pins) {
			console.log( "req_state: ",JSON.stringify(d.req_state.pins));
			for (var id in d.req_state.pins) {
				var v = d.req_state.pins[id].val;
				var i = this.pinMap[id];
				this.pinList[i].req_val = v;
			}
		}
		// Load Current Val
		if (d.cur_state.pins) {
			console.log("cur_state: ", JSON.stringify(d.cur_state.pins));
			for (var id in d.cur_state.pins) {
				var v = d.cur_state.pins[id].val;
				var i = this.pinMap[id];
				this.pinList[i].cur_val = v;
			}
		}
	}

	ngOnInit() {
		this.device = new Device();;
		this.pinList = [];
		this.pinMap = {};
		this.name = this.id;
		//when calling routes change
		this.sub = this.route.params.subscribe(params=>{
			this.id = params['id'];
			this.devicesService.getOne(this.id)
				.subscribe(d => {
					if (d.alias) {
						this.name = d.alias;
					} else {
						this.name = d.deviceID;
					}
					this.device = d;
					this.loadPinList(d);
				});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
