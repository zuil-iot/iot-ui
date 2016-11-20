import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';


@Injectable()
export class DevicesService {

	api_base = '/api/devices';

	constructor(private http:Http) {
		console.log("Devices Service Started");
	}

	getAll() {
		return this.http.get(this.api_base)
			.map(res => res.json());
	}
	getOne(id) {
		var api = this.api_base+'/'+id;
		return this.http.get(api)
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
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		var api = this.api_base+'/'+id+'/alias';
		var payload = { alias: alias};
		return this.http.put(api,payload,{headers: headers})
			.map(res => res.json());
	}
	delete(id) {
		return this.http.delete('/api/devices/'+id)
			.map(res => res.json());
	}
	setPin(id,pin,val) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		console.log("Set pin [",pin,"] = ",val);
		var api = this.api_base+'/'+id+'/pin';
		var payload = { pin: pin, val: val};
		return this.http.put(api,payload,{headers: headers})
			.map(res => res.json());
	}

}
