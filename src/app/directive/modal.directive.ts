import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {

  @HostBinding('class.show') isOpen = false;
  @HostListener('click') modalOpen(eventData: Event) {
    this.isOpen = !this.isOpen;
  }


}
