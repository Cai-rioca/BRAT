import { Component, ElementRef, AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {
  prefersReducedMotion = false;
  private scrollingText?: HTMLElement;
  footerText: string = 'TEXTO PADRÃO';

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    // Detecta preferência de animação reduzida
    try {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      this.prefersReducedMotion = false;
    }

    // Atualiza o texto do footer quando a rota muda
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        switch (event.urlAfterRedirects) {
          case '/timeline':
            this.footerText = 'SINTA O PODER DO TEMPO';
            break;
          case '/':
            this.footerText = 'GRAVE, COURO & TAMBORZÃO';
            break;
          case '/letstalk':
            this.footerText = 'FALA COM A GENTE, SÓ NÃO LIGA A COBRAR';
            break;
          case '/about':
            this.footerText = 'NÃO É SOBRE VOCÊ, MAS SOBRE NÓS';
            break;
          case '/post':
            this.footerText = 'PAPO QUENTE E CERVEJA GELADA';
            break;
          case '/priv':
            this.footerText = 'VOCÊ DEVIA LER, MAS A GENTE SABE QUE NÃO VAI';
            break;
          case '/terms':
            this.footerText = 'COOKIES?SÓ OS GOSTOSOS';
            break;
          case '/services':
            this.footerText = 'É A BAHEA, NÉ PAI';
            break;
          default:
            this.footerText = 'VENHA FUDER SUA VIDA';
        }
      });
  }

  ngAfterViewInit(): void {
    
    this.scrollingText = this.el.nativeElement.querySelector('.scrolling-text');

    if (!this.scrollingText) return;


    if (this.prefersReducedMotion) {

      this.renderer.setStyle(this.scrollingText, 'animation', 'none');

    } else {

      this.renderer.setStyle(this.scrollingText, 'animationPlayState', 'running');
    }
  }
}