import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetter]'
})
export class BetterDirective implements OnInit {
  @Input() defaultColor: string ;
  @Input() highlightColor: string ;

  @HostBinding ('style.backgroundColor') backgroundColor = this.defaultColor;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
   // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue', false, false);
  }
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }

  // kullanırken [defaultColor]="'yellow'"

}
