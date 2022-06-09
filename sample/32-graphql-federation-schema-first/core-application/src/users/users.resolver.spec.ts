import { Test, TestingModule } from '@nestjs/testing';
import { Post } from 'src/posts/models/post.model';
import { User } from './models/user.model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

const mockPost: Post = {
  authorId: 1,
  id: 1,
  title: 'Mock Post',
};

const usersServiceMock = {
  findById: jest.fn((id: number): User => {
    return { id, name: 'Mocked User' };
  }),
};

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query a user by its id', () => {
    const result = resolver.getUser(1);
    expect(result.id).toEqual(1);
  });

  it('should resolve a reference', () => {
    const result = resolver.resolveReference({ __typename: 'User', id: 1 });
    expect(result.id).toEqual(1);
  });

  it('should resolve the user of a post', () => {
    const result = resolver.user(mockPost);
    expect(result).toEqual(
      expect.objectContaining({
        id: mockPost.authorId,
        name: 'Mocked User'
      }),
    );
  });
});
