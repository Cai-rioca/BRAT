import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DecadeData {
  id: string;
  number: string;
  title: string;
  description: string;
  trends: string[];
  image: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  @ViewChild('timelineTrack', { static: true }) timelineTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('timelineDots', { static: true }) timelineDots!: ElementRef<HTMLDivElement>;

  currentIndex = 0;
  itemWidth = 0;
  trackGap = 0;
  autoPlayInterval: any;

  decadeData: DecadeData[] = [
    {
      id: '1920s',
      number: '1920s',
      title: 'Era do Jazz',
      description: 'A revolução feminina na moda com vestidos retos, cabelos à la garçonne e o estilo flapper que simbolizava liberdade e modernidade.',
      trends: ['Vestidos Retos', 'Cabelo Chanel', 'Pérolas Longas', 'Sapatos T-Bar'],
      image: 'img/jazz.jpg'
    },
    {
      id: '1950s',
      number: '1950s',
      title: 'New Look',
      description: 'Christian Dior revoluciona a moda com o New Look, trazendo de volta a feminilidade com cinturas marcadas e saias amplas.',
      trends: ['New Look', 'Cintura Marcada', 'Saias Godê', 'Pin-up Style'],
      image: 'img/newlook.jpg'
    },
    {
      id: '1980s',
      number: '1980s',
      title: 'Power Dressing',
      description: 'A década do excesso com ombros marcados, e o power dressing que representava a ascensão feminina no mundo corporativo.',
      trends: ['Power Suits', 'Cores Neon', 'Ombreiras', 'Leg Warmers'],
      image: 'img/powerdress.jpg'
    },
    {
      id: '2000s',
      number: '2000s',
      title: 'Y2K',
      description: 'O início do millennium trouxe experimentação extrema com baixa cintura, metalics, e a influência da cultura pop e da tecnologia.',
      trends: ['Low Rise', 'Metallic', 'Cargo Pants', 'Chunky Highlights'],
      image: 'img/y2k.jpg'
    },
    {
      id: '2020s',
      number: '2020s',
      title: 'Craftcore',
      description: 'A moda consciente ganha força com foco na sustentabilidade, upcycling e a democratização através das redes sociais.',
      trends: ['Sustainable', 'Cottagecore', 'Y2K Revival', 'Gender Neutral'],
      image: 'img/upcycling.jpg'
    }
  ];
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.initTimeline();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
    this.removeEventListeners();
  }

  private initTimeline(): void {
    this.calculateDimensions();
    this.createDots();
    this.bindEvents();
    this.updatePosition();
    this.handleResize();
    this.startAutoPlay();
    this.cdr.detectChanges();
  }
  
  private calculateDimensions(): void {
    const trackEl = this.timelineTrack.nativeElement;
    const firstItem = trackEl.querySelector<HTMLElement>('.timeline-item');
    if (firstItem) {
      this.itemWidth = firstItem.offsetWidth;
      const trackStyle = window.getComputedStyle(trackEl);
      this.trackGap = parseFloat(trackStyle.gap) || 0;
    }
  }

  private createDots(): void {
    const dotsContainer = this.timelineDots.nativeElement;
    dotsContainer.innerHTML = '';
    
    this.decadeData.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }


  private bindEvents(): void {

    let startX = 0;

    let isDragging = false;

    const track = this.timelineTrack.nativeElement;

    const touchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const touchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
    };

    const touchEnd = (e: TouchEvent) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) this.nextSlide();
        else this.prevSlide();
      }
      isDragging = false;
    };


    const keyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    };

    track.addEventListener('touchstart', touchStart, { passive: true });
    track.addEventListener('touchmove', touchMove);
    track.addEventListener('touchend', touchEnd);
    document.addEventListener('keydown', keyDown);

    (track as any).removeEventListeners = () => {
      track.removeEventListener('touchstart', touchStart);
      track.removeEventListener('touchmove', touchMove);
      track.removeEventListener('touchend', touchEnd);
      document.removeEventListener('keydown', keyDown);
    };
  }

  private removeEventListeners(): void {
    const track = this.timelineTrack.nativeElement as any;
    if (track.removeEventListeners) {
      track.removeEventListeners();
    }
  }

  goToSlide(index: number): void {
    this.currentIndex = Math.max(0, Math.min(index, this.decadeData.length - 1));
    this.updatePosition();
    this.stopAutoPlay(); 
    this.startAutoPlay();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.decadeData.length;
    this.updatePosition();
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.decadeData.length) % this.decadeData.length;
    this.updatePosition();
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  private updatePosition(): void {
    const totalItemWidth = this.itemWidth + this.trackGap;
    const offset = -this.currentIndex * totalItemWidth + (window.innerWidth / 2) - (this.itemWidth / 2);
    const track = this.timelineTrack.nativeElement;
    track.style.transform = `translateX(${offset}px)`;

    const items = track.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      item.classList.toggle('active', index === this.currentIndex);
    });


    const dots = this.timelineDots.nativeElement.querySelectorAll('.dot');
    dots.forEach((dot: Element, index: number) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  private handleResize(): void {
    window.addEventListener('resize', () => {
      this.calculateDimensions();
      this.updatePosition();
    });
  }

  private startAutoPlay(): void {
    if(this.autoPlayInterval) this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  onMouseEnter(): void { this.stopAutoPlay(); }
  onMouseLeave(): void { this.startAutoPlay(); }

  get isPrevDisabled(): boolean { return false; }
  get isNextDisabled(): boolean { return false; }
}