'use client'

import { useQuery } from '@tanstack/react-query'

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '/api'

async function graphqlFetch(query: string, variables: Record<string, any> = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  return json?.data ?? null
}

export function usePostsByCategory(categoryName: string, first = 3, notIn: number[] = []) {
  const notInJoined = notIn.join(',')

  return useQuery({
    queryKey: ['posts', 'category', categoryName, first, notIn],
    queryFn: async () => {
      const data = await graphqlFetch(`
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
                extras { chapeu subtitulo }
                featuredImage {
                  node {
                    sourceUrl
                    mediaDetails {
                      sizes(include: FEATURED_3) { name sourceUrl }
                    }
                  }
                }
                excerpt
                categories { nodes { name slug } }
              }
            }
          }
        }
      `)
      return data?.posts
    },
    staleTime: 60 * 1000,
  })
}

export function useAllPosts(first: number, notIn: number[] = []) {
  const notInJoined = notIn.join(',')

  return useQuery({
    queryKey: ['posts', 'all', first, notIn],
    queryFn: async () => {
      const data = await graphqlFetch(`
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
                extras { chapeu subtitulo }
                featuredImage {
                  node {
                    sourceUrl
                    mediaDetails {
                      sizes(include: [FEATURED_3, FEATURED_4]) { name sourceUrl }
                    }
                  }
                }
                excerpt
                categories { nodes { name slug } }
              }
            }
          }
        }
      `)
      return data?.posts
    },
    staleTime: 60 * 1000,
  })
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const data = await graphqlFetch(
        `
        fragment AuthorFields on User {
          name firstName lastName
          avatar { url }
        }
        fragment PostFields on Post {
          databaseId title excerpt slug date modified
          featuredImage { node { sourceUrl } }
          author { node { ...AuthorFields } }
          categories { nodes { name slug } }
          tags { nodes { name slug } }
          extras { subtitulo chapeu }
        }
        query GetPost($slug: String) {
          postBy(slug: $slug) { ...PostFields content }
        }`,
        { slug }
      )
      return data?.postBy
    },
    staleTime: 60 * 1000,
    enabled: !!slug,
  })
}

export function useDestaques() {
  return useQuery({
    queryKey: ['destaques'],
    queryFn: async () => {
      let query = `query getDestaques { destaques { listaDeDestaques {`
      for (let i = 1; i < 5; i++) {
        query += `
          destaque${i} {
            ... on Post {
              databaseId title slug
              extras { chapeu subtitulo }
              featuredImage {
                node {
                  sourceUrl
                  mediaDetails { sizes(include: [FEATURED_1, FEATURED_2]) { name sourceUrl } }
                }
              }
              excerpt
              categories { nodes { name slug } }
            }
          },
        `
      }
      query += `}}}`
      const data = await graphqlFetch(query)
      return data?.destaques
    },
    staleTime: 60 * 1000,
  })
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      const data = await graphqlFetch(`
        query getCategory {
          category(id: "${slug}", idType: SLUG) {
            name slug categoryId
          }
        }
      `)
      return data?.category
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  })
}
