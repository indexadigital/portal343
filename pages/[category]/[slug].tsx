import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'

import { getAllPosts, getPost } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'
import Banner from '../../components/banner'
import Link from 'next/link'
import CardList from '../../components/card-list'
import Card from '../../components/card'

export default function CategorySlug({ post, posts, ultimas }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
        <Head>
            <title>
                { `${post?.title} | ${CMS_NAME}` }
            </title>
        </Head>
        <Banner content={`<img src="/assets/img/banner_teste.gif" />`} />
        <section>
          <div className="container">
              
              <PostHeader post={post} />

              <div className="row">
                <div className="col col-12 col-lg-8">
                    <article>

                      <PostBody content={post.content} />

                      <div className="sections mt-5">
                          <h2 className="featured-1-title featured-2-title blue"><a href="#">VEJA TAMBÉM</a></h2>
                          
                          { posts?.edges?.map((post: any, index: number) => (
                            <CardList post={post?.node} classImg="featured-4" />
                          ))}                          
                          
                          <Link className="button-featured blue d-flex align-items-center normal" href="/noticias">
                            MAIS
                            NOTÍCIAS<span className='mx-1' />
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                                viewBox="0 0 384 512">
                                <path
                                  d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                                  fill="#fff" />
                            </svg>
                          </Link>
                      </div>
                    </article>
                </div>
                <div className="col col-12 col-lg-4 px-5">
                    <div className="mb-3 mt-0">
                      <Banner content={`<img src="/assets/img/banner_girassol.gif" />`} />
                    </div>
                    <div className="mb-3">
                      <Banner content={`<img src="/assets/img/banner4.png" width="300" />`} />
                    </div>
                    <div className="sections px-3 pt-4">
                      <h2 className="featured-1-title featured-2-title blue"><Link href="/noticias" title="Últimas">ÚLTIMAS</Link></h2>
                      { ultimas?.edges?.map((post: any, index: number) => (
                        <div className="mb-3">
                          <Card post={post?.node} classImg="featured-4" classTitle='featured-3-title' />
                        </div>
                      ))}                                          
                    </div>
                </div>
              </div>
          </div>
        </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params
}) => {

  const post = await getPost( params?.slug )
  const ultimas = await getAllPosts( 5, [post?.databaseId])
  const ultimasIds = ultimas?.edges && ultimas?.edges.map((post: any) => post?.node?.databaseId || null) || [];
  ultimasIds.push(post?.databaseId)
  const posts = await getAllPosts( 3, ultimasIds)  

  if (!post) {
      return {
          props: {},
          notFound: true,
      };
  }

  return {
      props: { 
          post, 
          posts,
          ultimas
      }
  }
}