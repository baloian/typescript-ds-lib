import { Matrix } from '../matrix';
import { BaseGraph } from './base';

/**
 * Matrix-based Graph implementation.
 * Uses adjacency matrix to represent the graph.
 */
export class MatrixGraph<V, W = number> extends BaseGraph<V, W> {
  private adjacencyMatrix: Matrix<W | undefined>;

  constructor() {
    super();
    this.adjacencyMatrix = new Matrix<W | undefined>(0, 0);
  }

  protected onVertexAdded(vertex: V): void {
    const newSize = this.vertexCount();
    const newMatrix = new Matrix<W | undefined>(newSize, newSize);

    // Copy existing data
    for (let i = 0; i < this.adjacencyMatrix.rows(); i++) {
      for (let j = 0; j < this.adjacencyMatrix.columns(); j++) {
        newMatrix.set(i, j, this.adjacencyMatrix.get(i, j));
      }
    }

    this.adjacencyMatrix = newMatrix;
  }

  protected onVertexRemoved(vertex: V, vertexIndex: number): void {
    const newSize = this.vertexCount();
    const newMatrix = new Matrix<W | undefined>(newSize, newSize);

    // Copy data excluding the removed vertex
    let newRow = 0;
    for (let oldRow = 0; oldRow < this.adjacencyMatrix.rows(); oldRow++) {
      if (oldRow === vertexIndex) continue;

      let newCol = 0;
      for (let oldCol = 0; oldCol < this.adjacencyMatrix.columns(); oldCol++) {
        if (oldCol === vertexIndex) continue;

        newMatrix.set(newRow, newCol, this.adjacencyMatrix.get(oldRow, oldCol));
        newCol++;
      }
      newRow++;
    }

    this.adjacencyMatrix = newMatrix;
  }

  protected onEdgeAdded(from: V, to: V, weight: W): void {
    const fromIndex = this.getVertexIndex(from);
    const toIndex = this.getVertexIndex(to);

    if (fromIndex !== -1 && toIndex !== -1) {
      this.adjacencyMatrix.set(fromIndex, toIndex, weight);
    }
  }

  protected onEdgeRemoved(from: V, to: V): void {
    const fromIndex = this.getVertexIndex(from);
    const toIndex = this.getVertexIndex(to);

    if (fromIndex !== -1 && toIndex !== -1) {
      this.adjacencyMatrix.set(fromIndex, toIndex, undefined);
    }
  }

  protected onGetNeighbors(vertex: V): V[] {
    const vertexIndex = this.getVertexIndex(vertex);
    if (vertexIndex === -1) return [];

    const neighbors: V[] = [];
    for (let i = 0; i < this.adjacencyMatrix.columns(); i++) {
      const weight = this.adjacencyMatrix.get(vertexIndex, i);
      if (weight !== undefined) {
        const neighborVertex = this.getVertexAt(i);
        if (neighborVertex !== undefined) {
          neighbors.push(neighborVertex);
        }
      }
    }
    return neighbors;
  }

  protected onGetEdgeWeight(from: V, to: V): W | undefined {
    const fromIndex = this.getVertexIndex(from);
    const toIndex = this.getVertexIndex(to);

    if (fromIndex === -1 || toIndex === -1) {
      return undefined;
    }

    return this.adjacencyMatrix.get(fromIndex, toIndex);
  }

  protected onHasEdge(from: V, to: V): boolean {
    return this.onGetEdgeWeight(from, to) !== undefined;
  }

  protected onGetEdgeCount(): number {
    let count = 0;
    for (let i = 0; i < this.adjacencyMatrix.rows(); i++) {
      for (let j = 0; j < this.adjacencyMatrix.columns(); j++) {
        if (this.adjacencyMatrix.get(i, j) !== undefined) {
          count++;
        }
      }
    }
    return count;
  }

  protected onClear(): void {
    this.adjacencyMatrix = new Matrix<W | undefined>(0, 0);
  }
}
