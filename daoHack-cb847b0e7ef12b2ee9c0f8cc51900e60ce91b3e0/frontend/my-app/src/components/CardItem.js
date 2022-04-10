import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CardItem(props) {
  const navigate=useNavigate();
  const toProject=()=>{
    navigate('/Project',{state:{id:1,name:'test'}});
  }
  return (
    <>
      <li className='cards__item'>
        
        <Link className='cards__item__link' to={props.path+props.id}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          
          <div className='cards__item__info'>
            <h3>Title</h3>
            <h4>Address</h4>
            <h5 className='cards__item__text'>{props.text}</h5>
            <p align='center'><button className="invBtn">Investment Proposal</button></p>
          </div>
          
        </Link>
        
        
      </li>
      
    </>
  );
}

export default CardItem;
