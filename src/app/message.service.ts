import { Injectable } from '@angular/core';
// import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
// import { Observable, of } from 'rxjs';

// @Injectable({providedIn:"root"})
@Injectable({ providedIn: 'root' })
export class MessageService {

  constructor() { }

  messages: string[]=["siejojied",'kimkws'];

  add(message: string): void{
    this.messages.push(message);
  }

  clear(message): void{
    const i=this.messages.indexOf(message);
    this.messages.splice(i,1)
  }

}
