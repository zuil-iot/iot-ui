import {DeviceConfig } from './device_config';
import {DeviceState } from './device_state';

export class Device {
	public _id:		string;
	public deviceID:	string;
	public alias:		string;
	public config:		DeviceConfig;
	public req_state:	DeviceState;
	public cur_state:	DeviceState;

	public constructor() {
		this.deviceID = "";
		this.config = new DeviceConfig();
		this.req_state = new DeviceState();
		this.cur_state = new DeviceState();
	}
}
