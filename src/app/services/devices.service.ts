import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';


@Injectable()
export class DevicesService {

	api_base = '/api/devices';
	headers: Headers;

	constructor(private http:Http) {
		console.log("Devices Service Started");
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
		this.headers.append('Authorization', 'Bearer '+localStorage.getItem('id_token'));
	}

	getAll() {
		return this.http.get(this.api_base, {headers: this.headers})
			.map(res => res.json());
	}
	getOne(id) {
		var api = this.api_base+'/'+id;
		return this.http.get(api, {headers: this.headers})
			.map(res => res.json());
	}

	register(id,newReg) {
		var api = this.api_base+'/'+id+'/';
		if (newReg) {
			api += 'register';
		} else {
			api += 'unregister';
		}
		return this.http.put(api,{}, {headers: this.headers})
			.map(res => res.json());
	}
	setAlias(id,alias) {
		var api = this.api_base+'/'+id+'/alias';
		var payload = { alias: alias};
		return this.http.put(api,payload,{headers: this.headers})
			.map(res => res.json());
	}
	delete(id) {
		return this.http.delete('/api/devices/'+id, {headers: this.headers})
			.map(res => res.json());
	}
	setPin(id,pin,val) {
		console.log("Set pin [",pin,"] = ",val);
		var api = this.api_base+'/'+id+'/pin';
		var payload = { pin: pin, val: val};
		return this.http.put(api,payload,{headers: this.headers})
			.map(res => res.json());
	}

}
