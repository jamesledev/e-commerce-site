import React from 'react'
import {Grid, CircularProgress} from '@material-ui/core'

import Product from './Product/Product'
import useStyles from './styles'




const Products =  ({products, onAddToCart}) => {
  const classes = useStyles();

  return (
  <main className={classes.content}>
    <div className={classes.toolbar} />
    <div> {products.length ?
    <Grid container justify='center' spacing={4} alignItems="center">
      {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            {/* xs sm md lg  talking about device size*/}
            <Product product={product} onAddToCart={onAddToCart}/>
          
            </Grid>
      ))}
    </Grid>
    : <div className={classes.spinner}>
    <CircularProgress />
    </div> } </div>
  </main>

  )
};

export default Products