import React from 'react'; 
 
const Card = ({ img, handleLike, handleRemove, handleImageClick }) => { 
  return ( 
    <div className={` card ${img.liked ? 'liked' : ''}` } key={img.id}> 
      <img 
        className="card-img-top" 
        src={img.url} 
        alt={img.description} 
        data-id={img.id} 
        onClick={handleImageClick} 
      /> 
 
      <div className="card-body"> 
        <h5 className="card-title">{img.description}</h5> 
        <p className="card-author">Author: {img.author}</p> 
        <p className="card-comments">Comments: {img.comments}</p> 
        <div className="button-row"> 
          <button className={ `btn btn-primary ${img.liked ? 'liked' : ''}` } onClick={handleLike} data-id={img.id}> 
            {img.liked ? 'Не нравится' : 'Нравится'} 
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4OgSJ33xvgxi0_UdlLoj4DFGFn3Ak5DZFb1hDdlW0M3bAGINXDQ1-5MU-0k_TCiykJ4I&usqp=CAU'
            width='20px'></img>
          </button> 
          <button className="btn btn-danger" onClick={handleRemove} data-id={img.id}> 
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD_iopZQQUkUJvCZHh3ddsE0X8_2nr_DXb8CytR0fo_ej6UWM7NPyLtAlxeITQ9BEwwe4&usqp=CAU'
          width='20px'></img>
          </button> 
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default Card; 