import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {

  private permissions = [];
  // @ts-ignore
  private currentUser;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,

  ) {
  }

  // @ts-ignore
  @Input()
  set hasPermission(val: string[]) {
    // @ts-ignore
    this.permissions = val;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;

    // if (this.currentUser && this.currentUser.permissions) {
    //   for (const checkPermission of this.permissions) {
    //
    //
    //   }
    // }

    return false;
  }
}
