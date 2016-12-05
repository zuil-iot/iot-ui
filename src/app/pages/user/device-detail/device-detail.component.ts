import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute}  from '@angular/router';
import { Device } from '../../../models/device';
import { DevicesService } from '../../../services/devices.service';
import { StreamService } from '../../../services/stream.service';
import {Observable} from 'rxjs/Observable';

const dataRefreshMs = 5000;


@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {
	private id: string;
	private device: Device;
	private ioList: any[];
	private name: string;
	private chartSlots: any;
	private selectedChartSlots: any;
	private routeSubscription: any;
	private dataSubscription: any;
	private dataTimerSubscription: any;

	constructor(
		private	route: ActivatedRoute,
		private	devicesService:DevicesService,
		private	streamService:StreamService
	) { }

	ngOnInit() {
		this.device = new Device();
		this.ioList = [];
		this.refreshRoute();
		this.selectedChartSlots = {};
		this.chartSlots = [];
	}


	private toggleGraphSlot(io_name,slot) {
		var id = io_name+'_'+slot.slot_name;
		if (this.selectedChartSlots[id]) {	// Exists, so remove
			delete this.selectedChartSlots[id];
		} else {			// Does not exist, so add
			this.selectedChartSlots[id] = {
				_id: this.device._id,
				deviceID: this.device.deviceID,
				io_name: io_name,
				slot_name: slot.slot_name,
			};
		}
		var cs = [];
		for (var s in this.selectedChartSlots) {
			cs.push(this.selectedChartSlots[s]);
		}
		this.chartSlots = cs;
	}
	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
		this.stopRefresh();
	}
	private refreshAll():void {
		this.stopRefresh();
		this.doDataTimer(1000);
	}
	private doDataTimer(time):void {
		if (this.dataTimerSubscription) {this.dataTimerSubscription.unsubscribe(); }
		this.dataTimerSubscription = Observable.timer(time).first()
			.subscribe(() => this.refreshData());
	}
	private refreshData():void {
		this.dataSubscription = this.devicesService.getOne(this.id)
			.subscribe(d => {
				this.device = d;
				this.loadIOList(d);
				this.setName(d);
				this.doDataTimer(dataRefreshMs);
			});
	}



	private refreshRoute():void {
		//when calling routes change
		this.routeSubscription = this.route.params.subscribe(params=>{
			this.id = params['id'];
			this.refreshAll();
		});
	}

	private setName(d):void {
		if (d.alias) {
			this.name = d.alias;
		} else {
			this.name = d.deviceID;
		}
	}

	private loadIOList(d):void {
		this.ioList = [];
		// Load Config
		for (var io_name in d.device_config.io) {
			var item = {
				io_name:	io_name,
				slots:		[],
				pin_type:	d.device_config.io[io_name].type,
				mode:		d.device_config.io[io_name].mode
			}

			for (var slot_name in d.display_config.io[io_name].slots) {
				var slot = d.display_config.io[io_name].slots[slot_name];
				slot.slot_name = slot_name;
				slot.id = io_name+'_'+slot_name;
				// Set defaults if needed
				if (slot.min == null ) {slot.min = 0}	
				if (slot.max == null ) {slot.max = 1024}	
				if (slot.color == null ) {slot.color = "#fff"}	
				if (slot.hue == null ) {slot.hue = "60"}	
				if (slot.type == null ) {slot.type = "na"}	
				// Requested state
				if (d.req_state.io[io_name]) {
					slot.req_val = d.req_state.io[io_name].slots[slot_name].val;
				}
				// Current state
				if (d.cur_state.io[io_name]) {
					slot.cur_val = d.cur_state.io[io_name].slots[slot_name].val;
				}
				// Streamable?
				if (d.device_config.io[io_name].slots[slot_name].stream) {
					slot.streamable = true;
				}
				item.slots.push(slot);
			}

			this.ioList.push(item);
		}
	}

	private	update_req_val(io_name,slot_name,newVal) {
		for (var i in this.ioList) {
			if (this.ioList[i].io_name == io_name) {
				for (var s in this.ioList[i].slots) {
					if (this.ioList[i].slots[s].slot_name == slot_name) {
						this.ioList[i].slots[s].req_val = newVal;
						return;
					}
				}
			}
		}
	}

	private toggleRequested(io_name,slot_name,old_req_val) {
		this.dataSubscription.unsubscribe();
		this.dataTimerSubscription.unsubscribe();
		var newVal = !old_req_val;
		this.devicesService.setIO(this.id,io_name,slot_name,newVal).subscribe(data => {
			this.update_req_val(io_name,slot_name,newVal);
			this.refreshData();
		});
	}
	private stopRefresh():void {
		if (this.dataSubscription)		{ this.dataSubscription.unsubscribe(); }
		if (this.dataTimerSubscription)		{ this.dataTimerSubscription.unsubscribe(); }
	}

}
