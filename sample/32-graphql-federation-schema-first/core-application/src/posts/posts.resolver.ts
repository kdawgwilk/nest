import { Injectable } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './models/user.model';
import { PostsService } from './posts.service';

@Injectable()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Resolver('User')
  @ResolveField('posts')
  public posts(@Parent() user: User) {
    return this.postsService.findAllByAuthorId(user.id);
  }

  @Query('getPosts')
  getPosts() {
    return this.postsService.findAll();
  }
}
