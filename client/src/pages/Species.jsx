import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SpeciesCard from '../components/plants/SpeciesCard';
import { getAllSpecies } from '../services/plantsService';

const SpeciesCatalog = () => {
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const res = await getAllSpecies();
        setSpeciesList(res.data.species);
      } catch (err) {
        console.error('Error loading species', err);
      }
    };

    fetchSpecies();
  }, []);

  return (
    <Box sx={ { p: 4 } }>
      <Typography variant="h4" gutterBottom>
        Plant Catalog
      </Typography>
      <Grid container spacing={ 2 }>
        { speciesList.map((item) => (
          <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ item._id }>
            <SpeciesCard species={ item }/>
          </Grid>
        )) }
      </Grid>
    </Box>
  );
};

export default SpeciesCatalog;