import axios from './index'

const BlogService = {
  getBlogDetail: (id: string) => axios({ url: '/', params: {id} })
}

export default BlogService