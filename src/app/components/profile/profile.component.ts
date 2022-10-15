import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import Post from 'src/app/models/Post';
import { ProfileService} from 'src/app/services/profile.service';
import { PostService } from 'src/app/services/post.service';
import { SearchService } from 'src/app/services/search.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
// import { PostFeedPageComponent } from '../post-feed-page/post-feed-page.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  users: User [];
  userId: number;

  userPosts: Post [];
  
  successAlert: Boolean = false;
  unSuccessAlert: Boolean = false;

  constructor(
    private profileService: ProfileService,
    private authService:    AuthService,
    private cookieService:  CookieService,
    private searchService:  SearchService,
    // private postFeedPageComponent: PostFeedPageComponent,
    ) { }
    

  ngOnInit(): void {
    this.userId = Number(this.cookieService.get('userId'));
    this.getUserById(this.userId);
    this.profileService.getUserPosts(this.userId).subscribe(
      returnedPosts => {
        this.userPosts = returnedPosts;
      }
    )
  }

  // viewOtherProfile(clickedId: Number) {
  //   this.userId = Number(this.postFeedPageComponent.goToProfile);
  //   this.profileService.getUserPosts(this.userId).subscribe(
  //     returnedPosts => {
  //       this.userPosts = returnedPosts;
  //     }
  //   )
  // }

  getUsersByName(keyword:string) {
    this.searchService.getUsers(keyword).subscribe(
      (returnedUsers:User[])=> {
        this.users = returnedUsers;
        console.log(this.authService.currentUser);
      }
    )
  }

  getUserById(userId: number){
    this.profileService.getUserByID(userId).subscribe(
      (returnedUser:User)=>{
        this.user = returnedUser;
      }
    )

  }

  clearSearch() {
    this.users = []
}

update():void{
  this.profileService.updateUser(this.userId, this.user).subscribe(
    (updatedUser) => {
      console.log(this.user)
      if(updatedUser == null){
        console.error("error");
        this.unSuccessAlert= true;
        console.log("email already exist")
        return;
      }
      this.successAlert = true;
      console.log("updated successfully");
    }
 )
}

closeSuccessAlert(){
  this.successAlert=false;
}

closeUnsuccessAlert(){
  this.unSuccessAlert= false;
}

}
