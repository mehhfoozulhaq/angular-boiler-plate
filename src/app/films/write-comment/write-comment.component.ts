import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { FilmService } from '../../services/film.service';


@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.css']
})
export class WriteCommentComponent implements OnInit {

  @Input() slug;

  writeCommentForm: FormGroup;
  formIsSubmitted: boolean = false;
  apiError = null;

  constructor(private _fb: FormBuilder, private filmService: FilmService, private router: Router) { 
  }

  ngOnInit() {
  	this.writeCommentForm = this._fb.group({
      comment: [null, Validators.required]
    });
  }

  btnSubmitHandler() {
    this.formIsSubmitted = true;

    if (this.writeCommentForm.invalid) {
      return;
    }

    const data = {
    	filmSlug: this.slug,
      	comment: this.gfc.comment.value,
    };

    this.filmService.saveComment(data).subscribe(r => {
      if (r.status) {
        this.writeCommentForm.reset();
        this.formIsSubmitted = false;
      }
      else {
        
        this.apiError = r.msg;
      }
    }, (apiError: HttpErrorResponse) => {
      this.apiError = apiError.error.message;
    });

  }


  get gfc() { return this.writeCommentForm.controls };

}


