export interface SimpleOptions {
  title: string;
  traceOptions: TraceOptions
}

export interface TraceOptions {
  traces: Trace[];
  currentTrace: Trace;
}

export interface Trace {
  name: string;
  x: string;
  y: string;
  groupby: string;
  [key: string]: any;
}
