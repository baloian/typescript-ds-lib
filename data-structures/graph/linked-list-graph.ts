import { LinkedList } from '../linked-list';
import { BaseGraph } from './base';

/**
 * LinkedList-based Graph implementation.
 * Uses adjacency lists to represent the graph.
 */
export class LinkedListGraph<V, W = number> extends BaseGraph<V, W> {
  private adjacencyLists: Map<V, LinkedList<{ vertex: V; weight: W }>>;

  constructor() {
    super();
    this.adjacencyLists = new Map<V, LinkedList<{ vertex: V; weight: W }>>();
  }

  protected onVertexAdded(vertex: V): void {
    this.adjacencyLists.set(vertex, new LinkedList<{ vertex: V; weight: W }>());
  }

  protected onVertexRemoved(vertex: V, vertexIndex: number): void {
    this.adjacencyLists.delete(vertex);
  }

  protected onEdgeAdded(from: V, to: V, weight: W): void {
    const fromList = this.adjacencyLists.get(from);
    if (fromList) {
      // Remove existing edge if it exists
      fromList.removeIf((edge) => edge.vertex === to);
      fromList.pushBack({ vertex: to, weight });
    }
  }

  protected onEdgeRemoved(from: V, to: V): void {
    const fromList = this.adjacencyLists.get(from);
    if (fromList) {
      fromList.removeIf((edge) => edge.vertex === to);
    }
  }

  protected onGetNeighbors(vertex: V): V[] {
    const list = this.adjacencyLists.get(vertex);
    if (!list) return [];

    const neighbors: V[] = [];
    list.forEach((edge) => neighbors.push(edge.vertex));
    return neighbors;
  }

  protected onGetEdgeWeight(from: V, to: V): W | undefined {
    const list = this.adjacencyLists.get(from);
    if (!list) return undefined;

    for (let i = 0; i < list.size(); i++) {
      const edge = list.get(i);
      if (edge && edge.vertex === to) {
        return edge.weight;
      }
    }
    return undefined;
  }

  protected onHasEdge(from: V, to: V): boolean {
    return this.onGetEdgeWeight(from, to) !== undefined;
  }

  protected onGetEdgeCount(): number {
    let count = 0;
    this.adjacencyLists.forEach((list) => {
      count += list.size();
    });
    return count;
  }

  protected onClear(): void {
    this.adjacencyLists.clear();
  }
}
