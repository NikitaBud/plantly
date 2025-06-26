import { Alert, Box, Button, Card, CardContent, CardMedia, Snackbar, Typography } from '@mui/material';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';
import AddPlantModal from './AddPlantModal';
import { useState } from 'react';
import { useSnackbar } from '../context/SnackbarContext';

const SpeciesCard = ({ species }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleAdd = async ({ nickname, location }) => {
    try {
      await axios.post(
        '/user-plants',
        {
          species_id: species._id,
          nickname: nickname || species.name,
          location
        },
        { withCredentials: true }
      );
      setModalOpen(false);
      showSnackbar(`${species.name} added successfully!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to add plant', err);
      showSnackbar('Something went wrong while adding plant.', 'error');
    }
  };

  return (
    <>
      <Card>
        { species.image_url && (
          <CardMedia
            component="img"
            height="160"
            image={ species.image_url }
            alt={ species.name }
          />
        ) }
        <CardContent>
          <Typography variant="h6">{ species.name }</Typography>
          <Typography variant="body2" color="text.secondary">
            Light: { species.light_requirements } | Water: { species.watering_frequency }
          </Typography>
          <Box mt={ 2 }>
            <Button variant="contained" onClick={ () => setModalOpen(true) }>
              Add to My Plants
            </Button>
          </Box>
        </CardContent>
      </Card>

      <AddPlantModal
        open={ modalOpen }
        onClose={ () => setModalOpen(false) }
        onSubmit={ handleAdd }
        species={ species }
      />

    </>
  );
};

export default SpeciesCard;