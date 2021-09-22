import axios from './index'

const BlogService = {
  getBlogDetail: (id: string) => axios({ url: '/', params: {id} }),
  getBlogs: () => axios({ url: '/' }),
  getPropulerBlogs: () => axios({ url: '/' }),
}



export default BlogService