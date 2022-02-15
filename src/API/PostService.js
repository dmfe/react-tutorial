import axios from "axios";

export default class PostService {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get('http://localhost:8080/posts', {
      params: {
        limit: limit,
        page: page
      }
    })
    return response
  }

  static async getById(id) {
    const response = await axios.get('http://localhost:8080/posts/' + id)
    return response
  }

  static async getCommentsByPostId(postId) {
    const response = await axios.get('http://localhost:8080/posts/' + postId + '/comments')
    return response
  }
}

