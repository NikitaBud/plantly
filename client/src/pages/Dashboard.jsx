import { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, IconButton, MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserPlantCard from '../components/plants/UserPlantCard';
import UserPlantTable from '../components/plants/UserPlantTable';
import GridViewIcon from '@mui/icons-material/GridView';
import TableViewIcon from '@mui/icons-material/TableView';
import { getCurrentUser } from '../services/authService';
import { getUserPlants } from '../services/userPlantsService';

const Dashboard = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [userName, setUserName] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const user = await getCurrentUser();
      setUserName(user.data.user.name);
      const plants = await getUserPlants();
      setUserPlants(plants.data.plants);
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = userPlants.filter((plant) => {
      const matchesSearch =
        plant.nickname?.toLowerCase().includes(search.toLowerCase()) ||
        plant.species_id?.name?.toLowerCase().includes(search.toLowerCase());

      const matchesLocation = locationFilter
        ? plant.location === locationFilter
        : true;

      const matchesSpecies = speciesFilter
        ? plant.species_id?.name === speciesFilter
        : true;

      return matchesSearch && matchesLocation && matchesSpecies;
    });

    setFilteredPlants(filtered);
  }, [search, locationFilter, speciesFilter, userPlants]);

  const handleDelete = (deletedId) => {
    setUserPlants(prev => prev.filter(plant => plant._id !== deletedId));
  };

  return (
    <Box sx={ { p: 4 } }>
      <Box sx={ {
        display: 'flex',
        justifyContent: 'space-between',
        mb: 4,
        alignItems: 'center',
      } }>
        <Typography variant="h4">Welcome, { userName }!</Typography>
        <IconButton onClick={ () => setViewMode(viewMode === 'grid' ? 'table' : 'grid') }>
          { viewMode === 'grid' ? <TableViewIcon/> : <GridViewIcon/> }
        </IconButton>
      </Box>

      <Button variant="contained" onClick={ () => navigate('/species') } sx={ { mb: 3 } }>
        Add Plant
      </Button>

      <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 } }>
        <TextField
          label="Search"
          value={ search }
          onChange={ (e) => setSearch(e.target.value) }
          variant="outlined"
          size="small"
        />
        <TextField
          label="Filter by Location"
          select
          value={ locationFilter }
          onChange={ (e) => setLocationFilter(e.target.value) }
          size="small"
          sx={ { minWidth: 160 } }
        >
          <MenuItem value="">All</MenuItem>
          { [...new Set(userPlants.map(p => p.location))].map(loc => (
            <MenuItem key={ loc } value={ loc }>{ loc }</MenuItem>
          )) }
        </TextField>
        <TextField
          label="Filter by Species"
          select
          value={ speciesFilter }
          onChange={ (e) => setSpeciesFilter(e.target.value) }
          size="small"
          sx={ { minWidth: 160 } }
        >
          <MenuItem value="">All</MenuItem>
          { [...new Set(userPlants.map(p => p.species_id?.name))].map(spec => (
            <MenuItem key={ spec } value={ spec }>{ spec }</MenuItem>
          )) }
        </TextField>
      </Box>


      { viewMode === 'grid' ? (
        <Grid container justifyContent="center">
          { filteredPlants.map(plant => (
            <UserPlantCard key={ plant._id } plant={ plant } onDelete={ handleDelete }/>
          )) }
        </Grid>
      ) : (
        <UserPlantTable
          plants={ filteredPlants }
          onDelete={ handleDelete }
          onUpdate={ (updatedPlant) => {
            setUserPlants((prev) =>
              prev.map((plant) =>
                plant._id === updatedPlant._id ? updatedPlant : plant
              )
            );
          } }
        />
      ) }
    </Box>
  );
};

export default Dashboard;
