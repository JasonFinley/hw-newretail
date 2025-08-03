import products from '/public/knsh_items.json'
import Header from "../components/header";
import Filter from "../components/filter/index_knsh";
import ViewProducts from '../view/index_knsh';

export default async function Home() {

  return (
    <div>
        <Header/>
        <Filter/>
        <ViewProducts datas={products}/>
    </div>
  );
}
