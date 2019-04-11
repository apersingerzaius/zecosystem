export type d3Node = {
  id: string;
  group: number;
  x: number;
  y: number;
  fx: number;
  fy: number;
};

export type d3Link = {
  source: string,
  target: string,
  value: number
};

export type d3Graph = {
  nodes: d3Node[],
  links: d3Link[]
};

export type node = {
  id: string,
  group: number,
  size: number
};

export type link = {
  source: string,
  target: string,
  value: string
};
