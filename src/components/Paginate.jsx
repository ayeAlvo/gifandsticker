import React from 'react';

const Paginate = props => {
  // console.log(props);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++){
    pageNumbers.push(i);
  }

  return (<div>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                
                {pageNumbers.map((number, i) => {
                  let classes = 'page-item';
                  if(number === props.currentPage){
                    classes += ' active';
                    // classList.add("active")
                  }
                  return (
                    <li key={i} className={classes}><a onClick={() => props.pageSelected(number)} className="page-link" href="#">{number}</a></li>
                  )
                })}               
          
              </ul>
          </nav>
        </div>)
}

export default Paginate;