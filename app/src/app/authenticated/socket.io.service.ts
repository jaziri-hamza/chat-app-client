import { Injectable } from "@angular/core";
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SocketIOService{
    
    observable: Observable<any>;

    constructor(
        private socket: Socket
    ) {
    }


    authentificated(tokenData){
        this.socket.emit('auth', tokenData);
    }

    unauthentificated(tokenData){
        this.socket.emit('unauth', tokenData);
    }


    pullMsg():Observable<any>{
        
        return new Observable( (observer)=>{
            this.socket.on('pull-msg', (data)=>{
                observer.next(data);
                // observer.complete();
            });
        });
    }

    // pullMsgData():Observable<any>{
    //     return new Observable( observer=>{
    //         this.socket.on('pull-msg-data', data=>{
    //             observer.next(data);
    //         });
    //     });
    // };

    pushMsg(data: any){
        this.socket.emit('push-msg', data);
    }


}