import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';


@Injectable()
export class IotApiService {

	api_base = '/api';
	headers: Headers;

	constructor(private http:Http) {
		console.log("Devices Service Started");
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
		this.headers.append('Authorization', 'Bearer '+localStorage.getItem('id_token'));
	}

	get(path) {
		return this.http.get(this.api_base+'/'+path, {headers: this.headers})
			.map(res => res.json());
	}

	post(path,payload) {
		return this.http.post(this.api_base+'/'+path,payload, {headers: this.headers})
			.map(res => res.json());
	}

	put(path,payload) {
		return this.http.put(this.api_base+'/'+path,payload, {headers: this.headers})
			.map(res => res.json());
	}

	delete(path,id) {
		return this.http.delete(this.api_base+'/'+path+'/'+id, {headers: this.headers})
			.map(res => res.json());
	}

}
