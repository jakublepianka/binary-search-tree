import Node from "./node.js";

export default function Tree(arr) {
  const cleanedArr = uniquifyAndSort(arr);
  const root = buildTree(cleanedArr, 0, cleanedArr.length - 1);

  function uniquifyAndSort(arr) {
    const uniquifiedArr = [...new Set(arr)];
    const sortedArr = uniquifiedArr.sort((a, b) => a - b);
    return sortedArr;
  }

  function buildTree(arr, start, end) {
    const mid = start + Math.floor((end - start) / 2);
    if (start > end) return null;
    let node = Node(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
  }

  function insert(value) {
    if (root === null) return root;

    function traverseTree(node, passedValue) {
      if (passedValue === node.data) return;
      if (passedValue < node.data) {
        if (node.left === null) {
          node.left = new Node(passedValue);
          return;
        } else traverseTree(node.left, passedValue);
      } else if (passedValue > node.data) {
        if (node.right === null) {
          node.right = new Node(passedValue);
          return;
        } else traverseTree(node.right, passedValue);
      }
    }

    traverseTree(root, value);
  }

  function deleteItem(value) {
    if (root === null) return root;

    function getSuccesor(node) {
      let successor = node.right;
      while (successor !== null && successor.left !== null) {
        successor = successor.left;
      }
      return successor;
    }

    function recDel(node, passedValue) {
      if (passedValue < node.data) {
        node.left = recDel(node.left, passedValue);
      } else if (passedValue > node.data) {
        node.right = recDel(node.right, passedValue);
      } else {
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        } else {
          let successor = getSuccesor(node);
          node.data = successor.data;
          node.right = recDel(node.right, successor.data);
        }
      }
      return node;
    }

    recDel(root, value);
  }

  function find(value) {
    if (root === null) return root;

    function recFind(node, passedValue) {
      if (node === null) return null;
      if (passedValue < node.data) {
        return recFind(node.left, passedValue);
      } else if (passedValue > node.data) {
        return recFind(node.right, passedValue);
      } else {
        return node;
      }
    }
    return recFind(root, value);
  }

  // iterative levelOrderForEach
  function levelOrderForEach(callback) {
    if (callback === undefined) throw new Error("callback is required");
    if (root === null) return root;

    const queue = [];
    let rootNode = root;
    queue.push(rootNode);

    while (queue.length > 0) {
      callback(queue[0]);
      if (queue[0].left !== null) queue.push(queue[0].left);
      if (queue[0].right !== null) queue.push(queue[0].right);
      queue.shift();
    }
  }

  // recursive levelOrderForEach
  // function levelOrderForEach(callback){
  //   if (callback === undefined) throw new Error("callback is required");
  //   if (root === null) {
  //     return null;
  //   }

  //   let queue = [];
  //   queue.push(root);
  //   function recLoop(passedQueue) {
  //     if (passedQueue.length === 0) return;
  //     callback(passedQueue[0]);
  //     if (passedQueue[0].left !== null) passedQueue.push(passedQueue[0].left);
  //     if (passedQueue[0].right !== null) passedQueue.push(passedQueue[0].right);
  //     passedQueue.shift();
  //     recLoop(passedQueue);
  //   }

  //   recLoop(queue)
  // }

  function inOrderForEach(callback) {
    if (callback === undefined) throw new Error("callback is required");
    if (root === null) return root;

    function recInOrder(node) {
      if (node === null) return;
      recInOrder(node.left);
      callback(node);
      recInOrder(node.right);
    }

    recInOrder(root);
  }

  function preOrderForEach(callback) {
    if (callback === undefined) throw new Error("callback is required");
    if (root === null) return root;

    function recPreOrder(node) {
      if (node === null) return;
      callback(node);
      recPreOrder(node.left);
      recPreOrder(node.right);
    }

    recPreOrder(root);
  }

  function postOrderForEach(callback) {
    if (callback === undefined) throw new Error("callback is required");
    if (root === null) return root;

    function recPostOrder(node) {
      if (node === null) return;
      recPostOrder(node.left);
      recPostOrder(node.right);
      callback(node);
    }

    recPostOrder(root);
  }

  function height(value) {
    const targetNode = find(value);
    if (targetNode === null) return targetNode;

    function recHeight(node) {
      let left = 0;
      let right = 0;
      if (node.left !== null) left += recHeight(node.left) + 1;
      if (node.right !== null) right += recHeight(node.right) + 1;

      if (left > right) return left;
      if (left < right) return right;
      if (left === right) return left;
    }

    return recHeight(targetNode);
  }

  function depth(value) {
    const targetNode = find(value);
    if (targetNode === null) return targetNode;
    let total = 0;

    function recDepth(node, passedValue) {
      if (passedValue < node.data) {
        total += recDepth(node.left, passedValue) + 1;
      } else if (passedValue > node.data) {
        total += recDepth(node.right, passedValue) + 1;
      } else {
        return 0;
      }
      return total;
    }

    return recDepth(root, value);
  }

  function isBalanced() {
    if (root === null) return root;

    function recIsBalanced(node) {
      let isBalanced = true;
      let leftHeight = 0;
      let rightHeight = 0;
      if (node.left) leftHeight = height(node.left.data);
      if (node.right) rightHeight = height(node.right.data);

      let diff = Math.abs(leftHeight - rightHeight);

      if (diff <= 1) {
        if (node.left !== null) {
          isBalanced = recIsBalanced(node.left);
        }
        if (node.right !== null) {
          isBalanced = recIsBalanced(node.right);
        }
        return isBalanced;
      }
      if (diff > 1) {
        return false;
      }
    }

    return recIsBalanced(root);
  }

  function rebalance() {
    let arr = [];

    function recInOrder(node) {
      if (node === null) return;
      recInOrder(node.left);
      arr.push(node.data);
      recInOrder(node.right);
    }

    recInOrder(root);
    let mid = Math.floor((arr.length - 1) / 2);
    root.data = arr[mid];
    root.left = buildTree(arr, 0, mid - 1);
    root.right = buildTree(arr, mid + 1, arr.length - 1);
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrderForEach,
    inOrderForEach,
    preOrderForEach,
    postOrderForEach,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint,
  };
}
