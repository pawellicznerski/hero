import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError,map,tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })

export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_=>this.log(`heroes downloaded`)),
      catchError(this.handleErrors("getHeroes",[]))
    )
    // return of(HEROES);
  }

  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
    .pipe(
      tap(h=>this.log(`${h.name} downloaded`)),
      catchError(this.handleErrors<Hero>("getHero"))
    )
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl,hero,this.httpOptions)
    .pipe(
      tap(_=>this.log(`Hero updated`)),
      catchError(this.handleErrors<any>("updateHero"))
    )
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions)
    .pipe(
      tap(_=>this.log(`Hero addes`)),
      catchError(this.handleErrors<Hero>("addHero"))
    )
  }

  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url,this.httpOptions).pipe(
      tap(_=>this.log("i wpadł w piz..")),
      catchError(this.handleErrors<Hero>("delete Hero"))
    )
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if (!term.trim()) { return of([]); }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_=>this.log("jeeest mamy go")),
      catchError(this.handleErrors<Hero[]>("searchHero"))
    )
  }

  private heroesUrl = "api/heroes";
  private log(message: string){
    this.messageService.add(message)
  };
  private handleErrors <T>(operation='operation', result?:T){
    return (error: any): Observable<T> => {
      console.log(`${operation} failed`)
      this.log(`${operation} failed`)
      return of(result as T)
    }
  };
  httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  };
}
