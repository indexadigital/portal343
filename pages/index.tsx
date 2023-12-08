import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Container from '../components/container'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import { CMS_TITLE } from '../lib/constants'

export default function Index({ allPosts: { edges }}) {
  const heroPost = edges[0]?.node

  return (
    <Layout>
      <Head>
        <title>{`${CMS_TITLE}`}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
      </Container>
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const allPosts = await getAllPosts()

  return {
    props: { allPosts }
  }
}
