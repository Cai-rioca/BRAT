import { Routes } from '@angular/router';
import { VinilComponent } from './vinil/vinil.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ServicesComponent } from './services/services.component';
import { LetsTalkComponent } from './lets-talk/lets-talk.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './post/post.component';
import { PrivComponent } from './components/priv/priv.component';
import { TermsComponent } from './components/terms/terms.component';

export const routes: Routes = [
  {
    path: '',
    component: VinilComponent,
  },
  {
    path: 'timeline',
    component: TimelineComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'letstalk',
    component: LetsTalkComponent
  },
  {
    path: 'post',
    component: PostComponent
  },
    {
    path: 'priv',
    component: PrivComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  }
];

 