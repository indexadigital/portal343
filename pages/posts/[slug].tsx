import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Tags from '../../components/tags'
import { getAllPosts, getPost } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'

export default function Post({ post, posts }) {
  const router = useRouter()
  const morePosts = posts?.edges

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${post.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                categories={post.categories}
              />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params
}) => {
  const post = await getPost( params?.slug )
  const posts = await getAllPosts( 5 )

  if (!post) {
      return {
          props: {},
          notFound: true,
      };
  }

  return {
      props: { 
          post, 
          posts
      }
  }
}