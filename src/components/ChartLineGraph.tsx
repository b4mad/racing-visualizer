import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { TelemetryPoint, TelemetryCacheEntry } from '../services/types';
import { ZoomState } from './types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

interface DataKeyConfig {
  key: keyof TelemetryPoint;
  name: string;
  color: string;
}

interface ChartLineGraphProps {
  lapsData: { [lapNumber: number]: TelemetryCacheEntry };
  dataKeys: DataKeyConfig[];
  unit?: string;
  stepLine?: boolean;
  title?: string;
  zoomState: ZoomState;
  onZoomChange?: (start: number, end: number) => void;
}

export function ChartLineGraph({
  lapsData,
  dataKeys,
  unit = '',
  stepLine = false,
  title,
  zoomState,
  onZoomChange
}: ChartLineGraphProps) {
  const theme = useTheme();
  const getLapColor = (lapIndex: number, baseColor: string) => {
    const opacity = 1 - (lapIndex * 0.3);
    return baseColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
  };

  const chartData = {
    datasets: Object.entries(lapsData).flatMap(([lapNumber, lapData]) =>
      dataKeys.map((config) => ({
        label: `${config.name} - Lap ${lapNumber}`,
        data: lapData.points.map(point => ({
          x: point.distance,
          y: point[config.key] as number
        })),
        borderColor: getLapColor(parseInt(lapNumber), config.color),
        backgroundColor: getLapColor(parseInt(lapNumber), config.color),
        borderWidth: 1.5,
        pointRadius: 0,
        tension: stepLine ? 0 : 0.4,
        stepped: stepLine ? true : undefined
      }))
    )
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Distance (m)',
          color: theme.palette.chart?.text
        },
        grid: {
          color: theme.palette.chart?.grid
        },
        ticks: {
          color: theme.palette.chart?.text
        },
        min: typeof zoomState.left === 'number' ? zoomState.left : parseFloat(zoomState.left),
        max: typeof zoomState.right === 'number' ? zoomState.right : parseFloat(zoomState.right)
      },
      y: {
        title: {
          display: true,
          text: unit,
          color: theme.palette.chart?.text
        },
        grid: {
          color: theme.palette.chart?.grid
        },
        ticks: {
          color: theme.palette.chart?.text
        },
        min: 0,
        max: dataKeys[0].key === 'speed' ? 250 : undefined
      }
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
          onZoomComplete: (context: any) => {
            if (onZoomChange) {
              const {min, max} = context.chart.scales.x;
              onZoomChange(min, max);
            }
          }
        },
        pan: {
          enabled: true,
          mode: 'x',
          onPanComplete: (context: any) => {
            if (onZoomChange) {
              const {min, max} = context.chart.scales.x;
              onZoomChange(min, max);
            }
          }
        },
      },
      title: {
        display: !!title,
        text: title || '',
        position: 'top',
        align: 'start',
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      },
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="graph-container" style={{ width: '100%', height: '200px', position: 'relative' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
