import { Injectable, EventEmitter, Output, Inject } from '@angular/core';
import { SignalRMessageModel } from "../model/signalr.chatmessage.model";

@Injectable()
export class SignalRService {
    public connection:any;
    public proxy: any;

    @Output() onChatMessage: EventEmitter<SignalRMessageModel> = new EventEmitter();

    constructor(
        @Inject('config') private config:any
    ) {
        
    }

    joinToGroup(){
        
    }

    connect(hostname, hubName): Promise<any>{
        return new Promise<any>((resolve, reject) =>{
            let connection = (window as any).$.hubConnection(hostname);
            this.proxy = connection.createHubProxy(hubName);
            
            let self = this;
            // receives broadcast messages from a hub function, called "broadcastMessage"
            this.proxy.on('broadcastMessage', function(name, message) {
                var chatMessage = new SignalRMessageModel();
                chatMessage.name = name;
                chatMessage.message = message;
                
                self.onChatMessage.emit(chatMessage);
            });
            
            // atempt connection, and handle errors
            connection.start({ jsonp: true }).done(function(){ 
                console.log('Now connected, connection ID=' + connection.id);
                resolve(connection);
            }).fail(function(){ 
                console.log('Could not connect'); 
                reject(false);
            });
        });
    }

    //method for sending message
    broadcastMessage(msg: string) {
        //invoke method by its name using proxy 
        this.proxy.invoke('sendMessage', msg);
    }

    

}