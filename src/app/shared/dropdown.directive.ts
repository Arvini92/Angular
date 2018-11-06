import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen(eventData: Event) {
    this.isOpen = !this.isOpen;
    this.elRef.nativeElement.lastChild.classList.toggle('show');
  }
}
