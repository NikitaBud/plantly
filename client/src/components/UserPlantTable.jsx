import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, TableSortLabel, IconButton, Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditPlantDialog from './EditPlantDialog';
import { useSnackbar } from '../context/SnackbarContext';
import { useState } from 'react';

const columns = [
  { id: 'nickname', label: 'Nickname' },
  { id: 'species', label: 'Species' },
  { id: 'location', label: 'Location' },
  { id: 'date_added', label: 'Date Added' },
  { id: 'watering_frequency', label: 'Watering' },
  { id: 'light_requirements', label: 'Light' },
  { id: 'humidity_preference', label: 'Humidity' },
  { id: 'toxicity_info', label: 'Toxicity' },
  { id: 'actions', label: 'Actions' }
];

const UserPlantTable = ({ plants, onDelete, onUpdate }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'nickname', direction: 'asc' });
  const [editingPlant, setEditingPlant] = useState(null);
  const { showSnackbar } = useSnackbar();

  const handleSort = (columnId) => {
    if (sortConfig.key === columnId) {
      setSortConfig({ key: columnId, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortConfig({ key: columnId, direction: 'asc' });
    }
  };

  const handleEdit = (plant) => {
    setEditingPlant(plant);
  };

  const handleDeleteClick = (plantId) => {
    const confirmed = window.confirm('Are you sure you want to delete this plant?');
    if (confirmed) {
      onDelete?.(plantId);
      showSnackbar('Plant deleted');
    }
  };

  const handleEditClose = () => setEditingPlant(null);

  const getCellValue = (plant, key) => {
    if (key === 'species') return plant.species_id?.name || '';
    if (key === 'watering_frequency') return plant.species_id?.watering_frequency || '';
    if (key === 'light_requirements') return plant.species_id?.light_requirements || '';
    if (key === 'humidity_preference') return plant.species_id?.humidity_preference || '';
    if (key === 'toxicity_info') return plant.species_id?.toxicity_info || '';
    if (key === 'date_added') return new Date(plant.date_added);
    return plant[key] || '';
  };

  const sortedPlants = [...plants].sort((a, b) => {
    const key = sortConfig.key;
    const dir = sortConfig.direction === 'asc' ? 1 : -1;

    const aValue = getCellValue(a, key);
    const bValue = getCellValue(b, key);

    if (aValue < bValue) return -1 * dir;
    if (aValue > bValue) return 1 * dir;
    return 0;
  });

  if (!plants.length) {
    return <Typography align="center">No plants found.</Typography>;
  }

  return (
    <>
      <TableContainer component={ Paper }>
        <Table size="small">
          <TableHead>
            <TableRow>
              { columns.map(col => (
                <TableCell key={ col.id }>
                  { col.id !== 'actions' ? (
                    <TableSortLabel
                      active={ sortConfig.key === col.id }
                      direction={ sortConfig.key === col.id ? sortConfig.direction : 'asc' }
                      onClick={ () => handleSort(col.id) }
                    >
                      { col.label }
                    </TableSortLabel>
                  ) : (
                    col.label
                  ) }
                </TableCell>
              )) }
            </TableRow>
          </TableHead>

          <TableBody>
            { sortedPlants.map((plant) => (
              <TableRow key={ plant._id }>
                <TableCell>{ plant.nickname }</TableCell>
                <TableCell>{ plant.species_id?.name }</TableCell>
                <TableCell>{ plant.location }</TableCell>
                <TableCell>{ new Date(plant.date_added).toLocaleDateString() }</TableCell>
                <TableCell>{ plant.species_id?.watering_frequency }</TableCell>
                <TableCell>{ plant.species_id?.light_requirements }</TableCell>
                <TableCell>{ plant.species_id?.humidity_preference }</TableCell>
                <TableCell>{ plant.species_id?.toxicity_info }</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={ () => handleEdit(plant) }>
                      <EditIcon fontSize="inherit"/>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={ () => handleDeleteClick(plant._id) }
                    >
                      <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>

      <EditPlantDialog
        open={ !!editingPlant }
        plant={ editingPlant }
        onClose={ (updatedPlant) => {
          if (updatedPlant) {
            setEditingPlant(null);
            onUpdate((prev) =>
              prev.map((p) => (p._id === updatedPlant._id ? updatedPlant : p))
            );
          } else {
            setEditingPlant(null);
          }
        } }
      />
    </>
  );
};

export default UserPlantTable;
