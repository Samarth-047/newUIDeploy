import type {NextPage} from 'next';
import {Content} from '../components/home/content';
import {Layout} from '../components/layout/layout';

const Home: NextPage = () => {
   return(
      <Layout>
         <Content />
      </Layout>
   )
    
};

export default Home;
