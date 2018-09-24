import { Injectable } from "@angular/core";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class ServerService {

    constructor(private http: Http) { }

    saveServers(servers): Observable<any> {
        const headers = new Headers({ 'Content-type': 'application/json' });
        return this.http.put('https://ng-project-ae4c8.firebaseio.com/data.json', servers, { headers: headers });
    }

    getServers() {
        return this.http.get('https://ng-project-ae4c8.firebaseio.com/data.json').pipe(
            map((response: Response) => {
                return response.json()
            })
        );
    }

    getSuka() {
        return this.http.get('https://ng-project-ae4c8.firebaseio.com/SUKA.json').pipe(
            map((resp: Response) => resp.json())
        )
    }
}