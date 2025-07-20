import Header from "./components/header";
import Filter from "./components/filter";
import products from '/public/items.json'
import ViewProducts from "./view";

export default async function Home() {

  return (
    <div>
        <Header/>
        <Filter datas={products}/>
        <ViewProducts datas={products}/>
    </div>
  );
}
