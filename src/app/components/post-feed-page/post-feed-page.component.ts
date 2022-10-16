import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { SearchService } from 'src/app/services/search.service';
import { CookieService } from 'ngx-cookie-service';
// import { ProfileComponent } from '../profile/profile.component';



@Component({
  selector: 'app-post-feed-page',
  templateUrl: './post-feed-page.component.html',
  styleUrls: ['./post-feed-page.component.css']
})

export class PostFeedPageComponent implements OnInit {


  users = [] as User[];

  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl(''),
    youtubeUrl: new FormControl('')
  })

  posts: Post[] = [];
  createPost:boolean = false;
  currentUser = JSON.parse(localStorage.getItem('current') || "");

  constructor(private postService: PostService,
    private authService: AuthService, 
    private searchService:SearchService, 
    private cookieService:CookieService,

    ) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (response) => {
        this.posts = response
      }
    )

    console.log(this.posts);
  }

  toggleCreatePost = () => {
    this.createPost = !this.createPost
  }

  submitPost = (e: any) => {
    e.preventDefault();
    this.postService.upsertPost(new Post(0, this.postForm.value.text || "", this.postForm.value.imageUrl || "", this.postForm.value.youtubeUrl || "", this.authService.currentUser, []))
      .subscribe(
        (response) => {
          this.posts = [response, ...this.posts]
          this.toggleCreatePost()
        }
      )
  }

  getUsersByName(keyword:string) {
    this.searchService.getUsers(keyword).subscribe(
      (returnedUsers:User[])=> {
        this.users = returnedUsers;
        console.log(this.authService.currentUser);
      }
    )
  }

  clearSearch() {
      this.users = []
  }
}