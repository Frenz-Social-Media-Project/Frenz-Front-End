import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import Post from 'src/app/models/Post';
import { ProfileService} from 'src/app/services/profile.service';
import { PostService } from 'src/app/services/post.service';
import { SearchService } from 'src/app/services/search.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  users: User [];
  userPosts: Post [];


  showTab: number = 0;

  constructor(
    private profileService: ProfileService,
    private authService:    AuthService,
    private cookieService:  CookieService,
    private searchService:  SearchService
    ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('current') || "");
    this.getAllUserPosts(this.user.id);
  }

  getUsersByName(keyword:string) {
    this.searchService.getUsers(keyword).subscribe(
      (returnedUsers:User[])=> {
        this.users = returnedUsers;
        console.log(this.authService.currentUser);
      }
    )
  }

  getUserById(id: number){
    this.searchService.getUserById(id).subscribe(
      (returnedUser) => {
        return returnedUser;
      }
    )
  }

  getAllUserPosts(id: number){
    this.profileService.getUserPosts(id).subscribe(
      (returnedPosts) => {
        this.userPosts = returnedPosts;
      }
    )
  }

  clearSearch() {
    this.users = []
  }

  show(index: number) {
    this.showTab = index;
  }

}
