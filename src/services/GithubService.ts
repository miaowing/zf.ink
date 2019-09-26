import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Client from '@octokit/rest';
import { BootValue } from '@nestcloud/boot';
import { put, get } from 'memory-cache';

@Injectable()
export class GithubService implements OnModuleInit {
  private readonly TIMEOUT = 3600000;
  private readonly ORG_CACHE = 'org_cache';
  private readonly REPO_CACHE = 'repo_cache';
  private client;
  @BootValue('github.token')
  private readonly token: string;
  @BootValue('github.organization.exclude', [])
  private readonly orgExcludes: string[];
  @BootValue('github.repository.exclude.owner', [])
  private readonly repoOwnerExcludes: string[];

  onModuleInit(): any {
    this.client = new Client({ auth: this.token });
  }

  async getOrganizations() {
    let organizations = get(this.ORG_CACHE);
    if (!organizations) {
      organizations = (await this.client.orgs.listForAuthenticatedUser()).data;
      organizations = organizations.filter(org => {
        if (this.orgExcludes.includes(org.login)) {
          return false;
        }
        org.description = org.description || org.login;
        if (org.login === 'b3log') {
          org.description = 'B3log 是一个小众开源社区';
        }
        return true;
      });
      put(this.ORG_CACHE, organizations, this.TIMEOUT);
    }

    return organizations;
  }

  async getRepositoriesAndCategories() {
    let repositories = get(this.REPO_CACHE);
    if (!repositories) {
      repositories = (await this.client.repos.list({
        visibility: 'public',
        per_page: 100,
      })).data.filter(repo => {
        if (repo.owner) {
          if (!this.repoOwnerExcludes.includes(repo.owner.login)) {
            return true;
          }
        }
        return false;
      });

      put(this.REPO_CACHE, repositories, this.TIMEOUT);
    }

    const categories = [];

    repositories.forEach(repo => {
      if (!categories.includes(repo.owner.login)) {
        categories.push(repo.owner.login);
      }
    });

    repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);
    return { repositories, categories };
  }
}
