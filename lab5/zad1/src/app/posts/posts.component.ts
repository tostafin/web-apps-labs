import { Component, OnInit } from '@angular/core';
import { PostService } from "../post.service";

import { Post } from "../post";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  add(userIdStr: string, title: string, body: string): void {
    const userId: number = parseInt(userIdStr);
    if (!userId || !title || !body) return;
    this.postService.addPost({ userId, title, body } as Post)
      .subscribe(post => {
        this.posts.push(post);
      });
  }

}
