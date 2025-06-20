export namespace main {
	
	export class LocationResult {
	    IP: string;
	    City: string;
	    Region: string;
	    Country: string;
	    Lat: number;
	    Lon: number;
	    Timezone: string;
	    ISP: string;
	    Message: string;
	
	    static createFrom(source: any = {}) {
	        return new LocationResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.IP = source["IP"];
	        this.City = source["City"];
	        this.Region = source["Region"];
	        this.Country = source["Country"];
	        this.Lat = source["Lat"];
	        this.Lon = source["Lon"];
	        this.Timezone = source["Timezone"];
	        this.ISP = source["ISP"];
	        this.Message = source["Message"];
	    }
	}

}

