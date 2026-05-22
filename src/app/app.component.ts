import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  AvailableLangs,
  LangDefinition,
  TranslocoPipe,
  TranslocoService,
} from '@jsverse/transloco';
import { CORE_TRANSLATION_KEYS } from './core/translations';

const LOCAL_STORAGE_LANGUAGE_KEY = 'lang';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [TranslocoPipe, MatIconModule],
  providers: [TranslocoService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly navEl =
    viewChild.required<ElementRef<HTMLElement>>('nav_el');
  private readonly track =
    viewChild.required<ElementRef<HTMLElement>>('carousel_track');
  private readonly registrationFormRef =
    viewChild<ElementRef<HTMLElement>>('registration_form');
  private readonly hotelVideo =
    viewChild<ElementRef<HTMLVideoElement>>('hotel_video');

  readonly currentLanguage = signal<string>('');
  readonly languages: AvailableLangs;

  public readonly translationKeys = CORE_TRANSLATION_KEYS;
  readonly slides = signal<HTMLElement[]>([]);
  readonly currentIndex = signal(0);
  readonly navToggle = signal(false);
  readonly windowWidth = signal(window.innerWidth);
  readonly showCarouselButtons = computed(() => this.windowWidth() < 1024);
  readonly videoPlaying = signal(false);

  private readonly translocoService = inject(TranslocoService);

  constructor() {
    const savedLang =
      localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) ??
      this.translocoService.getDefaultLang();
    this.languages = this.translocoService.getAvailableLangs();
    this.changeLanguage(savedLang);

    afterNextRender(() => {
      this.slides.set(
        Array.from(this.track().nativeElement.children) as HTMLElement[],
      );
      this.updateSlidePosition();

      const video = this.hotelVideo()?.nativeElement;
      if (video) {
        const startLoop = () => video.play().catch(() => {});

        video.addEventListener('playing', () => this.videoPlaying.set(true));
        video.addEventListener('pause', () => this.videoPlaying.set(false));
        video.addEventListener('ended', () => {
          video.currentTime = 0;
          startLoop();
        });

        // Unlock on first real user gesture — mousedown/keydown qualify, wheel/scroll do not
        const unlockOnGesture = () => {
          document.removeEventListener('mousedown', unlockOnGesture);
          document.removeEventListener('keydown', unlockOnGesture);
          startLoop();
        };
        document.addEventListener('mousedown', unlockOnGesture);
        document.addEventListener('keydown', unlockOnGesture);

        // Try immediately — works when browser already allows muted autoplay
        startLoop();

        document.addEventListener('visibilitychange', () => {
          if (!document.hidden) startLoop();
        });
      }
    });
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null): void {
    if (this.navToggle() && !this.navEl().nativeElement.contains(target as Node)) {
      this.navToggle.set(false);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.navToggle()) this.navToggle.set(false);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.currentIndex.set(0);
    this.windowWidth.set(window.innerWidth);
    this.updateSlidePosition();
  }

  playVideo(): void {
    this.hotelVideo()
      ?.nativeElement.play()
      .catch(() => {});
  }

  changeLanguage(lang: string | LangDefinition): void {
    const langStr = lang as string;
    this.currentLanguage.set(langStr);
    this.translocoService.setActiveLang(langStr);
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, langStr);
  }

  moveToNextSlide(): void {
    if (this.currentIndex() < this.slides().length - 1) {
      this.currentIndex.update((i) => i + 1);
      this.updateSlidePosition();
    }
  }

  moveToPrevSlide(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
      this.updateSlidePosition();
    }
  }

  openRegistration(): void {
    // this.isRegistrationFormInitialized.set(true);
    // this.toggleRegistrationForm.update((v) => !v);
    // if (this.toggleRegistrationForm()) {
    //   setTimeout(() => {
    //     this.registrationFormRef()?.nativeElement?.scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'center',
    //     });
    //   }, 100);
    // }
    let url = '';
    switch (this.currentLanguage()) {
      case 'en':
        url = 'https://amis-ajatananda.org/romania-retreat-june-2026/';
        break;
      case 'ro':
        url = 'https://amis-ajatananda.org/romania-retreat-june-2026-ro/';
        break;
    }
    window.open(url, '_blank');
  }

  private updateSlidePosition(): void {
    const slides = this.slides();
    if (!slides.length) return;
    const slideWidth = slides[0].getBoundingClientRect().width;
    this.track().nativeElement.style.transform = `translateX(-${this.currentIndex() * slideWidth}px)`;
  }
}
