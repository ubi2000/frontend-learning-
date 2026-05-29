
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import { getProperties } from './../slices/propertySlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate() 
  const dispatch=useDispatch()
  const properties =useSelector((state)=>state.properties.property)

   const status = useSelector((state) => state.properties.status)


  useEffect(() => {
    if(status === "idle") {
      dispatch(getProperties())
    }
  }, [])

  if(status === "loading") return <div>Loading...</div>
  return (
    <div >
      <h1>Properties</h1>
      <button onClick={() => navigate("/add-property")}>Add Property</button>
      {properties && properties.map((property) => (
        <div key={property._id}>
          <h3>{property.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default HomePage