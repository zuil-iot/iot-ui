import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute}  from '@angular/router';
import { Device } from '../../models/device';
import { DevicesService } from '../../services/devices.service';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
	private id: string;
	private device: Device;
	private pinList: any[];
	private pinMap: any;
	private name: string;
	private routeSubscription: any;
	private dataSubscription: any;
	private timerSubscription: any;

	constructor(
		private	route: ActivatedRoute,
		private	devicesService:DevicesService
	) { }

	ngOnInit() {
		this.device = new Device();;
		this.pinList = [];
		this.pinMap = {};
		this.refreshRoute();
	}

	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
		this.dataSubscription.unsubscribe();
		this.timerSubscription.unsubscribe();
	}

	private doTimer():void {
		this.timerSubscription = Observable.timer(5000).first()
			.subscribe(() => this.refreshData());
	}
	private refreshData():void {
		console.log("Refresh Device Data");
		this.dataSubscription = this.devicesService.getOne(this.id)
			.subscribe(d => {
				this.device = d;
				this.loadPinList(d);
				this.setName(d);
				this.doTimer();
			});
	}
		

	private refreshRoute():void {
		//when calling routes change
		this.routeSubscription = this.route.params.subscribe(params=>{
			this.id = params['id'];
			this.refreshData();
		});
	}

	private setName(d):void {
		if (d.alias) {
			this.name = d.alias;
		} else {
			this.name = d.deviceID;
		}
	}

	private loadPinList(d):void {
		this.pinList = [];
		this.pinMap = {};
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
	private findPin(pin) {
		var items = this.pinList;
		for (var i=0;i<items.length;i++) {
			if (items[i].id = pin) {
				return i;
			}
		}
		return null;
	}
	private toggleRequested(p) {
		this.dataSubscription.unsubscribe();
		this.timerSubscription.unsubscribe();
		var newVal = !p.req_val;
		console.log("Toggle pin: ",p.id);
		var i=this.findPin(p.id);
		this.devicesService.setPin(this.id,p.id,newVal).subscribe(data => {
			if (i != null) { this.pinList[i].req_val = newVal; }
			this.refreshData();
		});
	}

}
