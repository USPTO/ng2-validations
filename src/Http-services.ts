import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// Simple Http method to retrieve validator configuration and definitions
@Injectable()
export class HttpService {
    constructor (private http: Http) {}

    getData(url: string) {
        return this.http.get(url).map(this.extractData)
        .toPromise();
    }

    extractData(res: Response): {} {
        let body = res.json();
        return body || {};
    }
}
