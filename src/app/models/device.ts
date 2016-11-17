export class Device {
	public _id:		string;
	public deviceID:	string;
	public alias:		string;
	public registered:	boolean;

	public constructor(data:any = {}) {
		this._id	= data._id || null;
		this.deviceID	= data.deviceID || "";
		this.alias	= data.dalias || "";
		this.registered	= data.registered || false;
	}
}
