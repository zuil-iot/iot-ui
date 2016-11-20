import {DeviceConfig } from './device_config';

export class Device {
	public _id:		string;
	public deviceID:	string;
	public alias:		string;
	public config:		DeviceConfig;

	public constructor() {
		this.deviceID = "";
	}
}
