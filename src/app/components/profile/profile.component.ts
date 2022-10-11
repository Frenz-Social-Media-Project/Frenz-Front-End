import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import Post from 'src/app/models/Post';
import { ProfileService} from 'src/app/services/profile.service';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  userId: number = 1;

  userPosts: Post [];

  constructor(
    private profileService: ProfileService,
    private authService:    AuthService,
    ) { }

  ngOnInit(): void {
    this.profileService.getUserPosts(this.userId).subscribe(
      returnedPosts => {
        this.userPosts = returnedPosts;
      }
    )
  }

}
