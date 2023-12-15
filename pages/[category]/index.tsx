import { GetServerSideProps } from "next"
import Layout from "../../components/layout"
import Head from 'next/head'
import Footer from "../../components/footer"
import Banner from "../../components/banner"
import { CMS_NAME } from "../../lib/constants"
import { getCategory, getPostsByCategory } from "../../lib/api"
import Link from "next/link"
import Card from "../../components/card"

export default function Index ( { posts, category } ) {

    console.log(posts);
    return (
        <Layout>
            <Head>
                <title>
                    { `${category?.name} | ${CMS_NAME}` }
                </title>
            </Head>
            <Banner content={`<img src="/assets/img/banner_teste.gif" />`} />
            <section>
                <div className="container">
                    <section className="pb-2 sections">
                        <h2 className="featured-1-title featured-2-title blue">
                            <Link href={'/' + category?.slug}>{category?.name}</Link>
                        </h2>
                    </section>
                    <div className="row">
                        { posts?.edges?.map((post: any, index: number) => (
                            <div className="col col-12 col-lg-4 mb-4">
                                <Card post={post.node} classImg="featured-3" classTitle="featured-3-title" />
                            </div>
                        ))}    
                    </div>
                </div>
            </section>
        </Layout>
    )

}
export const getServerSideProps: GetServerSideProps = async ( { params } : any ) => {


    const posts = await getPostsByCategory(params?.category, 8, [])
    const category = await getCategory(params?.category)
    return {
        props: {
            posts : posts,
            category : category
        }
    }
}
