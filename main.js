import Tree from "./tree.js";

function randomArray(length, min, max) {
  if (length < 1) throw new Error("length < 1"); 
  const arr = [];
  let minCeil = Math.ceil(min);
  let maxFloor = Math.floor(max);

  for (let i = 0; i < length; i++ ){
    arr.push(Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil));
  }
  return arr;
}

function printInAllOrders(passedRoot){
  let arr = [];

  // create and print level-order array
  root.levelOrderForEach((el) => {
    arr.push(el.data);
  });
  console.log("level-order array: " + arr);

  // create and print preorder array
  arr = [];
  root.preOrderForEach((el) => {
    arr.push(el.data);
  });
  console.log("preorder array: " + arr);
  
  // create and print inorder array
  arr = [];
  root.inOrderForEach((el) => {
    arr.push(el.data);
  });
  console.log("inorder array: " + arr);
  
  // create and print postorder array
  arr = [];
  root.postOrderForEach((el) => {
    arr.push(el.data);
  });
  console.log("postorder array: " + arr);
}

// Create a binary search tree
const root = Tree(randomArray(10, 20, 100));

root.prettyPrint(root.root);

// Confirm that the tree is balanced
console.log(root.isBalanced());

// Print out all elements in level, pre, post, and in order.
printInAllOrders(root);

// Unbalance the tree
root.insert(15);
root.insert(14);
root.insert(13);

root.insert(105);
root.insert(104);
root.insert(103);
root.insert(102);

root.prettyPrint(root.root);

// Confirm that the tree is unbalanced
console.log(root.isBalanced());

// Balance the tree
root.rebalance();

root.prettyPrint(root.root);

// Confirm that the tree is balanced 
console.log(root.isBalanced());

// Print out all elements in level, pre, post, and in order.
printInAllOrders(root);

