import { Component, OnInit } from '@angular/core';
import { Device } from '../../../models/device';
import { DevicesService } from '../../../services/devices.service';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
	private submitted:boolean = false;
	private devices: Device[];
	private dataSubscription: any;
	private timerSubscription: any;

	constructor(private devicesService:DevicesService) { 
	}

	ngOnInit() {
		this.refreshData();
	}
	ngOnDestroy() {
		this.timerSubscription.unsubscribe();
		this.dataSubscription.unsubscribe();
	}

	private doTimer():void {
		this.timerSubscription = Observable.timer(5000).first()
			.subscribe(() => this.refreshData());
	}

	private refreshData():void {
		console.log("Refresh");
		this.dataSubscription = this.devicesService.getAll()
			.subscribe(devices => {
				this.devices = devices;
				this.doTimer();
			});
	}


}
