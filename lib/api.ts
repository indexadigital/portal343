import axios from 'axios'
import https from 'https'
const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const options = {
    baseURL: API_URL,
    timeout: 60000, // 1 minuto
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false // APENAS PARA DESENVOLVIMENTO
    })
  };
  const api = axios.create(options);
  const result = await api.post('/', {
    query,
    variables,
  });
  return result?.data ? result?.data?.data : null
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 500) {
        edges {
          node {
            title
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
      databaseId
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
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      extras {
        subtitulo
        chapeu
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
export async function getAllPosts(first, notIn = []) {

  const notInJoined = notIn.join(',')
  
  const data = await fetchAPI(
    `
    query GetPosts {
      posts(
        where: {notIn: [${notInJoined}], orderby: {field: DATE, order: DESC}}
        first: ${first}
      ) {
        edges {
          node {
            databaseId
            title
            slug
            extras {
              chapeu
              subtitulo
            }
            featuredImage {
              node {
                sourceUrl
                mediaDetails {
                  sizes(include: [FEATURED_3, FEATURED_4]) {
                    name
                    sourceUrl
                  }
                }
              }
            }
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    }
  `
  )

  return data?.posts
}
export async function getPostsByCategory( categoryName = "", first = 3, notIn = []) {

  const notInJoined = notIn.join(',')

  const data = await fetchAPI(
    `
    query getPostsByCategory {
      posts(
        where: {categoryName: "${categoryName}", notIn: [${notInJoined}], orderby: {field: DATE, order: DESC}}
        first: ${first}
      ) {
        edges {
          node {
            databaseId
            title
            slug
            extras {
              chapeu
              subtitulo
            }
            featuredImage {
              node {
                sourceUrl
                mediaDetails {
                  sizes(include: FEATURED_3) {
                    name
                    sourceUrl
                  }
                }
              }
            }
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    }
    `
  )

  return data?.posts
}
export async function getDestaques() {

  let query = `query getDestaques {
                destaques {
                  listaDeDestaques {`
                   
  for(let i = 1; i < 5; i++){
    query += `    
          destaque${i} {
            ... on Post {
              databaseId
              title
              slug
              extras {
                chapeu
                subtitulo
              }
              featuredImage {
                node {
                  sourceUrl
                  mediaDetails {
                    sizes(include: [FEATURED_1, FEATURED_2]) {
                      name
                      sourceUrl
                    }
                  }
                }
              }
              excerpt
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
          },          
        `
  }
  query += `}}}`
  const data = await fetchAPI(query)
  return data?.destaques
}
export async function getCategory(slug : any) {
  const data = await fetchAPI(
    `   
    query getCategory {
      category(id: "${slug}", idType: SLUG) {
        name
        slug
        categoryId
      }
    }
    `
  )
  return data?.category;
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
