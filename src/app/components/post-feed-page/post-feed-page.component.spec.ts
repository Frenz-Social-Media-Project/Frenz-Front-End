import { ComponentFixture, TestBed } from '@angular/core/testing';
import { modules, services } from "src/app/import";
import { PostFeedPageComponent } from './post-feed-page.component';

describe('PostFeedPageComponent', () => {
  let component: PostFeedPageComponent;
  let fixture: ComponentFixture<PostFeedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostFeedPageComponent],
      imports: [...modules, ...services],
    }).compileComponents();

    fixture = TestBed.createComponent(PostFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
