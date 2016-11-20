export class DeviceConfig {
	public registered:	boolean;
	public pins;

	public constructor() {
		this.registered = false;
		this.pins = {};
	}
}
