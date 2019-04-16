import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../shared/api.service';
import {Article} from '../shared/article.model';
import {User} from '../shared/user.model';
import {Comments} from '../shared/comments.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article = null;
  comments: Comments[] = [];
  commentForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private userData: User,
              private router: Router) { }

  getData() {
    // Get the article
    const articleSlug = this.route.snapshot.paramMap.get('articleSlug');
    this.apiService.getSingleArticleBySlug(articleSlug).subscribe(
      (response: any) => {
        this.article = new Article(response.article);
        // Get comments
        this.apiService.getAllCommentsForArticle(this.article.slug).subscribe(
          (response1: any) => {
            for ( const comment of response1.comments ) {
              this.comments.push(new Comments(comment));
            }
          },
          (error1 => {
            console.log(error1);
          })
        );
      },
      (error1 => {
        console.log(error1);
      })
    );
  }

  ngOnInit() {
    this.commentForm = new FormGroup({
      body: new FormControl(null, [])
    });
    this.getData();
  }

  deleteArticleClicked() {
    this.apiService.delArticle(this.article).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      (error1 => {
        console.log(error1);
      })
    );
  }

  followUser(type: string) {
    if (type === 'follow') {
      console.log(this.article.bio);
      this.apiService.postFollowProfile(this.article.username, this.userData.email).subscribe(
        (response: any) => {
          this.article.bio = response.profile.bio;
          this.article.following = response.profile.following;
          this.article.image = response.profile.image;
          this.article.username = response.profile.username;
        },
        (error1) => {
          console.log(error1);
        }
      );
    } else {
      this.apiService.delUnfollowProfile(this.article.username).subscribe(
        (response: any) => {
          this.article.bio = response.profile.bio;
          this.article.following = response.profile.following;
          this.article.image = response.profile.image;
          this.article.username = response.profile.username;
        },
        (error1) => {
          console.log(error1);
        }
      );
    }
  }

  likeOrDislikePost() {
    if (this.article.favorited) {
      this.apiService.delUnfavoriteArticle(this.article.slug).subscribe(
        (response: any) => {
          this.article.favorited = response.article.favorited;
          this.article.favoritesCount = response.article.favoritesCount;
        },
        (error1 => {
          console.log(error1);
        })
      );
    } else {
      this.apiService.postFavoriteArticle(this.article.slug).subscribe(
        (response: any) => {
          this.article.favorited = response.article.favorited;
          this.article.favoritesCount = response.article.favoritesCount;
        },
        (error1 => {
          console.log(error1);
        })
      );
    }
  }

  onSubmitComment() {
    this.apiService.postCreateCommentForArticle(this.article.slug, this.commentForm.value.body).subscribe(
      (response: any) => {
        this.comments.unshift(new Comments(response.comment));
        this.commentForm.reset();
      },
      (error1) => {
        console.log(error1);
      }
    );
  }

  deleteCommentClicked(comment: Comments) {
    this.apiService.deleteCommentForArticle(this.article.slug, comment.id).subscribe(
      (response: any) => {
        this.comments = this.comments.filter((elem) => {
          return elem.id !== comment.id;
        });
      },
      (error1) => {
        console.log(error1);
      }
    );
  }
}
