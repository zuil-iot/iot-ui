import { Injectable } from '@angular/core';
import {IotApiService } from './iot-api.service';


@Injectable()
export class DeviceTypesService {

	path_base = 'device-types';

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
}
