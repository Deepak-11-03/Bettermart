import React from 'react'
import style from '../styles/Home.module.css'
import Typography from '@mui/material/Typography'

function notfound() {
  return (
    <div className={style.main}>
        <Typography variant="h4" textAlign="center" sx={{paddingTop:"8rem"}} >The resouce you are looking for not found</Typography>
    </div>
  )
}

export default notfound
