import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
  // displays navbar above page content
  <Layout>
    {/* displays page content */}
    <Component {...pageProps} />
  {/* displays footer below page content */}
  </Layout>
  )
}

export default MyApp
