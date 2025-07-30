import { LinkedListGraph } from '../lib/graph/linked-list-graph';

describe('LinkedListGraph', () => {
  let graph: LinkedListGraph<string>;

  beforeEach(() => {
    graph = new LinkedListGraph<string>();
  });

  describe('vertex operations', () => {
    it('should add vertices correctly', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      expect(graph.getVertices()).toContain('A');
      expect(graph.getVertices()).toContain('B');
    });

    it('should remove vertices correctly', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.removeVertex('A');
      expect(graph.getVertices()).not.toContain('A');
      expect(graph.getVertices()).toContain('B');
    });

    it('should not add duplicate vertices', () => {
      graph.addVertex('A');
      graph.addVertex('A');
      expect(graph.getVertices().length).toBe(1);
    });
  });

  describe('edge operations', () => {
    it('should add edges correctly', () => {
      graph.addEdge('A', 'B', 5);
      expect(graph.hasEdge('A', 'B')).toBe(true);
      expect(graph.getEdgeWeight('A', 'B')).toBe(5);
    });

    it('should add vertices automatically when adding edges', () => {
      graph.addEdge('A', 'B');
      expect(graph.getVertices()).toContain('A');
      expect(graph.getVertices()).toContain('B');
    });

    it('should remove edges correctly', () => {
      graph.addEdge('A', 'B');
      graph.removeEdge('A', 'B');
      expect(graph.hasEdge('A', 'B')).toBe(false);
    });

    it('should handle non-existent edges', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      expect(graph.hasEdge('A', 'B')).toBe(false);
      expect(graph.getEdgeWeight('A', 'B')).toBeUndefined();
    });

    it('should update edge weight when adding existing edge', () => {
      graph.addEdge('A', 'B', 5);
      graph.addEdge('A', 'B', 10);
      expect(graph.getEdgeWeight('A', 'B')).toBe(10);
    });
  });

  describe('neighbor operations', () => {
    it('should return correct neighbors', () => {
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      const neighbors = graph.getNeighbors('A');
      expect(neighbors).toContain('B');
      expect(neighbors).toContain('C');
      expect(neighbors.length).toBe(2);
    });

    it('should return empty array for vertex with no neighbors', () => {
      graph.addVertex('A');
      expect(graph.getNeighbors('A')).toEqual([]);
    });

    it('should return empty array for non-existent vertex', () => {
      expect(graph.getNeighbors('A')).toEqual([]);
    });
  });

  describe('complex operations', () => {
    it('should handle removing vertex with edges', () => {
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      graph.addEdge('C', 'A');
      
      graph.removeVertex('B');
      
      expect(graph.hasEdge('A', 'B')).toBe(false);
      expect(graph.hasEdge('B', 'C')).toBe(false);
      expect(graph.hasEdge('C', 'A')).toBe(true);
    });

    it('should maintain correct edge weights in complex graph', () => {
      graph.addEdge('A', 'B', 1);
      graph.addEdge('B', 'C', 2);
      graph.addEdge('C', 'A', 3);
      
      expect(graph.getEdgeWeight('A', 'B')).toBe(1);
      expect(graph.getEdgeWeight('B', 'C')).toBe(2);
      expect(graph.getEdgeWeight('C', 'A')).toBe(3);
    });
  });
});
