import { Test, TestingModule } from '@nestjs/testing';
import { Post } from './models/post.model';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

const mockPost: Post = {
  authorId: 1,
  id: 1,
  title: 'Mock Post',
};

const postsServiceMock = {
  findOne: jest.fn((id: number): Post => mockPost),
  findAll: jest.fn((): Post[] => [mockPost]),
  findAllByAuthorId: jest.fn((): Post[] => [mockPost]),
};

describe('PostsResolver', () => {
  let resolver: PostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsResolver,
        { provide: PostsService, useValue: postsServiceMock },
      ],
    }).compile();

    resolver = module.get<PostsResolver>(PostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query all posts', () => {
    const result = resolver.getPosts();
    expect(Array.isArray(result)).toEqual(true);
  });

  it('should resolve posts of a user', () => {
    const result = resolver.posts({ id: 1 });
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          authorId: 1,
        }),
      ]),
    );
  });
});
