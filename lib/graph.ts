import { GraphWeight } from '../types';


export interface Graph<T> {
  addVertex(vertex: T): void;
  removeVertex(vertex: T): void;
  addEdge(from: T, to: T, weight?: GraphWeight): void;
  removeEdge(from: T, to: T): void;
  getNeighbors(vertex: T): T[];
  getEdgeWeight(from: T, to: T): GraphWeight;
  getVertices(): T[];
  hasVertex(vertex: T): boolean;
  hasEdge(from: T, to: T): boolean;
  vertexCount(): number;
  edgeCount(): number;
  clear(): void;
}

