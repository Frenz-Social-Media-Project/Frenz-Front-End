import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import Post from 'src/app/models/Post';
import { ProfileService} from 'src/app/services/profile.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  userId: number;
  user: User = {} as User;
  users: User [];
  userPosts: Post [];
  
  successAlert: Boolean = false;
  unSuccessAlert: Boolean = false;
  successImgAlert: Boolean = false;
  imgFile: string;
  url = './assets/images/user1.png';


  showTab: number = 0;

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private profileService: ProfileService,
    private authService:    AuthService,
    private cookieService:  CookieService,
    private searchService:  SearchService,

    ) { }
    

  ngOnInit(): void {
    this.userId = Number(this.cookieService.get('userId'));
    this.getCurrentUser(this.userId);
    console.log(this.user);
    this.profileService.getUserPosts(this.userId).subscribe(
      returnedPosts => {
        this.userPosts = returnedPosts;
      }
    )
  }

  getUsersByName(keyword:string) {
    this.searchService.getUsers(keyword).subscribe(
      (returnedUsers:User[])=> {
        this.users = returnedUsers;
      }
    )
  }

  getCurrentUser(userId: number){
    this.profileService.getUserByID(userId).subscribe(
      (returnedUser:User)=>{
        this.user = returnedUser;
      }
    )
  }

  clearSearch() {
    this.users = []
  }

  show(index : number){
    this.showTab = index;
  }

  updateInfo(){
  }

closesuccessImgAlert(){
  this.successImgAlert = false;
}
  onSelectFile(event: any) {
    if (event.target.files ) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = String(event.target?.result);   
        this.successImgAlert = true;
      }
    }
  }
}
  
