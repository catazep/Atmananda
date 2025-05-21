import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  AvailableLangs,
  LangDefinition,
  TranslocoPipe,
  TranslocoService,
} from '@jsverse/transloco';

const LOCAL_STORAGE_LANGUAGE_KEY = 'lang';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgIf, TranslocoPipe, MatIconModule],
  providers: [TranslocoService],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('carousel_track') track!: ElementRef<HTMLElement>;
  @ViewChild('registration_form') registrationForm!: ElementRef<HTMLElement>;
  public slides?: HTMLElement[];
  public currentLanguage: string;
  public languages: AvailableLangs;

  public currentIndex = 0;
  public navToggle = false;
  public showCarouselButtons = true;
  public toggleRegistrationForm = false;
  public isInitializeRegistartionForm = false;
  public registrationFormSrc: string | undefined;

  public windowWidth: number = 0;

  private translocoService = inject(TranslocoService);

  constructor() {
    this.currentLanguage =
      localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) ??
      this.translocoService.getDefaultLang();
    this.languages = this.translocoService.getAvailableLangs();
    this.changeLanguage(this.currentLanguage);
  }

  @HostListener('window:resize')
  onResize() {
    this.currentIndex = 0;
    this.updateSlidePosition();
    this.setCarouselButtonsState();
    this.windowWidth = window.innerWidth;
  }

  public ngAfterViewInit() {
    this.slides = Array.from(
      this.track.nativeElement.children
    ) as HTMLElement[];
    this.updateSlidePosition();
  }

  public changeLanguage(lang: string | LangDefinition) {
    this.currentLanguage = lang as string;
    this.translocoService.setActiveLang(this.currentLanguage);
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, this.currentLanguage);
  }

  public updateSlidePosition() {
    if (this.slides) {
      const slideWidth = this.slides[0].getBoundingClientRect().width;
      this.track.nativeElement.style.transform = `translateX(-${
        this.currentIndex * slideWidth
      }px)`;
    }
  }

  public moveToNextSlide() {
    if (this.slides && this.currentIndex < this.slides?.length - 1) {
      this.currentIndex++;
      this.updateSlidePosition();
    }
  }

  public moveToPrevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlidePosition();
    }
  }

  public setCarouselButtonsState(): void {
    this.showCarouselButtons = window.innerWidth < 1024;
  }

  public toggleRegistartion(): void {
    this.isInitializeRegistartionForm = true;
    this.toggleRegistrationForm = !this.toggleRegistrationForm;
    if (this.toggleRegistrationForm) {
      setTimeout(() => {
        this.registrationForm.nativeElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
  }
}
