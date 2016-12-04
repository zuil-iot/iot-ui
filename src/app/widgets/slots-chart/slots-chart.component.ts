import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DevicesService } from '../../services/devices.service';
import { StreamService } from '../../services/stream.service';
import {Observable} from 'rxjs/Observable';

declare var Chart:any;

const chartRefreshMs = 60000;


@Component({
  selector: 'app-slots-chart',
  templateUrl: './slots-chart.component.html',
  styleUrls: ['./slots-chart.component.css'],
  inputs: [
	'chartSlots:chartSlots'
  ]
})
export class SlotsChartComponent implements OnInit {

	chartSlots:any[];

	public lineChartLegend:boolean = true;
	public lineChartType:string = 'line';

	private chartSubscriptions: any[];
	private deviceSubscriptions: any[];
	private chartTimerSubscription: any;
	public lineChartLabels:Array<any>;

	public lineChartOptions:any = {
		animation:		false,
		responsive:		true,
		maintainAspectRatio:	false,
		scales:	{
			xAxes: [{
				type:	'time',
				time:		{
					unit:	'hour'
				}
			}]
		}
	};
	private ctx;
	private widget;

	@ViewChild('slotChartCanvas') private _ctx:ElementRef;
	@ViewChild('slotChartWidget') private _widget:ElementRef;


	private chartData:any[];
        private chartSlotCount=0;
	private validChartSlots=0;


	constructor(
		private devicesService:DevicesService,
		private streamService:StreamService
	) { }

	ngOnInit() {
		this.ctx=this._ctx.nativeElement;
		this.widget=this._widget.nativeElement;
	}
	ngAfterViewInit() {
		this.chartSubscriptions = [];
		this.deviceSubscriptions = [];
		console.log("Me: ",this.widget.clientWidth,this.widget.clientHeight);
		this.refreshDisplayConfig();
		//this.chartSlots = [];
	}
	ngOnChanges() {
		console.log("Got change");
		this.refreshDisplayConfig();
		this.validChartSlots=this.chartSlots.length;
	}


	private displayConfig={};
	private deviceCount=0;
	private devicesGot=0;

	private getDisplayConfig (id) {
		this.deviceSubscriptions[id] = this.devicesService.getOne(id)
			.subscribe(d => {
				var dc = d.display_config;
				for (var i in dc.io) {
					var item = dc.io[i];
					for (var s in item.slots) {
						var slot = item.slots[s];
						var sid = d.deviceID+'_'+i+'_'+s;
						this.displayConfig[sid] = {
							label:	slot.label,
							color: slot.color
						};
					}
				}
				if ((this.devicesGot+=1) >= this.deviceCount) {
					this.refreshChart();
				}
			});
	}
	private refreshDisplayConfig () {
		var deviceList = [];
		this.deviceCount=0;
		for (var x in this.chartSlots) {
			var cs = this.chartSlots[x];
			deviceList[cs._id]=1;
		}
		this.devicesGot=deviceList.length;
		for (var id in deviceList) {
			this.getDisplayConfig(id);
		}
	}

	private drawChart() {
		this.ctx.width=this.widget.clientWidth;
		this.ctx.height=this.widget.clientHeight || 200;
		var _data = {
			datasets:	this.chartData
		}
		var myChart = new Chart (this.ctx, {
			type:		'line',
			data:		_data,	
			options:	this.lineChartOptions
		})
	}









        private doChartTimer(time):void {
                if (this.chartTimerSubscription) {this.chartTimerSubscription.unsubscribe(); }
                this.chartTimerSubscription = Observable.timer(time).first()
                        .subscribe(() => this.refreshChart());
        }

        private getChartData(cs,start_h,start_m,end_h,end_m) {
		var id=cs.deviceID+'_'+cs.io_name+'_'+cs.slot_name;
                this.chartSubscriptions[id] = this.streamService.getAll(
                        cs.deviceID,cs.io_name,cs.slot_name,start_h,start_m,end_h,end_m)
                        .subscribe(items => {
                                var points = [];
                                for (var i in items) {
                                        var point = {
                                                x: items[i].timestamp,
                                                y: items[i].val
                                        }
                                        points.push(point);
                                }
				var dc = this.displayConfig[id];
				var tmpLine;
				if (dc) {
					tmpLine = {
						fill:		false,
						borderColor:	dc.color,
						label:		dc.label,
						data:		points
					};
				} else {
				       tmpLine = {
						label: id,
						data: points
					};
				}
                                this.chartData.push(tmpLine);
                                if ((this.chartSlotCount+=1) >= this.validChartSlots) {
					console.log(JSON.stringify(this.chartData));
					this.drawChart();
                                        this.doChartTimer(chartRefreshMs);
                                }

                        })
        }
        private refreshChart():void {
                var deviceID = "nodemcu_9171585";
                var start_h = -4;
                var start_m = -0;
                var end_h = 0;
                var end_m = 0;
                this.chartData = [];
                this.chartSlotCount=0;
		for (var x in this.chartSlots) {
			var cs = this.chartSlots[x];
			if (cs) {
				this.getChartData(cs,start_h,start_m,end_h,end_m);
			}
		}
        }





}
