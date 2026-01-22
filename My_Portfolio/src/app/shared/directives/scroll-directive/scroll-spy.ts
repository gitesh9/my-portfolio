import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollSpy]'
})
export class ScrollSpy implements OnDestroy {
  @Input('appScrollSpy') targetId!: string;
  @Input() spyOffset = 120;

  @HostBinding('class.active') isActive = false;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private zone: NgZone, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      const waitForTarget = () => {
        const target = document.getElementById(this.targetId);
        if (!target) {
          requestAnimationFrame(waitForTarget);
          return;
        }

        this.observer = new IntersectionObserver(
          ([entry]) => {
            this.zone.run(() => {
              this.isActive = entry.isIntersecting;
              this.cdr.detectChanges();
            });
          },
          {
            threshold: 0.43
          }
        );

        this.observer.observe(target);
      };

      waitForTarget();
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
