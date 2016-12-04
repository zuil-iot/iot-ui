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
	setType(id,type) {
		var path = this.path_base+'/'+id+'/type';
		var payload = { typeID: type};
		return this.api.put(path,payload);
	}
	setAlias(id,alias) {
		var path = this.path_base+'/'+id+'/alias';
		var payload = { alias: alias};
		return this.api.put(path,payload);
	}
	setIO(id,io_name,slot_name,val) {
		var path = this.path_base+'/'+id+'/set';
		var payload = { io_name: io_name, slot_name: slot_name, val: val};
		return this.api.put(path,payload);
	}

}
