import { Injectable } from '@angular/core';
import {IotApiService } from './iot-api.service';


@Injectable()
export class StreamService {

	path_base = 'stream';

	constructor(private api:IotApiService) {
	}

	getAll(deviceID,pin,start_h,start_m,end_h,end_m) {
		var path = this.path_base;
		path+="?deviceID="+deviceID;
		path+="&pin="+pin;
		path+="&start_h="+start_h;
		path+="&start_m="+start_m;
		path+="&end_h="+end_h;
		path+="&end_m="+end_m;
		return this.api.get(path);
	}
}
