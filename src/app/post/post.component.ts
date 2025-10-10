import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Post {
  title: string;
  content: string;
  author: string;
  date: string;
  image?: File;
  imageUrl?: SafeUrl; // <-- 2. imageUrl - SafeUrl 
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PostComponent implements OnInit {


  constructor(private sanitizer: DomSanitizer) {}

  currentView = signal<'posts' | 'create'>('posts');
  posts = signal<Post[]>([]);

  // Usando o ngOnInit para configurar os dados iniciais do componente
  ngOnInit(): void {
    const initialPosts: Partial<Post>[] = [
      {
        title: 'A VOLTA DA ESTÉTICA NEON',
        content: 'Dos anos 80 para o futuro, o neon continua a ser uma força no design. Exploramos como essa tendência vibrante está iluminando a arte digital, a moda e a decoração de interiores em 2025.',
        author: 'João Silva',
        date: '30/09/2025',
      },
      {
        title: 'DICAS PARA UM FRONT-END DE RESPEITO',
        content: 'Quer deixar suas interfaces mais maneiras? A gente te dá a letra: use animações sutis, escolha uma paleta de cores que converse com a marca e nunca, jamais, esqueça da responsividade. O usuário agradece...',
        author: 'Maria Santos',
        date: '29/09/2025',
        imageUrl: this.sanitizer.bypassSecurityTrustUrl('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f')
      },
      {
        title: 'EXPLORANDO O DESIGN BIOFÍLICO',
        content: 'Conectar a natureza com ambientes internos não é apenas uma tendência, é uma necessidade. Veja como plantas, luz natural e materiais orgânicos podem transformar qualquer espaço de trabalho ou moradia.',
        author: 'Ana Costa',
        date: '28/09/2025'
      }
    ];
    this.posts.set(initialPosts as Post[]);
  }


  postTitle = signal('');
  postAuthor = signal('');
  postContent = signal('');
  postImage = signal<File | null>(null);
  showValidationMessage = signal(false);

  switchView(view: 'posts' | 'create'): void {
    this.currentView.set(view);
  }

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.postImage.set(input.files[0]);
    } else {
      this.postImage.set(null);
    }
  }

  handlePostSubmit(): void {
    const title = this.postTitle().trim();
    const author = this.postAuthor().trim();
    const content = this.postContent().trim();

    if (!title || !author || !content) {
      this.showValidationMessage.set(true);
      setTimeout(() => this.showValidationMessage.set(false), 2500);
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const imageFile = this.postImage();
    let safeImageUrl: SafeUrl | undefined;

    // <-- 6. A mágica principal: usa o sanitizer para validar a URL da nova imagem
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }

    const newPost: Post = { 
      title, 
      author, 
      content, 
      date: formattedDate,
      image: imageFile ?? undefined,
      imageUrl: safeImageUrl
    };

    this.posts.update(currentPosts => [newPost, ...currentPosts]);

    
    this.postTitle.set('');
    this.postAuthor.set('');
    this.postContent.set('');
    this.postImage.set(null); 
    
    this.currentView.set('posts');
  }
}
