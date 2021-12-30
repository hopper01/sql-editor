import { CircularProgress, Box } from '@mui/material';

const Loader = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <CircularProgress />
      </Box>
    </>
  );
};

export default Loader;
