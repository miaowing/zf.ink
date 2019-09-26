import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { BootValue } from '@nestcloud/boot';
import { IPost } from '../interfaces/IPost';
import * as GhostAdminAPI from '@tryghost/admin-api';
import * as GhostContentAPI from '@tryghost/content-api';

@Injectable()
export class PostService implements OnModuleInit {
  private admin: GhostAdminAPI;
  private content: GhostContentAPI;
  @BootValue('ghost.url')
  private readonly url: string;
  @BootValue('ghost.adminKey')
  private readonly adminKey: string;
  @BootValue('ghost.contentKey')
  private readonly contentKey: string;

  async getPost(slug: string): Promise<any> {
    let post = { html: '' };
    try {
      post = await this.admin.posts.read({ slug });
      const content = await this.content.posts.read({ slug });
      post.html = content.html;
    } catch (e) {
      throw new NotFoundException('Resource Not Found');
    }

    return post;
  }

  async getAbout() {
    const aboutInfo = await this.content.pages.read({ slug: 'about_info' });
    const aboutWorks = await this.content.pages.read({ slug: 'about_works' });
    const aboutOpen = await this.content.pages.read({ slug: 'about_open_source' });
    return { aboutInfo, aboutWorks, aboutOpen };
  }

  async getPosts(): Promise<{ posts: IPost[], categories: string[] }> {
    let posts = await this.admin.posts.browse();

    const categories = [];
    posts = posts.map(post => {
      const primaryTag = post.primary_tag ? post.primary_tag.name : '';
      if (!categories.includes(primaryTag) && primaryTag) {
        categories.push(primaryTag);
      }
      return {
        id: post.id,
        title: post.title,
        html: post.html,
        publishedAt: new Date(post.published_at),
        primaryTag,
        slug: post.slug,
        image: post.feature_image || '/assets/logo.jpeg',
      };
    });
    return { posts, categories };
  }

  async getLatestPosts(): Promise<IPost[]> {
    const collection = await this.getPosts();
    if (collection.posts.length > 2) {
      return collection.posts.slice(0, 3);
    }
    return collection.posts;
  }

  onModuleInit(): any {
    this.admin = new GhostAdminAPI({
      url: this.url,
      key: this.adminKey,
      version: 'v2',
    });
    this.content = new GhostContentAPI({
      url: this.url,
      key: this.contentKey,
      version: 'v2',
    });
  }
}
