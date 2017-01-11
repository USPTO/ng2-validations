import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
export declare class HttpService {
    private http;
    constructor(http: Http);
    getData(url: string): any;
    extractData(res: Response): {};
}
