import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../_services/comment.service';
import { IComment } from '../_interfaces/comment';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.page.html',
  styleUrls: ['./edit-comment.page.scss'],
})
export class EditCommentPage implements OnInit {
  idComment!: string;
  comments: IComment = {
    comment: ''
  }
  modificationValide: boolean = false;
  constructor(
    private activatedroute: ActivatedRoute,
    private commentservvice: CommentService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.idComment = this.activatedroute.snapshot.params['id'];
    this.commentservvice.getCommentById(parseInt(this.idComment)).subscribe(
      data => {
        this.comments = data;
        console.log(this.comments)
      },
      err => console.log(err)
    )
  }

  editComment() {
    this.commentservvice.editComment(this.comments).subscribe(
      data => {
        console.log(data);
        this.modificationValide = true
      },
      err => console.log(err)
    )


  }

  onReturnComment() {
    this.router.navigate(['/comment'], { queryParams: { idPost: this.comments.idPost } })
  }

}
