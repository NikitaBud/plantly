import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton, Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useSnackbar } from '../../context/SnackbarContext';
import { deleteUserPlant } from '../../services/userPlantsService';

const UserPlantCard = ({ plant, onDelete }) => {
  const [open, setOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this plant?');
    if (!confirmed) return;

    try {
      const res = await deleteUserPlant(plant._id);
      showSnackbar('Plant deleted successfully', 'success');
      handleClose();
      onDelete(plant._id);
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to delete plant', 'error');
    }
  };

  return (
    <>
      <Card
        sx={ {
          width: 300,
          height: 380,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          m: 1,
          boxShadow: 3,
          borderRadius: 2,
          cursor: 'pointer',
        } }
        onClick={ handleOpen }
      >
        <CardMedia
          component="img"
          height="300"
          image={ plant.species_id?.image_url || '/images/placeholder.png' }
          alt={ plant.nickname }
          sx={ { objectFit: 'cover' } }
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            { plant.nickname || plant.species_id?.name }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: { plant.location || 'N/A' }
          </Typography>
        </CardContent>
      </Card>

      <Dialog open={ open } onClose={ handleClose } fullWidth maxWidth="sm">
        <DialogTitle>
          { plant.nickname || plant.species_id?.name }
          <IconButton
            aria-label="close"
            onClick={ handleClose }
            sx={ { position: 'absolute', right: 8, top: 8 } }
          >
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography><strong>Latin name:</strong> { plant.species_id?.latin_name }</Typography>
          <Typography><strong>Light:</strong> { plant.species_id?.light_requirements }</Typography>
          <Typography><strong>Watering:</strong> { plant.species_id?.watering_frequency }</Typography>
          <Typography><strong>Humidity:</strong> { plant.species_id?.humidity_preference }</Typography>
          <Typography><strong>Toxicity:</strong> { plant.species_id?.toxicity_info }</Typography>
          <Typography mt={ 2 }><strong>Care Instructions:</strong></Typography>
          <Typography>{ plant.species_id?.care_instructions }</Typography>

          <Box mt={ 3 } textAlign="right">
            {/* TODO implement edit functionality */}
            {/*<Button*/}
            {/*  sx={ { mr: 1 }}*/}
            {/*  variant="contained"*/}
            {/*  color="secondary"*/}
            {/*  startIcon={ <EditIcon /> }*/}
            {/*  onClick={ () => console.log("edit...") }*/}
            {/*>*/}
            {/*  Edit Plant*/}
            {/*</Button>*/}
            <Button
              variant="contained"
              color="error"
              startIcon={ <DeleteIcon/> }
              onClick={ handleDelete }
            >
              Delete Plant
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserPlantCard;
