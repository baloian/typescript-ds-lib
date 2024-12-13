export interface Graph<V, W> {
  addVertex(vertex: V): void;
  removeVertex(vertex: V): void;
  addEdge(from: V, to: V, weight?: W): void;
  removeEdge(from: V, to: V): void;
  getNeighbors(vertex: V): V[];
  getEdgeWeight(from: V, to: V): W;
  getVertices(): V[];
  hasVertex(vertex: V): boolean;
  hasEdge(from: V, to: V): boolean;
  vertexCount(): number;
  edgeCount(): number;
  clear(): void;
}
