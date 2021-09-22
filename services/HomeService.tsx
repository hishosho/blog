import axios from './index'

const HomeService = {
  words: () => axios({ url: '/' })
}

export default HomeService