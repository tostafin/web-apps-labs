import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PhotoService } from "../photo.service";
import {Photo} from "../photo";

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  photo!: Photo;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPhoto();
  }

  getPhoto(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.photoService.getPhoto(id)
      .subscribe(photo => this.photo = photo);
  }

  goBack(): void {
    this.location.back();
  }

}
