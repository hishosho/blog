import axios from './index'

const BlogService = {
  getBlogDetail: (id: number) => axios({ url: `/blogs/blogDetail`, params: { id } }),
  getBlogs: () => axios({ url: '/blogs/publishedBlogs' }),
  getPopularBlogs: () => axios({ url: '/blogs/popular' }),
  getBlogTags: () => axios({ url: '/tags' }),
  getBlogsByTagId: (tagId: number) => axios({ url: '/blogs/publishedBlogsByTagId', params: { tagId } }),
  updateBlogTagState: ({ id, state }: {id: number, state: boolean}) => axios({ url: '/', params: { id, state } }),
}

export default BlogService