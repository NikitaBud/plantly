import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useSnackbar } from '../context/SnackbarContext';
import axios from '../services/axios';

const EditPlantDialog = ({ open, plant, onClose }) => {
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (plant) {
      setNickname(plant.nickname || '');
      setLocation(plant.location || '');
    }
  }, [plant]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `/user-plants/${plant._id}`,
        { nickname, location },
        { withCredentials: true }
      );
      showSnackbar('Plant updated successfully');
      onClose(res.data.plant);
    } catch (err) {
      console.error(err);
      showSnackbar('Error updating plant', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Plant</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              fullWidth
            />
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditPlantDialog;
