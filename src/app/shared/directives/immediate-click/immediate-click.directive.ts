import { Directive, ElementRef, OnInit } from '@angular/core';

import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

  constructor(
    private element: ElementRef<any>,
    private platformDetector: PlatformDetectorService
    ) {}

  ngOnInit() {
    return this.platformDetector.isPlatformBrowser &&
      this.element.nativeElement.click();
  }
}
