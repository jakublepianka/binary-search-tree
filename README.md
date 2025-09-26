# binary-search-tree

A JavaScript implementation of a binary search tree (BST) with support for insertion, deletion, traversals, balancing, and pretty printing.

## Features

- Build balanced BST from an array (duplicates removed & sorted)
- Insert and delete nodes
- Find node by value
- Traversal methods: level-order, in-order, pre-order, post-order
- Calculate node height and depth
- Check if tree is balanced
- Rebalance unbalanced trees
- Pretty print structure in console

## Usage
```js
import Tree from "./tree.js";

// Create a balanced BST from random array
const tree = Tree([10, 20, 5, 6, 15]);

tree.prettyPrint(tree.root);

// Insert values
tree.insert(25);
tree.insert(2);

// Delete a value
tree.deleteItem(15);

// Check balance
console.log(tree.isBalanced());

// Rebalance if needed
tree.rebalance();

// Traverse
tree.inOrderForEach(node => console.log(node.data));
```

## Methods

- `insert(value)` – Insert a new value into the tree  
- `deleteItem(value)` – Remove a value from the tree  
- `find(value)` – Find and return a node by value  
- `levelOrderForEach(callback)` – Traverse in level order, applying `callback`  
- `inOrderForEach(callback)` – Traverse in in-order, applying `callback`  
- `preOrderForEach(callback)` – Traverse in pre-order, applying `callback`  
- `postOrderForEach(callback)` – Traverse in post-order, applying `callback`  
- `height(value)` – Get the height of a node  
- `depth(value)` – Get the depth of a node  
- `isBalanced()` – Check if the tree is balanced  
- `rebalance()` – Rebuild tree into a balanced form  
- `prettyPrint(node)` – Print tree structure to console  
