import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import * as _ from 'underscore';
import { HttpClientCustomService } from '../http-client-custom/http-client-custom.service';
@Injectable({
    providedIn: 'root'
})
export class CommonService {
    private baseUrl = environment.apiBase;
    itemPerPage: number = 10;
    constructor(private http:HttpClientCustomService) {}

    get(url) {
        return this.http.get(url);
    }

    post(formData, url) {
        return this.http.post(url, formData);
    }

    put(formData, url) {
        return this.http.put(url, formData);
    }

    getById(url) {
        return this.http.get(url);
    }
    checkError(error){
        return this.http.checkError(error);
    }
    delete(url){
        return this.http.delete(url);
    }

    pageService(totalPages: number, currentPage: number = 1, perPage:number= this.itemPerPage) {
      // calculate total pages
      //let totalPages = Math.ceil(totalItems / perPage);
  
      let startPage: number, endPage: number;
  
      if (totalPages <= 5) {
          startPage = 1;
          endPage = totalPages;
      } else {
          if (currentPage <= 3) {
              startPage = 1;
              endPage = 5;
          } else if (currentPage + 1 >= totalPages) {
              startPage = totalPages - 4;
              endPage = totalPages;
          } else {
              startPage = currentPage - 2;
              endPage = currentPage+2;
          }
      }
  
      // create an array of pages to ng-repeat in the pager control
      let pages = _.range(startPage, endPage + 1);
  
      return {
          currentPage: currentPage,
          pageSize: perPage,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          pages: pages
      };
    }
}