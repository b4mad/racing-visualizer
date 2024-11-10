import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { TrackLandmarks } from '../services/types';

interface SelectSegmentProps {
  open: boolean;
  onClose: () => void;
  landmarks: TrackLandmarks | null | undefined;
  setZoomRange: (startMeters: number, endMeters: number) => void;
}

export function SelectSegment({ open, onClose, landmarks, setZoomRange }: SelectSegmentProps) {
  if (!landmarks) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Select Track Segment</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Segments</Typography>
        <List>
          {landmarks.segments.map((segment) => (
            <ListItem key={segment.id} disablePadding>
              <ListItemButton onClick={() => {
                setZoomRange(segment.start, segment.end ?? segment.start + 100);
                onClose();
              }}>
                <ListItemText
                  primary={segment.name}
                  secondary={`Start: ${segment.start}m${segment.end ? `, End: ${segment.end}m` : ''}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" gutterBottom>Turns</Typography>
        <List>
          {landmarks.turns.map((turn) => (
            <ListItem key={turn.id} disablePadding>
              <ListItemButton onClick={() => {
                setZoomRange(turn.start, turn.end ?? turn.start + 50);
                onClose();
              }}>
                <ListItemText
                  primary={turn.name}
                  secondary={`Start: ${turn.start}m${turn.end ? `, End: ${turn.end}m` : ''}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
