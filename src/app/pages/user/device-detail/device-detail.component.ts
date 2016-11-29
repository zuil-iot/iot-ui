import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute}  from '@angular/router';
import { Device } from '../../../models/device';
import { DevicesService } from '../../../services/devices.service';
import { StreamService } from '../../../services/stream.service';
import {Observable} from 'rxjs/Observable';

const dataRefreshMs = 5000;
const chartRefreshMs = 60000;


@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {
	private id: string;
	private device: Device;
	private pinList: any[];
	private pinMap: any;
	private name: string;
	private routeSubscription: any;
	private dataSubscription: any;
	private chartSubscription: any;
	private dataTimerSubscription: any;
	private chartTimerSubscription: any;

	private chartOptions = {
		high:		1024,
		low:		0,
		showArea:	false,
		showLine:	true,
		showPoint:	false,
		lineSmooth:	true,
		height:		'300px',
		chartPadding: {
			right: 40
		}
	}
	private chartData = { series: []};
	private chartDataStr = JSON.stringify(this.chartData);

	constructor(
		private	route: ActivatedRoute,
		private	devicesService:DevicesService,
		private	streamService:StreamService
	) { }

	ngOnInit() {
		this.device = new Device();
		this.pinList = [];
		this.pinMap = {};
		this.refreshRoute();
	}

	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
		this.stopRefresh();
	}
	private refreshAll():void {
		this.stopRefresh();
		this.doDataTimer(1000);
		this.doChartTimer(1000);
	}
	private doDataTimer(time):void {
		this.dataTimerSubscription = Observable.timer(time).first()
			.subscribe(() => this.refreshData());
	}
	private refreshData():void {
		//console.log("Refresh Device Data");
		this.dataSubscription = this.devicesService.getOne(this.id)
			.subscribe(d => {
				this.device = d;
				this.loadPinList(d);
				this.setName(d);
				this.doDataTimer(dataRefreshMs);
			});
	}
	private chartReady(event) {
		console.log("Chart Ready");
		this.doChartTimer(2000);
	}
	private doChartTimer(time):void {
		this.chartTimerSubscription = Observable.timer(time).first()
			.subscribe(() => this.refreshChart());
	}
	private refreshChart():void {
		//console.log("Refresh Device Data");
		var deviceID = this.device.deviceID;
		var pin = "A0";
		var start_h = -4;
		var start_m = 0;
		var end_h = 0;
		var end_m = 0;
		this.chartSubscription = this.streamService.getAll(deviceID,pin,start_h,start_m,end_h,end_m)
			.subscribe(items => {
				var points = [];
				for (var i in items) {
					var point = {
						x: items[i].timestamp,
						y: items[i].val
					}
					points.push(point);
				}
				this.chartData = {
					series:	[points]
				}
				this.chartDataStr = JSON.stringify(this.chartData);
				console.log(this.chartDataStr);
				this.doChartTimer(chartRefreshMs);
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

	private loadPinList(d):void {
		this.pinList = [];
		this.pinMap = {};
		//console.log( "device: ",JSON.stringify(d));
		// Load Config
		//console.log( "config: ",JSON.stringify(d.config.pins));
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
			//console.log( "req_state: ",JSON.stringify(d.req_state.pins));
			for (var id in d.req_state.pins) {
				var v = d.req_state.pins[id].val;
				var i = this.pinMap[id];
				this.pinList[i].req_val = v;
			}
		}
		// Load Current Val
		if (d.cur_state.pins) {
			//console.log("cur_state: ", JSON.stringify(d.cur_state.pins));
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
		this.dataTimerSubscription.unsubscribe();
		var newVal = !p.req_val;
		//console.log("Toggle pin: ",p.id);
		var i=this.findPin(p.id);
		this.devicesService.setPin(this.id,p.id,newVal).subscribe(data => {
			if (i != null) { this.pinList[i].req_val = newVal; }
			this.refreshData();
		});
	}
	private stopRefresh():void {
		if (this.dataSubscription)		{ this.dataSubscription.unsubscribe(); }
		if (this.chartSubscription)		{ this.chartSubscription.unsubscribe(); }
		if (this.dataTimerSubscription)		{ this.dataTimerSubscription.unsubscribe(); }
		if (this.chartTimerSubscription)	{ this.chartTimerSubscription.unsubscribe(); }
	}

}
