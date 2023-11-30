import Footer from './footer'
import Meta from './meta'
import Header from './header'

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
