import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';


@Injectable()
export class DevicesService {

	api_base = '/api/devices';

	constructor(private http:Http) {
		console.log("Devices Service Started");
	}

	get() {
		return this.http.get(this.api_base)
			.map(res => res.json());
	}

	register(id,newReg) {
		var api = this.api_base+'/'+id+'/';
		if (newReg) {
			api += 'register';
		} else {
			api += 'unregister';
		}
		return this.http.put(api,{})
			.map(res => res.json());
	}
	setAlias(id,alias) {
		var api = this.api_base+'/'+id+'/set-alias';
		return this.http.put(api,alias)
			.map(res => res.json());
	}

}
