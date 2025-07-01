import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';

const AddPlantModal = ({ open, onClose, onSubmit, species }) => {
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    onSubmit({ nickname, location });
    setNickname('');
    setLocation('');
  };

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Add "{ species?.name }" to My Plants</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Nickname"
          value={ nickname }
          onChange={ (e) => setNickname(e.target.value) }
        />
        <TextField
          fullWidth
          margin="normal"
          label="Location"
          value={ location }
          onChange={ (e) => setLocation(e.target.value) }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>Cancel</Button>
        <Button variant="contained" onClick={ handleSubmit }>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlantModal;
