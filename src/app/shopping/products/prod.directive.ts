import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appProd]'
})

export class ProdDirective {

  @HostBinding('style.transform') isOpend = '';
  @HostListener('mouseeover') toggleOpens() {
    this.isOpend = 'translateY(-64,5px)';
  }
  @HostListener('mouseout') toggleClosed() {
    this.isOpend = '';
  }
}
