import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Create from '../components/CreateGif';
import Paginate from '../components/Paginate';

const Giphy = () => {
  const [giphysList, setGiphysList] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUrlImage, setIsUrlImage] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = giphysList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect( () => {
    const fetchGiphysTrending = async () => {
      setIsLoading(true); //esta cargando
      try{
        const response = await axios('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: 'zoqDYlP5tILk8SUyn8SZrv5nKLxaiAE6',
            limit: 100, // solo me deja trar un maximo de 50 gif
          }
        });
        const data = response.data.data;     
        setGiphysList(data);
        console.log(data.length);
        
      }catch (err){
        setIsError(true);
        console.log(err);
        setTimeout(() => setIsError(false), 4000);
      }     
     
      setIsLoading(false);
    }
    fetchGiphysTrending();
  }, [])
  // console.log(giphysList);

  const renderGifs = () => {
    if(isLoading){
      return <Loader />  
    }

    return currentItems.map(gif => {
      return (
        <div className="gif" key={gif.id}>
          <img src={gif.images.fixed_height.url} onClick={urlImage} className="choose" />
          {/* <img src={gif.images.original.url} onClick={urlImage} className="choose"/> */}
        </div>
      )
    })
  };

  const renderError = () => {
    if(isError){
      return (
      <>
        <div className="alert alert-danger" role="alert">
          Please try again in a few minutes!
        </div>
      </>
      )
    }
  };

  const searchChange = e => setSearch(e.target.value);

  const searchGifs = async e => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    
    try {
      const response = await axios('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: 'zoqDYlP5tILk8SUyn8SZrv5nKLxaiAE6',
          q: search,
          limit: 100
        }
      });
      const data = response.data.data;     
      setGiphysList(data);
    } catch (err){
      setIsError(true);
      console.log(err);
      setTimeout(() => setIsError(false), 4000);
    }
    setIsLoading(false);  
  };

  const pageSelected = pageNumber => {
    setCurrentPage(pageNumber);
  }

  // const imageChoose = document.querySelector('.choose');
  const urlImage = e => {
    // console.log(e.target.src);
    setIsUrlImage(e.target.src);
    // console.log(isUrlImage);
  }

  return (
    <>
    <Create image={isUrlImage ? isUrlImage : "https://res.cloudinary.com/beumsk/image/upload/v1520544016/giphy-logo-6611-s-_vme7aa.png"}/>
    <div className="m-2">
      {renderError()}

      <form action="" className="form-inline justify-content-center m-3 d-flex">
        <input type="text" placeholder="Search" className="input" value={search} onChange={searchChange} />
        <button type="submit" className="btn btn-outline-light mx-2 btn-search" onClick={searchGifs} >Filter</button>
      </form>

      <Paginate pageSelected={pageSelected} currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={giphysList.length}/>

      <a href="#meme" className="btnUp"><i className="fa-solid fa-angles-up"></i></a>
      <div className="container-md gifs">{renderGifs()}</div>
    </div>
    </>
  )
}

export default Giphy;