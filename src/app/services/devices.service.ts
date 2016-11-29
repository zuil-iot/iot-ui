import { Injectable } from '@angular/core';
import {IotApiService } from './iot-api.service';


@Injectable()
export class DevicesService {

	path_base = 'devices';

	constructor(private api:IotApiService) {
	}

	// Standard functions
	create(newItem) {
		var path = this.path_base;
		return this.api.post(path,newItem);
	}
	getAll() {
		var path = this.path_base;
		return this.api.get(path);
	}
	getOne(id) {
		var path = this.path_base+'/'+id;
		return this.api.get(path);
	}
	delete(id) {
		var path = this.path_base;
		return this.api.delete(path,id);
	}

	// Module specific functions
	register(id,newReg) {
		var path = this.path_base+'/'+id+'/';
		if (newReg) {
			path += 'register';
		} else {
			path += 'unregister';
		}
		return this.api.put(path,{});
	}
	setAlias(id,alias) {
		var path = this.path_base+'/'+id+'/alias';
		var payload = { alias: alias};
		return this.api.put(path,payload);
	}
	setPin(id,pin,val) {
		var path = this.path_base+'/'+id+'/pin';
		var payload = { pin: pin, val: val};
		return this.api.put(path,payload);
	}

}
