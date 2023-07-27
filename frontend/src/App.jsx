import { useEffect, useState } from "react";
import axios from "axios";
import GridPhotos from "../components/GridPhotos";

export default function App() {
  const initial = {
    desc: '',
    photo: '',
};
  
const [formData, formDataSet] = useState(initial);
const [data, setData] = useState([]);
const [updateUI, setUpdateUI] = useState(false)
// console.log(formData)

const handleImageChange = (event,index) => {
  const {files} = event.target;
  formDataSet({...formData, photo:files[index]})
}

const handleChange = (event) => {
  const { name, value} = event.target;
  formDataSet({
    ...formData,
  [name]:value
  })
}

  const onSubmit = async(e) => {
    e.preventDefault();
    const formDatas = new FormData()
    formDatas.append('photo', formData.photo)
    formDatas.append('desc', formData.desc)
    axios.post("http://localhost:5000/api/save",  formDatas)
    .then(res => {
      console.log(res.data);
      setUpdateUI(prev => !prev)
      formDataSet(initial)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/get")
    .then(res => {
      console.log(res.data);
      setData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [updateUI])
    
      // for just single file
  
  // const handleChange = (e) => {
  //   e.preventDefault(); 

  //   const formData = new FormData()
  //   formData.append('photo', e.target.files[0])

  //   axios.post("http://localhost:5000/api/save", formData)
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

 
  return (
    <div className="p-40">
        <form onSubmit={onSubmit}>
        <label htmlFor="Upload file ">
          <p>upload files here</p>
          <input type='file' placeholder="Upload file" id='image'
            // onChange={e => handleChange(e)} 
            multiple
            name='photo'
            accept='image/*' 
                    //  value={formData.image}
            onChange={event => handleImageChange(event, 0)}
          />
        </label>
        <label htmlFor="Description">
          <p>Description</p>
          <textarea  col='20' rows='4' id="desc"
            placeholder="image description" 
            name='desc' 
            value={formData.desc}
           onChange={e => handleChange(e)}
            className="border-2 border-gray-800"
          />
        </label> <br />

        <button type='submit'
        className="px-3 py-2 text-white bg-black rounded-lg">
        Submit
      </button>  
        </form>    
        {/* Display datas her */}
        <GridPhotos datas={data} />
   
       
    </div>
  )
}