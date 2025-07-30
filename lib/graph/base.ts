import { BaseCollection } from '../base-collection';

/**
 * Base class for Graph data structure implementations.
 * Provides common functionality that can be extended by specific implementations
 * like LinkedList-based or Matrix-based graphs.
 */
export abstract class BaseGraph<V, W = number> extends BaseCollection<V> {
  protected vertices: Set<V>;
  protected vertexToIndex: Map<V, number>;
  protected indexToVertex: Map<number, V>;
  protected nextVertexIndex: number;

  constructor() {
    super();
    this.vertices = new Set<V>();
    this.vertexToIndex = new Map<V, number>();
    this.indexToVertex = new Map<number, V>();
    this.nextVertexIndex = 0;
  }

  /**
   * Adds a vertex to the graph.
   * @param vertex - The vertex to add
   */
  addVertex(vertex: V): void {
    if (!this.vertices.has(vertex)) {
      this.vertices.add(vertex);
      this.vertexToIndex.set(vertex, this.nextVertexIndex);
      this.indexToVertex.set(this.nextVertexIndex, vertex);
      this.nextVertexIndex++;
      this.onVertexAdded(vertex);
    }
  }

  /**
   * Removes a vertex from the graph and all its associated edges.
   * @param vertex - The vertex to remove
   */
  removeVertex(vertex: V): void {
    if (this.vertices.has(vertex)) {
      const vertexIndex = this.vertexToIndex.get(vertex)!;
      
      // Remove all edges connected to this vertex
      this.getVertices().forEach(otherVertex => {
        if (otherVertex !== vertex) {
          this.removeEdge(vertex, otherVertex);
          this.removeEdge(otherVertex, vertex);
        }
      });

      // Remove from tracking collections
      this.vertices.delete(vertex);
      this.indexToVertex.delete(vertexIndex);
      this.vertexToIndex.delete(vertex);

      this.onVertexRemoved(vertex, vertexIndex);
    }
  }

  /**
   * Adds an edge between two vertices with an optional weight.
   * @param from - The source vertex
   * @param to - The destination vertex
   * @param weight - The weight of the edge (default: 1)
   */
  addEdge(from: V, to: V, weight: W = 1 as W): void {
    if (!this.vertices.has(from)) {
      this.addVertex(from);
    }
    if (!this.vertices.has(to)) {
      this.addVertex(to);
    }
    if (from !== to) {
      this.onEdgeAdded(from, to, weight);
    }
  }

  /**
   * Removes an edge between two vertices.
   * @param from - The source vertex
   * @param to - The destination vertex
   */
  removeEdge(from: V, to: V): void {
    if (this.vertices.has(from) && this.vertices.has(to)) {
      this.onEdgeRemoved(from, to);
    }
  }

  /**
   * Gets all neighbors of a vertex.
   * @param vertex - The vertex to get neighbors for
   * @returns Array of neighboring vertices
   */
  getNeighbors(vertex: V): V[] {
    if (!this.vertices.has(vertex)) {
      return [];
    }
    return this.onGetNeighbors(vertex);
  }

  /**
   * Gets the weight of an edge between two vertices.
   * @param from - The source vertex
   * @param to - The destination vertex
   * @returns The weight of the edge, or undefined if no edge exists
   */
  getEdgeWeight(from: V, to: V): W | undefined {
    if (!this.vertices.has(from) || !this.vertices.has(to)) {
      return undefined;
    }
    return this.onGetEdgeWeight(from, to);
  }

  /**
   * Gets all vertices in the graph.
   * @returns Array of all vertices
   */
  getVertices(): V[] {
    return Array.from(this.vertices);
  }

  /**
   * Checks if a vertex exists in the graph.
   * @param vertex - The vertex to check
   * @returns True if the vertex exists, false otherwise
   */
  hasVertex(vertex: V): boolean {
    return this.vertices.has(vertex);
  }

  /**
   * Checks if an edge exists between two vertices.
   * @param from - The source vertex
   * @param to - The destination vertex
   * @returns True if the edge exists, false otherwise
   */
  hasEdge(from: V, to: V): boolean {
    if (!this.vertices.has(from) || !this.vertices.has(to)) {
      return false;
    }
    return this.onHasEdge(from, to);
  }

  /**
   * Returns the number of vertices in the graph.
   * @returns The number of vertices
   */
  vertexCount(): number {
    return this.vertices.size;
  }

  /**
   * Returns the number of edges in the graph.
   * @returns The number of edges
   */
  edgeCount(): number {
    return this.onGetEdgeCount();
  }

  /**
   * Clears all vertices and edges from the graph.
   */
  clear(): void {
    this.vertices.clear();
    this.vertexToIndex.clear();
    this.indexToVertex.clear();
    this.nextVertexIndex = 0;
    this.onClear();
  }

  /**
   * Returns the number of elements (vertices) in the graph.
   * @returns The number of vertices
   */
  size(): number {
    return this.vertexCount();
  }

  /**
   * Checks if the graph is empty.
   * @returns True if the graph has no vertices, false otherwise
   */
  isEmpty(): boolean {
    return this.vertices.size === 0;
  }

  /**
   * Checks if this graph equals another graph.
   * @param other - The other graph to compare with
   * @returns True if the graphs are equal, false otherwise
   */
  equals(other: BaseGraph<V, W>): boolean {
    if (!(other instanceof BaseGraph)) {
      return false;
    }
    if (this.vertexCount() !== other.vertexCount()) {
      return false;
    }

    const thisVertices = this.getVertices();
    const otherVertices = other.getVertices();

    // Check if all vertices exist in both graphs
    for (const vertex of thisVertices) {
      if (!other.hasVertex(vertex)) {
        return false;
      }
    }

    // Check if all edges exist in both graphs
    for (const from of thisVertices) {
      for (const to of thisVertices) {
        if (this.hasEdge(from, to) !== other.hasEdge(from, to)) {
          return false;
        }
        if (this.hasEdge(from, to)) {
          const thisWeight = this.getEdgeWeight(from, to);
          const otherWeight = other.getEdgeWeight(from, to);
          if (thisWeight !== otherWeight) {
            return false;
          }
        }
      }
    }

    return true;
  }

  /**
   * Gets the index of a vertex.
   * @param vertex - The vertex to get the index for
   * @returns The index of the vertex, or -1 if not found
   */
  protected getVertexIndex(vertex: V): number {
    return this.vertexToIndex.get(vertex) ?? -1;
  }

  /**
   * Gets the vertex at a given index.
   * @param index - The index to get the vertex for
   * @returns The vertex at the index, or undefined if not found
   */
  protected getVertexAt(index: number): V | undefined {
    return this.indexToVertex.get(index);
  }

  /**
   * Gets all vertex indices.
   * @returns Array of vertex indices
   */
  protected getAllVertexIndices(): number[] {
    return Array.from(this.vertexToIndex.values());
  }

  // Abstract methods that must be implemented by derived classes

  /**
   * Called when a vertex is added to the graph.
   * @param vertex - The vertex that was added
   */
  protected abstract onVertexAdded(vertex: V): void;

  /**
   * Called when a vertex is removed from the graph.
   * @param vertex - The vertex that was removed
   * @param vertexIndex - The index of the removed vertex
   */
  protected abstract onVertexRemoved(vertex: V, vertexIndex: number): void;

  /**
   * Called when an edge is added to the graph.
   * @param from - The source vertex
   * @param to - The destination vertex
   * @param weight - The weight of the edge
   */
  protected abstract onEdgeAdded(from: V, to: V, weight: W): void;

  /**
   * Called when an edge is removed from the graph.
   * @param from - The source vertex
   * @param to - The destination vertex
   */
  protected abstract onEdgeRemoved(from: V, to: V): void;

  /**
   * Gets the neighbors of a vertex.
   * @param vertex - The vertex to get neighbors for
   * @returns Array of neighboring vertices
   */
  protected abstract onGetNeighbors(vertex: V): V[];

  /**
   * Gets the weight of an edge between two vertices.
   * @param from - The source vertex
   * @param to - The destination vertex
   * @returns The weight of the edge, or undefined if no edge exists
   */
  protected abstract onGetEdgeWeight(from: V, to: V): W | undefined;

  /**
   * Checks if an edge exists between two vertices.
   * @param from - The source vertex
   * @param to - The destination vertex
   * @returns True if the edge exists, false otherwise
   */
  protected abstract onHasEdge(from: V, to: V): boolean;

  /**
   * Gets the total number of edges in the graph.
   * @returns The number of edges
   */
  protected abstract onGetEdgeCount(): number;

  /**
   * Called when the graph is cleared.
   */
  protected abstract onClear(): void;
}
