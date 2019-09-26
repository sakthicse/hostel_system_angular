import { Injectable } from '@angular/core';
import { forkJoin, BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataTransService {
  private appConfigSubscriber = new BehaviorSubject<any>(null);
constructor() { }



  /**
   * @description - Method to listen recent app config list.
   */
  public getRecentAppConfigList(): Observable<any> {
    return this.appConfigSubscriber.asObservable();
  }

  /**
   * @description - Method to get recent app config list.
   * @param { appConfig } AppSettings.
   */
  public setRecentAppConfigList(appConfig: any): void {
    this.appConfigSubscriber.next(appConfig);
  }
}
