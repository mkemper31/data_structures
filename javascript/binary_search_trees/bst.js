class BST {
    constructor() {
        this.root = null;
    }
    /**
     * Inserts a value into a binary search tree.
     * @param {number} n
     * @param {Node} node
     */
    insert(n, node=this.root) {
        if(this.root == null) {
            this.root = new Node(n);
            return this;
        }
        if(n < node.val) {
            if(node.left == null) node.left = new Node(n);
            else this.insert(n, node.left);
        }
        else if(n > node.val) {
            if(node.right == null) node.right = new Node(n);
            else this.insert(n, node.right);
        }
        return this;
    }
    /**
     *
     * @param {Node} node
     */
    traversePreOrder(node=this.root) {
        if(node == null) return this;
        console.log(node.val);
        this.traversePreOrder(node.left);
        this.traversePreOrder(node.right);
        return this;
    }
    traversePostOrder(node=this.root) {
        if(node == null) return this;
        this.traversePreOrder(node.left);
        this.traversePreOrder(node.right);
        console.log(node.val);
        return this;
    }
    traverseInOrder(node=this.root) {
        if(node == null) return this;
        this.traverseInOrder(node.left);
        console.log(node.val);
        this.traverseInOrder(node.right);
        return this;
    }
    maxDepth(node=this.root) {
        if(node==null) return 0;
        return Math.max(this.findDepth(node.left)+1, this.findDepth(node.right)+1);
    }
    search(n, node=this.root) {
        if(node == null) return false;
        if(node == n) return true;
        return Math.max(search(n, node.left), search(n, node.right));
    }
    findMin(node=this.root) {
        if(!node) return null;
        if(!node.left) return node.val;
        else return this.findMin(node.left);
    }
    findKthSmallest(k) {
      const arr = [];
      traverseAndPush(this.root, arr);
      return arr[k-1];
    }
    remove(n, node=this.root) {
        if(!node) return false;
        if(n == this.root.val) {
            if(this.root.left && this.root.right) {
                this.root.val = this.findMin(this.root.right);
                this.remove(this.root.val, this.root.right);
            }
            else if (this.root.left) {
                this.root = this.root.left;
            }
            else if (this.root.right) {
                this.root = this.root.right;
            }
            else this.root = null;
            return true;
        }
        else if (node.left && node.left.val == n) {
            if(!node.left.left && !node.left.right) {
                node.left = null;
            }
            else if (node.left.left && !node.left.right) {
                node.left = node.left.left;
            }
            else if (!node.left.left && node.left.right) {
                node.left = node.left.right;
            }
            else {
                node.left.val = this.findMin(node.left.right);
                this.remove(node.left.val, node.left.right);
            }
            return true;
        }
        else if (node.right && node.right.val == n) {
            if(!node.right.left && !node.right.right) {
                node.right = null;
            }
            else if (node.right.left && !node.right.right) {
                node.right = node.right.left;
            }
            else if (!node.right.left && node.right.right) {
                node.right = node.right.right;
            }
            else {
                node.right.val = this.findMin(node.right.right);
                this.remove(node.right.val, node.right.right);
            }
            return true;
        }
        if(n > node.val) return this.remove(n, node.right);
        else if (n < node.val) return this.remove(n, node.left);
    }
    // isValidBST(node=this.root, min, max) {
    //     if(node === null) return true;
    //     if((min !== null && min > node.val) || (max !== null && max < node.val)) return false;
    //     if(!this.isValidBST(node.left, min, node.val) || !this.isValidBST(node.right, node.val, max)) return false;
    //     return true;
    // }
    // isValid() {
    //     if(!this.root) return true;
    //     if(this.root.left) {
    //         let values = this.validate(this.root.left);
    //         if(value == -Infinity || value > this.root.val) return false;
    //     }
    //     if(this.root.right) {
    //         let value = this.validate(this.root.right);
    //         if(value == -Infinity || value < this.root.val) return false;
    //     }
    //     return true;
    // }
    // validate(node) {
    //     if(!node.left && !node.right) return node.val;
    //     let leftVal = null;
    //     let rightVal = null;
    //     if(node.left) {
    //         leftVal = this.validate(node.left);
    //     }
    //     if(node.right) {
    //         rightVal = this.validate(node.right);
    //     }
    //     if(!node.right) return leftVal;
    //     if(leftVal > rightVal || leftVal > node.val || rightVal < node.val || leftVal == -Infinity || rightVal == -Infinity) return -Infinity;
    //     return rightVal;
    // }
    /**
     * Inserts an invalid node for testing
     * @param {any} n
     * @param {Node} node
     */
    insertInvalid(n, node=this.root) {
        if(this.root == null) {
            this.root = new Node(n);
            return this;
        }
        if(n < node.val) {
            if(node.left == null) node.right = new Node(n);
            else this.insertInvalid(n, node.right);
        }
        else if(n > node.val) {
            if(node.left == null) node.left = new Node(n);
            else this.insertInvalid(n, node.left);
        }
        return this;
    }
    sumOfGreaterNodes(node=this.root, n=0) {
        if(!node) return n;
        if(!node.left && !node.right) {
            node.val += n;
            return node.val;
        }
        node.val += this.binarySum(node.right, n);
        return this.binarySum(node.left, node.val);
    }
}

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const myTree = new BST();
generateRandomTree(myTree, 20);
myTree.traverseInOrder();
console.log(myTree.findKthSmallest(5));

function generateRandomTree(tree, n) {
    for(let i = 0; i < n; i++) {
        tree.insert(Math.floor(Math.random() * 101));
    }
    return tree;
}

function compareTreeValues(head1, head2) {
    let arr = [];
    traverseAndPush(head1, arr);
    return popAndCompare(head2, arr);
}

function traverseAndPush(node, arr) {
    if(node.left) traverseAndPush(node.left, arr);
    arr.push(node.val);
    if(node.right) traverseAndPush(node.right, arr);
    return arr;
}

function popAndCompare(node, arr) {
    let rightValid = true;
    let leftValid = true;
    if(node.right) rightValid = popAndCompare(node.right, arr);
    if(arr.pop() !== node.val) return false;
    if(node.left) leftValid = popAndCompare(node.left, arr);
    return leftValid && rightValid;
}

function isSameTree(node1, node2) {
    if(!node1 && !node2) return true;
    if((!node1 && node2) || (node1 && !node2) || (node1.left && !node2.left) || (!node1.left && node2.left) || (node1.right && !node2.right) || (!node1.right && node2.right)) {
        return false;
    }
    let leftValid = true;
    let rightValid = true;
    if(node1.left) leftValid = isSameTree(node1.left, node2.left);
    if(node1.right) rightValid = isSameTree(node1.right, node2.right);
    return leftValid && rightValid;
}
