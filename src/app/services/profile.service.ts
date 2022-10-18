import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  user!: User;
  userUrl: String = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient) { }

  updateUser(id: number,user: User): Observable<User>{
    return this.http.put<User>(`${this.userUrl}/update/${id}`, user, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  getUserByID(id: number): Observable<User>{
    return this.http.get<User>(`${this.userUrl}/searchById/${id}`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }


  getUserPosts(userId: number): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.userUrl}/posts/${userId}`, {headers: environment.headers, withCredentials: environment.withCredentials} )
  }

  upsertPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.userUrl}/update`, post, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  // deletePostOrComment(userId: Number, post: Post): Observable<Post> {
  //   return this.http.delete<Post>(`${this.userUrl}/delete/${userId}`, post, {headers: environment.headers, withCredentials: environment.withCredentials})
  // }

}
