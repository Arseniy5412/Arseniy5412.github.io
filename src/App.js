import Catalog from './components/Catalog';
import Header from './Header';
import Drawer from './components/Drawer';
import React from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorite] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpen, setCartOpen] = React.useState(false);

  console.log(cartItems);

  React.useEffect(() => {
      axios.get('https://638f6be69cbdb0dbe326f2e5.mockapi.io/item/items').then((res) => {
        setItems(res.data);
      });
      axios.get('https://638f6be69cbdb0dbe326f2e5.mockapi.io/item/cart').then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddCart = (obj) => {  
     if (cartItems.find((item) => Number(item.id) === Number(obj.id))) { 
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://638f6be69cbdb0dbe326f2e5.mockapi.io/item/cart', obj);
       setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://638f6be69cbdb0dbe326f2e5.mockapi.io/item/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id ));
  };

  const onAddFavorite = (obj) => {  
    axios.post('https://638f6be69cbdb0dbe326f2e5.mockapi.io/item/favorites', obj);
    setFavorite((prev) => [...prev, obj]);
  };

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper clear">
          <Drawer items={cartItems}
           onClickClose={()=> setCartOpen(false)}
            onRemove={onRemoveItem}
             opened={cartOpen}/>     
          <Header onClickCartOpen={() => setCartOpen(true)}/>
        <div className="content">
          <div className="d-flex align-center justify-between mb-40">
            <div className="catalogName p-40">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</div>
            <div className="search d-flex">
              <img src="/icon/search.svg" alt="search"></img>
              {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/icon/remove.svg" alt="clear" />}
              <input onChange={onSearchChange} value={searchValue} placeholder="Поиск..."></input>
            </div>
          </div>
            <div className="sneakers d-flex flex-wrap">
              {items
              .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((item, index) => (
                 <Catalog
                  key={index}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onClickFavorite={(obj) => onAddFavorite(obj)}
                  onPlus={(obj) => onAddCart(obj)}
                 />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
