import { Box, IconButton } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface AnalysisNavigationProps {
  onLapSelect: (lap: number) => void;
}

export function AnalysisNavigation({ onLapSelect }: AnalysisNavigationProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
      <IconButton
        onClick={() => navigate('/sessions')}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          color: 'white',
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <ThemeToggle />
      <IconButton
        aria-label="modify laps"
        size="large"
      >
        <TimelineIcon />
      </IconButton>
    </Box>
  );
}
