import { GetServerSideProps } from "next"
import Layout from "../../components/layout"
import Header from "../../components/header"
import Container from "../../components/container"
import Footer from "../../components/footer"


export default function Index ( { category } ) {

    return (
        <Layout>           
            <Header />
            <Container>
                {category}
            </Container>
            <Footer />
        </Layout>
    )

}
export const getServerSideProps: GetServerSideProps = async ( { params } ) => {
  return {
    props: {
        category : params?.category
    }
  }
}
