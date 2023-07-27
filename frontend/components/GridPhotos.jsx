import React from 'react'

const GridPhotos = ({datas}) => {
  return (
    <div>
      <h1>Our Art Gallery</h1>
        {datas.map(({desc, photo, _id}) => (
          <div key={_id} >
            <h3>{desc}</h3>
            <img alt='logod' src={`http://localhost:5000/uploads/${photo}`} />
          </div>
        ))}
    </div>
  )
}

export default GridPhotos
