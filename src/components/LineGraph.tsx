import { TelemetryPoint, TelemetryCacheEntry, AnalysisData } from '../services/types';
import { ZoomState } from './types';
import { ChartLineGraph } from './ChartLineGraph';

interface DataKeyConfig {
  key: keyof TelemetryPoint;
  name: string;
  color: string;
}

interface BaseGraphProps {
  lapsData: { [lapNumber: number]: TelemetryCacheEntry };
  zoomState: ZoomState;
  showBrush?: boolean;
  onZoomChange?: (startMeters: number, endMeters: number) => void;
  analysisData?: AnalysisData;
  visibleAnnotations: (null|string)[];
}

interface LineGraphProps extends BaseGraphProps {
  dataKeys: DataKeyConfig[];
  unit?: string;
  stepLine?: boolean;
  title?: string;
}

const GRAPH_CONFIGS = {
  speed: {
    dataKeys: [{ key: "speed" as keyof TelemetryPoint, name: "Speed", color: "#2196f3" }],
    unit: "Speed km/h"
  },
  pedals: {
    dataKeys: [
      { key: "throttle" as keyof TelemetryPoint, name: "Throttle", color: "#4caf50" },
      { key: "brake" as keyof TelemetryPoint, name: "Brake", color: "#f44336" },
      { key: "handbrake" as keyof TelemetryPoint, name: "Handbrake", color: "#ff9800" }
    ],
    unit: "%"
  },
  throttle: {
    dataKeys: [{ key: "throttle" as keyof TelemetryPoint, name: "Throttle", color: "#4caf50" }],
    unit: "Throttle %"
  },
  brake: {
    dataKeys: [{ key: "brake" as keyof TelemetryPoint, name: "Brake", color: "#f44336" }],
    unit: "Brake %"
  },
  handbrake: {
    dataKeys: [{ key: "handbrake" as keyof TelemetryPoint, name: "Handbrake", color: "#ff9800" }],
    unit: "Handbrake %"
  },
  gear: {
    dataKeys: [{ key: "gear" as keyof TelemetryPoint, name: "Gear", color: "#9c27b0" }],
    unit: "Gear",
    stepLine: true
  },
  delta: {
    dataKeys: [{ key: "delta" as keyof TelemetryPoint, name: "Delta Time", color: "#ff4081" }],
    unit: "Delta s"
  },
  lapTime: {
    dataKeys: [{ key: "lapTime" as keyof TelemetryPoint, name: "Lap Time", color: "#00bcd4" }],
    unit: "Time s"
  }
};

export function SpeedGraph(props: BaseGraphProps) {
  return <LineGraph {...props} {...GRAPH_CONFIGS.speed} />;
}

export function PedalsGraph(props: BaseGraphProps) {
  return <LineGraph {...props} {...GRAPH_CONFIGS.pedals} />;
}

export function ThrottleGraph(props: BaseGraphProps) {
  return <LineGraph {...props} {...GRAPH_CONFIGS.throttle} />;
}

export function BrakeGraph(props: BaseGraphProps) {
  return <LineGraph {...props} {...GRAPH_CONFIGS.brake} />;
}

export function HandbrakeGraph(props: BaseGraphProps) {
  return <LineGraph {...props} {...GRAPH_CONFIGS.handbrake} />;
}

export function GearGraph(props: BaseGraphProps) {
  return <LineGraph {...props} {...GRAPH_CONFIGS.gear} />;
}

export function DeltaGraph(props: BaseGraphProps) {
  return <LineGraph {...props} {...GRAPH_CONFIGS.delta} />;
}

export function LapTimeGraph(props: BaseGraphProps) {
  return <LineGraph {...props} {...GRAPH_CONFIGS.lapTime} />;
}

export function LineGraph({ lapsData, dataKeys, unit = '', stepLine = false, title, zoomState, onZoomChange, analysisData, visibleAnnotations }: LineGraphProps) {
  return (
    <ChartLineGraph
      lapsData={lapsData}
      dataKeys={dataKeys}
      unit={unit}
      stepLine={stepLine}
      title={title}
      zoomState={zoomState}
      onZoomChange={onZoomChange}
      analysisData={analysisData}
      visibleAnnotations={visibleAnnotations}
    />
  );
}
