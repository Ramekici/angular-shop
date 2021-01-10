import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.show') isOpen = false;
  @HostListener('mouseenter') toggleOpen(eventData: Event) {
    this.isOpen = true;
  }
  @HostListener('mouseleave') toggleClose(eventData: Event) {
    this.isOpen = false;
  }
}
