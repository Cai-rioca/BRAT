import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Post {
  title: string;
  content: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {

  // aba atual (posts ou criação)
  currentView = signal<'posts' | 'create'>('posts');

  // posts iniciais
  posts = signal<Post[]>([
    {
      title: 'A VOLTA DA ESTÉTICA NEON',
      content: 'Dos anos 80 para o futuro, o neon continua a ser uma força no design. Exploramos como essa tendência vibrante está iluminando a arte digital, a moda e a decoração de interiores em 2025.',
      author: 'João Silva',
      date: '30/09/2025'
    },
    {
      title: 'DICAS PARA UM FRONT-END DE RESPEITO',
      content: 'Quer deixar suas interfaces mais maneiras? A gente te dá a letra: use animações sutis, escolha uma paleta de cores que converse com a marca e nunca, jamais, esqueça da responsividade. O usuário agradece...',
      author: 'Maria Santos',
      date: '29/09/2025'
    },
    {
      title: 'EXPLORANDO O DESIGN BIOFÍLICO',
      content: 'Conectar a natureza com ambientes internos não é apenas uma tendência, é uma necessidade. Veja como plantas, luz natural e materiais orgânicos podem transformar qualquer espaço de trabalho ou moradia.',
      author: 'Ana Costa',
      date: '28/09/2025'
    }
  ]);

  // signals dos campos do form
  postTitle = signal('');
  postAuthor = signal('');
  postContent = signal('');
  showValidationMessage = signal(false);

  // troca de aba (baia)
  switchView(view: 'posts' | 'create'): void {
    this.currentView.set(view);
  }

  // envia o post
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

    const newPost: Post = { title, author, content, date: formattedDate };

    // adiciona no topo e dispara atualização reativa
    this.posts.update(currentPosts => [newPost, ...currentPosts]);

    // limpa os campos
    this.postTitle.set('');
    this.postAuthor.set('');
    this.postContent.set('');

    // volta pra aba de posts pra ver o resultado
    this.currentView.set('posts');
  }
}
