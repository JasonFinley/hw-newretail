import products from '/public/items.json'
import Header from "../components/header";
import Filter from "../components/filter/index_newretail";
import ViewProducts from '../view/index_newretail';

export default async function Home() {

  return (
    <div>
        <Header/>
        <Filter datas={products}/>
        <ViewProducts datas={products}/>
    </div>
  );
}
