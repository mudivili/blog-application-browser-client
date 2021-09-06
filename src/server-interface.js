class ServerInterface {

  constructor() {

    const protocol = process.env.REACT_APP_API_PROTOCOL;
    const host = process.env.REACT_APP_API_HOST;
    const port = process.env.REACT_APP_API_PORT;

    this.baseURL = `${protocol}://${host}:${port}`;

  }

  async getBlogById(blogId) {

    return this.get(`/blog/${blogId}`);

  }

  async getAllBlogs(queryOptions) {

    return this.get('/blog/list', queryOptions);

  }

  async saveBlog(blog) {

    return this.post('/blog/create', blog);

  }

  async get(path, queryOptions) {

    return this.executeRequest('GET', path, queryOptions);

  }

  async post(path, payload) {

    return this.executeRequest('POST', path, {}, payload);

  }

  async executeRequest(method, path, queryOptions, payload) {

    var url = new URL(this.baseURL + path);
    url.search = new URLSearchParams({ queryOptions: JSON.stringify(queryOptions) }).toString()

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (['POST', 'PUT'].indexOf(method) !== -1) {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(url, options);

    const result = await response.json();

    if (result.success === false) {
      throw result.data;
    }

    return result.data;

  }

}

const serverInterface = new ServerInterface();

export default serverInterface