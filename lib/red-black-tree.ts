import { RedBlackTreeTy } from '../types';

enum Color {
  RED,
  BLACK
}

class RBNode<T> {
  value: T;
  color: Color;
  left: RBNode<T> | null;
  right: RBNode<T> | null;
  parent: RBNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.color = Color.RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

export class RedBlackTree<T> implements RedBlackTreeTy<T> {
  private root: RBNode<T> | null;
  private nodeCount: number;

  constructor() {
    this.root = null;
    this.nodeCount = 0;
  }

  private rotateLeft(node: RBNode<T>): void {
    const rightChild = node.right!;
    node.right = rightChild.left;
    
    if (rightChild.left !== null) {
      rightChild.left.parent = node;
    }
    
    rightChild.parent = node.parent;
    
    if (node.parent === null) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }
    
    rightChild.left = node;
    node.parent = rightChild;
  }

  private rotateRight(node: RBNode<T>): void {
    const leftChild = node.left!;
    node.left = leftChild.right;
    
    if (leftChild.right !== null) {
      leftChild.right.parent = node;
    }
    
    leftChild.parent = node.parent;
    
    if (node.parent === null) {
      this.root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }
    
    leftChild.right = node;
    node.parent = leftChild;
  }

  private fixInsert(node: RBNode<T>): void {
    while (node !== this.root && node.parent?.color === Color.RED) {
      if (node.parent === node.parent.parent?.left) {
        const uncle = node.parent.parent.right;
        
        if (uncle?.color === Color.RED) {
          node.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          node.parent.parent.color = Color.RED;
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            node = node.parent;
            this.rotateLeft(node);
          }
          node.parent!.color = Color.BLACK;
          node.parent!.parent!.color = Color.RED;
          this.rotateRight(node.parent!.parent!);
        }
      } else {
        const uncle = node.parent.parent?.left;
        if (uncle?.color === Color.RED) {
          node.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          node.parent.parent!.color = Color.RED;
          node = node.parent.parent!;
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rotateRight(node);
          }
          node.parent!.color = Color.BLACK;
          node.parent!.parent!.color = Color.RED;
          this.rotateLeft(node.parent!.parent!);
        }
      }
    }
    this.root!.color = Color.BLACK;
  }

  insert(value: T): void {
    const newNode = new RBNode(value);
    let parent: RBNode<T> | null = null;
    let current = this.root;
    while (current !== null) {
      parent = current;
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        // Value already exists, don't insert duplicate
        return;
      }
    }

    newNode.parent = parent;
    
    if (parent === null) {
      this.root = newNode;
    } else if (value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    this.nodeCount++;
    this.fixInsert(newNode);
  }

  private findNode(value: T): RBNode<T> | null {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) {
        return current;
      }
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }

  find(value: T): boolean {
    return this.findNode(value) !== null;
  }

  private findMinNode(node: RBNode<T>): RBNode<T> {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  min(): T | undefined {
    if (!this.root) return undefined;
    return this.findMinNode(this.root).value;
  }

  private findMaxNode(node: RBNode<T>): RBNode<T> {
    let current = node;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  max(): T | undefined {
    if (!this.root) return undefined;
    return this.findMaxNode(this.root).value;
  }

  remove(value: T): void {
    const node = this.findNode(value);
    if (node) {
      this.nodeCount--;
      this.deleteNode(node);
    }
  }

  private deleteNode(node: RBNode<T>): void {
    let x: RBNode<T> | null;
    let y = node;
    let originalColor = y.color;

    if (node.left === null) {
      x = node.right;
      this.transplant(node, node.right);
    } else if (node.right === null) {
      x = node.left;
      this.transplant(node, node.left);
    } else {
      y = this.findMinNode(node.right);
      originalColor = y.color;
      x = y.right;
      
      if (y.parent === node) {
        if (x) x.parent = y;
      } else {
        this.transplant(y, y.right);
        y.right = node.right;
        y.right.parent = y;
      }
      
      this.transplant(node, y);
      y.left = node.left;
      y.left.parent = y;
      y.color = node.color;
    }

    if (originalColor === Color.BLACK && x) {
      this.fixDelete(x);
    }
  }

  private transplant(u: RBNode<T>, v: RBNode<T> | null): void {
    if (u.parent === null) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    if (v !== null) {
      v.parent = u.parent;
    }
  }

  private fixDelete(x: RBNode<T>): void {
    while (x !== this.root && x.color === Color.BLACK) {
      if (x === x.parent!.left) {
        let w = x.parent!.right!;
        
        if (w.color === Color.RED) {
          w.color = Color.BLACK;
          x.parent!.color = Color.RED;
          this.rotateLeft(x.parent!);
          w = x.parent!.right!;
        }
        
        if ((!w.left || w.left.color === Color.BLACK) && 
            (!w.right || w.right.color === Color.BLACK)) {
          w.color = Color.RED;
          x = x.parent!;
        } else {
          if (!w.right || w.right.color === Color.BLACK) {
            if (w.left) w.left.color = Color.BLACK;
            w.color = Color.RED;
            this.rotateRight(w);
            w = x.parent!.right!;
          }
          
          w.color = x.parent!.color;
          x.parent!.color = Color.BLACK;
          if (w.right) w.right.color = Color.BLACK;
          this.rotateLeft(x.parent!);
          x = this.root!;
        }
      } else {
        let w = x.parent!.left!;
        
        if (w.color === Color.RED) {
          w.color = Color.BLACK;
          x.parent!.color = Color.RED;
          this.rotateRight(x.parent!);
          w = x.parent!.left!;
        }
        
        if ((!w.right || w.right.color === Color.BLACK) && 
            (!w.left || w.left.color === Color.BLACK)) {
          w.color = Color.RED;
          x = x.parent!;
        } else {
          if (!w.left || w.left.color === Color.BLACK) {
            if (w.right) w.right.color = Color.BLACK;
            w.color = Color.RED;
            this.rotateLeft(w);
            w = x.parent!.left!;
          }
          
          w.color = x.parent!.color;
          x.parent!.color = Color.BLACK;
          if (w.left) w.left.color = Color.BLACK;
          this.rotateRight(x.parent!);
          x = this.root!;
        }
      }
    }
    x.color = Color.BLACK;
  }

  empty(): boolean {
    return this.root === null;
  }

  size(): number {
    return this.nodeCount;
  }

  clear(): void {
    this.root = null;
    this.nodeCount = 0;
  }
}
