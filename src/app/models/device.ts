import {DeviceConfig } from './device_config';
import {DeviceState } from './device_state';

export class Device {
	public _id:		string;
	public deviceID:	string;
	public typeID:		string;
	public registered:	boolean;
	public alias:		string;
	public req_state:	DeviceState;
	public cur_state:	DeviceState;

	public constructor() {
		this.deviceID = "";
		this.req_state = new DeviceState();
		this.cur_state = new DeviceState();
	}
}
