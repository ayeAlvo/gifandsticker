import React, { useState, useEffect } from 'react';

const CreateGif = (props) => {
  // console.log(props.image);
  const [linea1, setLinea1] = useState('');
  const [linea2, setLinea2] = useState('');
  // const [image, setImage] = useState();
  
  // console.log(image);

  const onChangeLinea1 = e => setLinea1(e.target.value);

  const onChangeLinea2 = e => setLinea2(e.target.value);

  // const onChangeImagen = function (evento) {
  //   setImagen(evento.target.value)
  // }

  // const onClickExportar = function (evento) {
    // html2canvas(document.querySelector("#meme")).then(canvas => {
      // var img = canvas.toDataURL("image/png");
      // var link = document.createElement('a');
      // link.download = 'meme.png';
      // link.href = img;
  //     link.click();
  //   });
  // }

  const exportMeme = () => {
    alert('exportar')
  }

  return (
    <>
       <input onChange={onChangeLinea1} type="text" placeholder="Line 1" className="input mb-2 mt-2"/> <br />
      <input onChange={onChangeLinea2} type="text" placeholder="Line 2" className="input"/> <br />
      

      <div className="meme" id="meme">
        <span className="text-light line1-position">{linea1}</span> <br />
        <span className="text-light line2-position">{linea2}</span>
        <img src={props.image} className="image-choose"/>
        <p className="text-secondary">by Giphy</p>
        <button className="btn btn-outline-light mt-2 btn-search" onClick={exportMeme}>Export !</button>
      </div>
    </>
  )
}

export default CreateGif;