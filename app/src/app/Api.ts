import { HttpHeaders } from '@angular/common/http'
import { AuthenticatedService } from './authenticated.service';

export class Api {


    static get entryPoint(){
        return "http://127.0.0.1:3000/";
    }

    static get httpOptions(){
        if(!localStorage.getItem('token')){
            return {
                headers: new HttpHeaders({
                'Content-Type':  'application/json',
                })
            };
        }
        

        return {
            headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': localStorage.getItem('token')
            })
        };
        
    }

    
}
