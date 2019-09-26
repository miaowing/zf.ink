import { Controller, Get, Param, Render } from '@nestjs/common';
import { ExtraService, GithubService, PostService } from '../services';
import { BootValue } from '@nestcloud/boot';

@Controller()
export class RenderController {
  @BootValue('service.title')
  private readonly title: string;

  constructor(
    private readonly postService: PostService,
    private readonly githubService: GithubService,
    private readonly extraService: ExtraService,
  ) {
  }

  @Get()
  @Render('index')
  async index() {
    return {
      title: this.title,
      posts: await this.postService.getLatestPosts(),
      organizations: await this.githubService.getOrganizations(),
      icp: this.extraService.getICP(),
      slogan: 'A JavaScript & TypeScript developer, love open source.',
    };
  }

  @Get('/open')
  @Render('open')
  async open() {
    const collection = await this.githubService.getRepositoriesAndCategories();
    return {
      title: `Open Source - ${this.title}`,
      slogan: 'Open Source Project',
      repositories: collection.repositories,
      categories: collection.categories,
      icp: this.extraService.getICP(),
    };
  }

  @Get('/blog')
  @Render('blog')
  async posts() {
    const collection = await this.postService.getPosts();
    return {
      title: `Blog - ${this.title}`,
      slogan: 'My thoughts & rambling',
      posts: collection.posts,
      categories: collection.categories,
      icp: this.extraService.getICP(),
    };
  }

  @Get('/blog/:slug')
  @Render('post')
  async post(@Param('slug') slug: string) {
    const post = await this.postService.getPost(slug);
    return {
      title: `${post.title} - ${this.title}`,
      url: this.extraService.getUrl(),
      slogan: post.title,
      description: post.excerpt,
      image: post.feature_image,
      post,
      icp: this.extraService.getICP(),
    };
  }

  @Get('/about')
  @Render('about')
  async about() {
    const collection = await this.postService.getAbout();
    return {
      title: `About - ${this.title}`,
      url: this.extraService.getUrl(),
      slogan: 'I’m an front-end software engineer, who loves challenges, newest technologies and programming at all. ',
      description: 'I have made projects for companies such as ksyun (KingSoft Cloud) and YanRong Tech.',
      icp: this.extraService.getICP(),
      info: collection.aboutInfo,
      works: collection.aboutWorks,
      open: collection.aboutOpen,
    };
  }

  @Get('/contact')
  @Render('contact')
  async contact() {
    return {
      title: `Contact - ${this.title}`,
      url: this.extraService.getUrl(),
      slogan: 'Get In Touch',
      description: 'I am here to answer any questions you may have. Use the form below to drop me an email. I\'ll respond as soon as I can.',
      icp: this.extraService.getICP(),
    };
  }

  @Get('/project')
  @Render('project')
  async project() {
    return {
      title: `Project - ${this.title}`,
      url: this.extraService.getUrl(),
      slogan: 'My Projects',
      icp: this.extraService.getICP(),
    };
  }

  @Get('/links')
  @Render('links')
  async links() {
    return {
      title: `Project - ${this.title}`,
      url: this.extraService.getUrl(),
      slogan: 'Some other websites',
      icp: this.extraService.getICP(),
    };
  }
}
