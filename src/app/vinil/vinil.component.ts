import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Declara a variável global do SoundCloud para o TypeScript não reclamar
declare var SC: any;

@Component({
  selector: 'app-vinil',

  imports: [RouterModule],
  templateUrl: './vinil.component.html',
  styleUrls: ['./vinil.component.css']
})
export class VinilComponent implements AfterViewInit {
  // @ViewChild pega a referência do <iframe> do template (#vinilPlayer)
  @ViewChild('vinilPlayer') vinilPlayerFrame!: ElementRef;

  // URLs da API
  tracks = [
    {
      url: "https://api.soundcloud.com/tracks/335504833",
      name: "A. So, Tell Me, Tell Me",
      artist: "Shavonne",
      description: "Clássico do freestyle que moldou a estética urbana dos anos 80 e 90, com jaquetas oversized, calças de cintura alta e muito brilho nas pistas. Essa sonoridade definiu uma era em que o estilo era tão importante quanto a batida.",
      cover: "https://i1.sndcdn.com/artworks-000235887840-e9fabx-t500x500.jpg"
    },
    {
      url: "https://api.soundcloud.com/tracks/165411256",
      name: "Take Me In Your Arms",
      artist: "Lil Suzy",
      description: "Um hino freestyle que virou sinônimo de tops justos, jeans lavados e cabelos armados. A música embalou clubes e influenciou gerações a expressarem moda como atitude de rua e liberdade.",
      cover: "https://i1.sndcdn.com/artworks-000089542969-fl49p8-t500x500.jpg"
    },
    {
      url: "https://api.soundcloud.com/tracks/73115579",
      name: "Don't Stop the Rock",
      artist: "Freestyle",
      description: "Essa faixa moldou o visual do breakdance e da cultura hip-hop inicial: tênis brancos impecáveis, jaquetas esportivas e bonés flat. O som que vestiu uma geração inteira de dançarinos de rua.",
      cover: "https://i1.sndcdn.com/artworks-baeRippUgVXMA29p-3XUI5g-t500x500.jpg"
    },
    {
      url: "https://api.soundcloud.com/tracks/1938804185",
      name: "Fall Slowly",
      artist: "Falling Mix",
      description: "Com batidas suaves e atmosferas eletrônicas, essa faixa traduz a estética minimalista moderna — cortes limpos, tons neutros e o visual 'clean fit' que domina as ruas e editoriais de moda atuais.",
      cover: "https://i1.sndcdn.com/artworks-XiJBjMfX0BBk-0-t500x500.jpg"
    },
    {
      url: "https://api.soundcloud.com/tracks/610376136",
      name: "DUELO DE GIGANTES PIPOS X PIT BULL",
      artist: "Minhoca 2019",
      description: "Funk automotivo no talo — símbolo da moda periférica brasileira. Shorts jeans, regatas, pochetes e óculos espelhados se fundem ao som que dita o visual dos bailes e encontros de rua.",
      cover: "https://i1.sndcdn.com/artworks-000524952846-909eeu-t500x500.jpg"
    },
    {
      url: "https://api.soundcloud.com/tracks/1123049251",
      name: "YaSuKe 弥助 !!!",
      artist: "Prod. Sim",
      description: "Mistura experimental que evoca a fusão de culturas no streetwear global. Referências orientais, cortes assimétricos e sobreposições modernas — a música que inspira moda de vanguarda.",
      cover: "https://i1.sndcdn.com/artworks-WQGncTCPSeYOVdtC-Ucf2zg-t500x500.jpg"
    },
    {
      url: "https://api.soundcloud.com/tracks/1967183415",
      name: "SWAMP FEST 23",
      artist: "DJ GATOR AIDS",
      description: "Set pesado e underground que carrega o espírito das raves e festivais alternativos. Moda rave: neon, malhas coladas, óculos futuristas e liberdade estética total.",
      cover: "https://i1.sndcdn.com/artworks-WcVRnt3QHm0mzgp3-8O03yw-t500x500.jpg"
    },
    {
      url: "https://api.soundcloud.com/tracks/1215090046",
      name: "Metallica No Fone!! *.°+^^",
      artist: "p. frozy x warheart",
      description: "Fusão entre metal e batidas modernas — visual híbrido: preto, couro, correntes e estética grunge misturada ao hype urbano. Representa a moda como rebeldia e experimentação.",
      cover: "https://i1.sndcdn.com/artworks-UrzdJFhLRadm4d1s-62Lm2g-t500x500.jpg"
    },
    {
      url: "https://api.soundcloud.com/tracks/679115748",
      name: "Vai na Piroca Amor",
      artist: "MUST MIV",
      description: "Funk ousado que ecoa nos fluxos e cria tendência no vestuário sensual e autêntico das ruas: shortinhos, croppeds, correntes, sandálias plataforma e muita atitude.",
      cover: "https://i1.sndcdn.com/artworks-000595775634-ggf7kl-t500x500.jpg"
    },
    {
      url: "https://api.soundcloud.com/tracks/2091422595",
      name: "Cogumelo",
      artist: "tocanna",
      description: "Psytrance psicodélico que remete à estética rave hippie e alterna entre looks coloridos, tecidos fluidos, tie-dye e acessórios psicodélicos — pura liberdade visual.",
      cover: "https://i1.sndcdn.com/artworks-OFnLqaC71Q2k-0-t500x500.png"
    },
    {
      url: "https://api.soundcloud.com/tracks/1911632888",
      name: "VAI SENTAR NA GLOCK COM PENTÃO ADAPTADO",
      artist: "Koala6xis – Setparte3",
      description: "Estética do funk proibidão: estética pesada, streetwear ostentação e visual de resistência cultural. Correntes grossas, bermudas largas e camisetas de marca.",
      cover: "https://i1.sndcdn.com/artworks-VdzA62hnYCNxKNaG-chZCBw-t500x500.jpg"
    },
    {
      url: "https://api.soundcloud.com/tracks/2151113787",
      name: "more woman (clean your mind)",
      artist: "DJ JOTA DA BS, DJ KOALA6",
      description: "Essa faixa carrega a alma das pistas da quebrada — uma fusão intensa entre o funk experimental e a estética underground digital. Sons assim ditam não só o ritmo da rua, mas também a forma de se vestir: tops cropped, calças largas, Nike Shox no pé e atitude no olhar. O visual nasce junto com o beat — é moda viva, pulsante, feita no improviso.",
      cover: "https://i1.sndcdn.com/artworks-7bQq6wHSnis579lS-UfsvBw-t500x500.png"
    },
    {
      url: "https://api.soundcloud.com/tracks/2105037792",
      name: "EXPLICACAO DA LORE DE NANATSU NO TAIZAI",
      artist: "DJ KOALA6",
      description: "Um set que mistura cultura pop otaku com o peso do funk — criando uma identidade visual que junta anime, rave e baile de rua. Essa estética gera uma moda própria: moletons oversized, estampa gráfica forte, máscara, corrente, cabelo colorido — um visual híbrido, globalizado e sem pedir licença.",
      cover: "https://i1.sndcdn.com/artworks-c2M7iBB106l5dckj-i9Sqcg-t500x500.png"
    }

  ];


  trackIndex = 0;
  widget: any;
  isPlaying = false;
  currentVolume = 100;
  currentTrack = this.tracks[this.trackIndex]; // Guarda a música atual
  safeUrlForInitialTrack: SafeResourceUrl; // URL segura para a primeira música

  constructor(private sanitizer: DomSanitizer, private zone: NgZone) {
    // Cria uma URL segura apenas para a primeira música carregar no iframe
    const initialUrl = `https://w.soundcloud.com/player/?url=${this.tracks[0].url}`;
    this.safeUrlForInitialTrack = this.sanitizer.bypassSecurityTrustResourceUrl(initialUrl);
  }

  ngAfterViewInit(): void {
    gsap.to('.main-title', { opacity: 1, y: 0, duration: 1, delay: 0.3 });
    gsap.to('.vinyl-container', { opacity: 1, x: 0, duration: 1, delay: 0.6 });
    gsap.to('.arrow-circle', { opacity: 1, duration: 1, delay: 1 });

    this.initializePlayer();
    this.initArrow();
  }

  initializePlayer(): void {

    if (typeof SC === 'undefined' || !this.vinilPlayerFrame?.nativeElement) {
      setTimeout(() => this.initializePlayer(), 100);
      return;
    }

    this.widget = SC.Widget(this.vinilPlayerFrame.nativeElement);
    this.bindWidgetEvents();
  }

  bindWidgetEvents(): void {
    this.widget.bind(SC.Widget.Events.READY, () => {
      console.log('Player pronto!');
      this.widget.setVolume(this.currentVolume / 100);
    });

    // Usando NgZone para garantir que o Angular atualize a tela quando um evento do SC acontecer
    this.widget.bind(SC.Widget.Events.PLAY, () => {
      this.zone.run(() => { this.isPlaying = true; });
    });

    this.widget.bind(SC.Widget.Events.PAUSE, () => {
      this.zone.run(() => { this.isPlaying = false; });
    });

    this.widget.bind(SC.Widget.Events.FINISH, () => {
      this.zone.run(() => { this.nextTrack(); }); // Pula para a próxima quando a música acaba
    });
  }

  loadTrack(index: number, autoPlay: boolean): void {
    this.trackIndex = index;
    this.currentTrack = this.tracks[index];


    gsap.fromTo(['.track-name', '.artist-name', '.description', '.vinyl-center img'],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }
    );


    this.widget.load(this.tracks[index].url, {
      auto_play: autoPlay
    });

    if (!autoPlay) {
      this.isPlaying = false;
    }
  }

  // --- MÉTODOS DE CONTROLE CHAMADOS PELO HTML ---

  togglePlayPause(): void {
    this.widget.toggle();
  }

  prevTrack(): void {
    const newIndex = (this.trackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.loadTrack(newIndex, true);
  }

  nextTrack(): void {
    const newIndex = (this.trackIndex + 1) % this.tracks.length;
    this.loadTrack(newIndex, true);
  }

  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.currentVolume = Number(target.value);
    this.widget.setVolume(this.currentVolume / 100);
  }

  // 360 da seta 
  initArrow(): void {
    const arrowCircle = document.querySelector('.arrow-circle');
    if (!arrowCircle) return;
    arrowCircle.addEventListener('mouseenter', () => gsap.to(arrowCircle, { scale: 1.1, duration: 0.3 }));
    arrowCircle.addEventListener('mouseleave', () => gsap.to(arrowCircle, { scale: 1, duration: 0.3 }));
    arrowCircle.addEventListener('click', () => gsap.to(arrowCircle, { rotation: "+=360", duration: 0.6, ease: "power2.out" }));
  }
}
