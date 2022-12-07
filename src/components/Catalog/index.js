import styles from './Catalog.module.scss';
import React from 'react';

function Catalog({id, title, price, imageUrl, onClickFavorite, onPlus = false}) {
  const [isAdded, setiSAdded] = React.useState();
  const [isFavorite, setIsFavorite] = React.useState();

     const onClickPlus = () => {
      onPlus({id, title, price, imageUrl});
      setiSAdded(!isAdded);
     }

     const onFavorite = () => {
      setIsFavorite(!isFavorite);
     }

    return (
      <div className={styles.catalogMain}>
        <div className={styles.favorite} onClick={onFavorite}>
          <img src={isFavorite ? '/icon/heardike.svg' : '/icon/heardnolike.svg'}alt="Unliked"/>
        </div>
        <img width={133} height={112} src={imageUrl} alt="Sneakers"></img>
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>
            <img className={styles.plus} onClick={onClickPlus} src={isAdded ? '/icon/success.svg' : '/icon/btn-nosuccess.svg'} alt="plus"></img>
        </div>
      </div>
    )
}

export default Catalog;