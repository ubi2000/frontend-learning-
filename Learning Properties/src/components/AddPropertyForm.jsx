import { useState } from "react"
import { useDispatch } from "react-redux"
import { addProperties } from "../slices/propertySlice"
import { useNavigate } from 'react-router-dom';

const AddPropertyForm = () => {
  const dispatch = useDispatch()

  const navigate =useNavigate()
  const [propertyData, setPropertyData] = useState({
    title: "",
    size: "",
    constructionYear: "",
    heatingType: "",
    address: "",
    propertyType: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
     dispatch(addProperties(propertyData))
     navigate("/home")
    
  }

  return (
 <div>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setPropertyData({...propertyData, title: e.target.value})}
      />
      <input
        type="number"
        placeholder="Size"
        onChange={(e) => setPropertyData({...propertyData, size: e.target.value})}
      />
      <input
        type="number"
        placeholder="Construction Year"
        onChange={(e) => setPropertyData({...propertyData, constructionYear: e.target.value})}
      />
      <input
        type="text"
        placeholder="Heating Type"
        onChange={(e) => setPropertyData({...propertyData, heatingType: e.target.value})}
      />
      <input
        type="text"
        placeholder="Address"
        onChange={(e) => setPropertyData({...propertyData, address: e.target.value})}
      />
      <input
        type="text"
        placeholder="Property Type"
        onChange={(e) => setPropertyData({...propertyData, propertyType: e.target.value})}
      />
      <button onClick={(e) => handleSubmit(e)}>Add Property</button>
    
    </div>
     
      
   
  )
}

export default AddPropertyForm