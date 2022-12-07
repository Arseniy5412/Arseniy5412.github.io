import styles from './Drawer.module.scss';
import React from 'react';


function Drawer({ onClickClose, onRemove, items = [], opened }) {
    return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
        <div className={styles.drawer}>
        <h2 className=" d-flex justify-between mb-30">
          Корзина <img onClick={onClickClose} className="removeBtn cu-p" src="/icon/remove.svg" alt="remove" />
        </h2>
            
        {
            items.length > 0 ? <div className="items">
            {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                     <div 
                        style={{ backgroundImage: `url(${obj.imageUrl})`}} 
                        className="cartItemImg"></div> 

                    <div className="mr-20 flex">
                        <p className="mb-5">{obj.title}</p>
                        <b>{obj.price} руб.</b> 
                    </div>
                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/icon/remove.svg" alt="remove" /> 
                </div> 
            ))}
            <div className="cartTotalBlock">
            <ul>
                <li>
                <span>Итого:</span>
                <div></div>
                <b>21 498 руб. </b>
                </li>
                <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>1074 руб. </b>
                </li>
            </ul>
            <button className="blackButton">Оформить заказ <img src="/icon/arrow.svg" alt="Arrow"/></button>
            </div> 
            </div> :  <div className="cartEmply d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width='120px' height='120px' src="/icon/cart-emply.svg" alt="cartemply"></img>
            <h2>Корзина пустая</h2>
            <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button onClick={onClickClose} className="blackButton">
               <img src="/icon/arrow.svg" alt="arrow"/>
                Вернуться назад
            </button>
        </div>
        }        
    </div>
   </div>
)}

export default Drawer;