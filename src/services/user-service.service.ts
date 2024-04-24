import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Subject,BehaviorSubject , filter } from 'rxjs';


export interface user {
  name: { title: string, first: string, last: string},
  id: { value: number},
  gender: string
}
@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  
  private userList = new BehaviorSubject<user[]>([]); 
  public users = this.userList.asObservable();
  constructor(private http: HttpClient) { }
  
  getUserData(pageSize: number, page: number) {
      let queryParams = new HttpParams();
    queryParams = queryParams.append('results', pageSize);
    queryParams = queryParams.append('page', page);
    return this.http.get<any[]>("https://randomuser.me/api/", {params: queryParams});
  }

  setUserData(userData: any) 
  {
    this.userList.next(userData)
  }
  
  getAllUsers()
  {
    return this.userList;
  }
}
