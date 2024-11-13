import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // реализуйте тест-кейс
      const foundPosts=postsService.findMany();
      expect(foundPosts.length).toEqual(posts.length);  
      expect(foundPosts).toEqual(
        expect.arrayContaining(posts.map(expect.objectContaining)), 
      );      
    });

    it('should return correct posts for skip and limit options', () => {
      // реализуйте тест-кейс
      const testSkip=1;
      const testLimit=2;
      let foundPosts=postsService.findMany({limit:testLimit, skip: testSkip});
      expect(foundPosts.length).toEqual(testLimit);  
      expect(foundPosts).toEqual(
        expect.arrayContaining(
          posts.slice(testSkip, testLimit).map(expect.objectContaining),
        ),
      );      
    });

    // реализуйте недостающие тест-кейсы
    it('should return correct posts for skip options', () => {
      const testSkip=2;
      let foundPosts=postsService.findMany({skip: testSkip});
      expect(foundPosts.length).toEqual(posts.length-testSkip);  
      expect(foundPosts).toEqual(
        expect.arrayContaining(
          posts.slice(testSkip).map(expect.objectContaining),
        ),
      );      
    });

    it('should return correct posts for limit option', () => {
      const testLimit = 1;
      const foundPosts = postsService.findMany({ limit: testLimit });
      expect(foundPosts).toHaveLength(testLimit);
      expect(foundPosts).toEqual(
        expect.arrayContaining(
          posts.slice(0, testLimit).map(expect.objectContaining),
        ),
      );
    });    
  });
});