import axios from 'axios'
const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const options = {
    baseURL: API_URL,
    timeout: 600000, // 10 minutos
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  };
  const api = axios.create(options);
  return (await api.post('/', {
    query,
    variables,
  }))?.data?.data
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 500) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}
export async function getPost(slug : any) {
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      modified
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query GetPost($slug: String) {
      postBy(
        slug: $slug
      ) {
        ...PostFields
        content
      }
    }`,
    {
      variables: { slug },
    }
  )
  return data?.postBy
}
export async function getAllPosts(first = 8) {
  const data = await fetchAPI(
    `
    query GetPosts($first: Int) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        first: first
      },
    }
  )

  return data?.posts
}

export async function getPage(slug : any) {
  const data = await fetchAPI(
    `   
    query GetPage($slug: String) {
      pageBy(uri: $slug) {
        title
        slug
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    `,
    {
      variables: { slug },
    }
  )
  return data?.pageBy;
}
