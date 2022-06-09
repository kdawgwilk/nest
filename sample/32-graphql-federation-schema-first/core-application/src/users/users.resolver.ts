import { Injectable } from '@nestjs/common';
import { Args, ID, Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';
import { Post } from '../posts/posts.interfaces';
import { UsersService } from './users.service';

@Injectable()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  getUser(@Args('id') id: number) {
    return this.usersService.findById(id);
  }

  @Resolver('Post')
  @ResolveField('user')
  user(@Parent() post: Post) {
    return this.usersService.findById(post.id);
  }

  @Resolver('User')
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.usersService.findById(reference.id);
  }
}
