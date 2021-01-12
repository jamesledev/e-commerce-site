import React, {useState, useEffect} from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import { useForm, FormProvider} from 'react-hook-form';
import {commerce} from '../../lib/commerce';

import CustomTextField from './CustomTextField';

//react hook form, less total re renders
const AddressForm = ({checkoutToken}) => {
  const methods = useForm();

    
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivitions, setshippingSubdivitions] = useState([]);
  const [shippingSubdivition, setshippingSubdivition] = useState('');
  const [shippingOptions, setshippingOptions] = useState([]);
  const [shippingOption, setshippingOption] = useState('');
  
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))

  const fetchShippingCountries = async (checkoutTokenId) => {
    const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
    console.log(countries)
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0])
    // as its an object not arrau
  }
  const fetchSubdivision = async (countryCode) => {
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

    setshippingSubdivitions(subdivisions)
    setshippingSubdivition(Object.keys(subdivisions)[0])
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  useEffect(() => {
    if(shippingCountry) fetchSubdivision(shippingCountry)
  }, [shippingCountry])
// in the [] is a dependency

  return (
    <>
      <Typography variant='h6' gutterBottom></Typography>
      <FormProvider {...methods}>
        <form onSubmit=''>
          <Grid container spacing={3}>
            <CustomTextField required name='firstName' label='First Name'/>
            <CustomTextField required name='lastName' label='Last Name'/>
            <CustomTextField required name='address1' label='Address'/>
            <CustomTextField required name='email' label='Email'/>
            <CustomTextField required name='city' label='City'/>
            <CustomTextField required name='zip' label='Zip Code'/>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map((country) => (<MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
                ))}
              </Select>
            </Grid>
            {/*<Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
