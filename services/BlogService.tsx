import axios from './index'

const BlogService = {
  getBlogDetail: (id: number) => axios({ url: '/', params: {id} }),
  getBlogs: () => axios({ url: '/blogs' }),
  getPropulerBlogs: () => axios({ url: '/' }),
  getBlogTags: () => axios({ url: '/' }),
  getBlogsByTagId: (id: number) => axios({ url: '/', params: {id} }),
  updateBlogTagState: ({ id, state }: {id: number, state: boolean}) => axios({ url: '/', params: { id, state } }),
}

export default BlogService