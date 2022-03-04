import Head from 'next/head';
import favicon from '../public/favicon.ico';


const CustomHead = ({ title }) => (
  <Head>
    <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
    <title>{ title }</title>
  </Head>
);

export default CustomHead;