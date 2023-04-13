import { Button,TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import style from '../styles/Home.module.css'

export default  function addProducts() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [product ,setProduct] =useState({
    title:"",
    brand:"",
    description:"",
    category:"",
    price:"",
    thumbnail:"",
    images:[""],
    discountPercentage:"",
    rating:"",
  })
  const[files,setFiles] =useState('')

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

 const onSubmit = async(data)=>{
  const url =  await imageUpload(files)
  data.thumbnail = url
  let api = await fetch("http://localhost:3000/api/addproduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // api = await api.json();
  // if (api) {
  //   setAlert(true);
  //   handleClose();
  // }
  // addproduct
    reset()
 }

  const imageUpload = async(file)=>{
    const formData = new FormData()
    formData.append('file',file)
    formData.append("upload_preset",'hmzl4ytu')
    formData.append('cloud_name','djpee6nuc')
    const data = await fetch('https://api.cloudinary.com/v1_1/djpee6nuc/image/upload', {
      method: 'POST',
      body: formData
    })
    let result = await data.json()
    return result.url
  }

  
  return (
    <div className={style.main}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign="center" variant='h3'>
        Add your Product
      </Typography>
      <br/>
      <TextField
         type="text"
         label="Product Title *"
         variant="outlined"
         size="small"
         margin="dense"
         autoFocus={true}
         autoComplete="off"
         name="title"
         onChange={handleInput}
         {...register("title", {
              required: true,
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Only letters allowed",
              },
            })}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
      />
      <TextField
         type="text"
         label="Product Brand *"
         variant="outlined"
         size="small"
         margin="dense"
         autoFocus={true}
         autoComplete="off"
         name="brand"
         onChange={handleInput}
         {...register("brand", {
              required: true,
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Only letters allowed",
              },
            })}
            error={Boolean(errors.brand)}
            helperText={errors.brand?.message}
      />
      <TextField
         type="text"
         label="Product description *"
         variant="outlined"
         size="small"
         margin="dense"
         autoFocus={true}
         autoComplete="off"
         name="description"
         onChange={handleInput}
         {...register("description", {
              required: true,
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Only letters allowed",
              },
            })}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
      />
      {/* <TextField
         type="number"
         label="Product price *"
         variant="outlined"
         size="small"
         margin="dense"
         name="price"
         onChange={handleInput}
         {...register("price", {
              required: true,
              pattern: {
                value: /^[0-9]*$/,
                message: "Enter right price",
              },
            })}
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
      />
      <TextField
         type="number"
         label="Product Discount in % *"
         variant="outlined"
         size="small"
         margin="dense"
         name="discountPercentage"
         onChange={handleInput}
         {...register("discountPercentage", {
              required: true,
              pattern: {
                value: /^[0-9]*$/,
                message: "Enter right discountPercentage",
              },
            })}
            error={Boolean(errors.discountPercentage)}
            helperText={errors.discountPercentage?.message}
      /> */}
      {/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={product.category}
    label="Age"
    onChange={handleInput}
  >
  {categoryList.map((item)=>(
    <MenuItem key={item} value={item}>{item}</MenuItem>
  ))}
    
  </Select>
</FormControl> */}
        <input type="file" name="thumbnail"  onChange={(e)=>setFiles(e.target.files[0])} accept="image/*"/>
        <Button type="submit" color="primary"
            variant="contained" >upload </Button>
      </form>
    </div>
  )
}
