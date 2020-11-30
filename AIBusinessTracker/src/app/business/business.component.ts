import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../services/owner.service';
import * as mobileNet from '@tensorflow-models/mobilenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  title = 'object-detection';
  constraints = {
    video: {
      facingMode: 'user'
    },
    audio: false
  };
  vdo;
  detectedObjects: any = [];
  classifications: any = [];
  insidePeople: number = 0;
  foundPerson: boolean = false;
  enableWebIn: boolean = true;
  waitTime: number = 0;
  totalTime: number;
  webIn: number = 0;
  maxCapacity: number = 0;
  // peopleInside: number;

  constructor(private router: Router, private owner: OwnerService, private elem: ElementRef) {
    navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
      this.elem.nativeElement.querySelector('#myVideo').srcObject = stream;
      this.vdo = this.elem.nativeElement.querySelector('#myVideo');
      this.classifyImage();
    });
  }

  ngOnInit() {
    if (this.owner.user != undefined) {
      this.insidePeople = this.owner.user.insidePeople;
      this.waitTime = this.owner.user.waitTime;
      this.webIn = this.owner.user.webIn;
      this.maxCapacity = this.owner.user.maxCapacity;
      this.totalTime = this.owner.user.totalTime;
      // this.calculateTotalTime();
      if (this.insidePeople >= this.maxCapacity) {
        this.enableWebIn = false;
      }
    } else {
      this.router.navigate(['/**'])
    }

  }

  async classifyImage() {
    const modelPromise = await cocoSsd.load();
    if (this.elem.nativeElement.querySelector('#myVideo').play() !== undefined) {
      this.elem.nativeElement.querySelector('#myVideo').play().then(async _ => {
        const model = await mobileNet.load();
        this.classifications = await model.classify(this.vdo);
        // this.detectedObjects = await modelPromise.detect(this.vdo);
        modelPromise.detect(this.vdo).then(async (predict) => {
          await this.renderPredictions(predict);
          requestAnimationFrame(() => {
            this.classifyImage.apply(this);
          });
        });
      }).catch((err) => {
        console.warn(err);
      });
    }
  }

  calculateTotalTime() {
    if (this.webIn > 0) {
      this.totalTime = this.waitTime * (this.webIn + 1); //To show the next person's wait time
    } else if (this.insidePeople == this.maxCapacity) {
      this.totalTime = this.waitTime;
    } else if (this.insidePeople < this.maxCapacity) {
      this.totalTime = 0;
    } else {
      console.log("Edge case, try to repeat the testing after changing the code")
    }
  }

  updateDB() {
    this.owner.user.insidePeople = this.insidePeople;
    this.owner.user.waitTime = this.waitTime;
    this.owner.user.webIn = this.webIn;
    this.owner.user.maxCapacity = this.maxCapacity;
    if (this.insidePeople < this.maxCapacity) {
      this.enableWebIn = true;
    } else {
      this.enableWebIn = false;
    }
    this.calculateTotalTime();
    this.owner.user.totalTime = this.totalTime;

    this.owner.updateInsidePeople(this.owner.userId, this.owner.user);
  }

  exitUpdate() {
    if (this.insidePeople > 0 && this.insidePeople <= this.maxCapacity) {
      if (this.webIn > 0) {
        this.webIn -= 1;
      } else {
        this.insidePeople -= 1;
      }
    } else {
      this.insidePeople = 0;
    }
    this.updateDB();
  }

  renderPredictions = predictions => {
    if (predictions.length == 0 && this.foundPerson) {
      if (this.insidePeople == this.maxCapacity) {
        this.webIn += 1;
      } else {
        this.insidePeople += 1;
      }
      this.foundPerson = false;
      this.updateDB();
    } else {
      const ctx = this.elem.nativeElement.querySelector('#myCanvas').getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Font options.
      const font = '16px sans-serif';
      ctx.font = font;
      ctx.textBaseline = 'top';
      predictions.forEach(prediction => {
        if (prediction.class == 'person') {
          this.foundPerson = true;
        } else {
          console.log("Other object");
        }
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];
        // Draw the bounding box.
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);
        // Draw the label background.
        ctx.fillStyle = '#00FFFF';
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10); // base 10
        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      });

      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        // Draw the text last to ensure it's on top.
        ctx.fillStyle = '#000000';
        ctx.fillText(prediction.class, x, y);
      });
    }
  }
}
