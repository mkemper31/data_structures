class MinHeap {
    constructor() {
        this.heap = [undefined];
    }
    getParent(i) {
        return Math.floor(i/2);
    }
    getLeft(i) {
        return (i * 2) > this.lastIndex() ? null : i * 2;
    }
    getRight(i) {
        return (i * 2 + 1) > this.lastIndex() ? null : i * 2 + 1;
    }
    getLesserChild(i) {
        if(!this.getLeft(i)) return i;
        else if (!this.getRight(i)) return this.getLeft(i);
        else {
            if(this.heap[this.getLeft(i)] > this.heap[this.getRight(i)]) return this.getRight(i);
            else return this.getLeft(i);
        }
    }
    lastIndex() {
        return this.heap.length-1;
    }
    insert(n) {
        this.heap.push(n);
        let i = this.lastIndex();
        while(i > 1 && this.heap[i] < this.heap[this.getParent(i)]) {
            let temp = this.heap[this.getParent(i)];
            this.heap[this.getParent(i)] = this.heap[i];
            this.heap[i] = temp;
            i = this.getParent(i);
        }
        return this;
    }
    removeMin() {
        if(this.heap.length == 1) return null;
        else if(this.heap.length == 2) return this.heap.pop();
        let i = 1;
        let val = this.heap[i];
        this.heap[i] = this.heap.pop();
        while(this.heap[i] > this.heap[this.getLesserChild(i)]) {
            let x = this.getLesserChild(i);
            let temp = this.heap[x];
            this.heap[x] = this.heap[i];
            this.heap[i] = temp;
            i = x;
        }
        return val;
    }
    heapify(arr) {
        this.heap = this.heap.concat(arr);
        if(this.heap.length < 3) return this;
        let i = this.getParent(this.lastIndex());
        while(i >= 1) {
            let j = i;
            while(this.heap[j] > this.heap[this.getLesserChild(j)]) {
                let x = this.getLesserChild(j);
                let temp = this.heap[x];
                this.heap[x] = this.heap[j];
                this.heap[j] = temp;
                j = x;
            }
            i--;
        }
        return this;
    }
    heapSort(arr) {
        this.heapify(arr);
        let newArr = [];
        while(this.lastIndex() > 0) {
            newArr.push(this.removeMin());
        }
        return newArr;
    }
    print() {
        for(let i = 1; i <= this.lastIndex(); i++) {
            console.log(this.heap[i]);
        }
    }
}
