public class DLL {
	public Node head;
	public Node tail;

	public DLL() {
		this.head = null;
		this.tail = null;
	}
	public void printValuesForward() {
		Node runner = this.head;
		while(runner != null) {
			System.out.println(runner.value);
			runner = runner.next;
		}
	}
	public void push(Node newNode) {
		if (this.head == null) {
			this.head = newNode;
			this.tail = newNode;
			return;
		}

		newNode.previous = this.tail;
		this.tail.next = newNode;
		this.tail = newNode;
	}
	public void push(Integer val) {
		Node newNode = new Node(val);
		this.push(newNode);
	}
	public boolean contains(Integer value) {
		boolean found = false;
		if (this.head == null) {
			return found;
		} else if (this.head == this.tail) {
			if (this.head.value == value) {
				found = true;
			}
			return found;
		}
		Node headRunner = this.head;
		Node tailRunner = this.tail;
		while (headRunner != tailRunner && !found) {
			if (headRunner.value == value || tailRunner.value == value) {
				found = true;
			}

			headRunner = headRunner.next;
			if (headRunner != tailRunner ) {
				tailRunner = tailRunner.previous;
			}
		}
		return found;
	}
	public int size() {
		int size = 0;
		Node runner = this.head;
		while (runner != null) {
			size++;
			runner = runner.next;
		}
		return size;
	}
	public Node pop() {
		Node prevTail = this.tail;
		if (this.head == this.tail) {
			this.head = null;
			this.tail = null;
		} else {
			prevTail.previous.next = null;
			this.tail = this.tail.previous;
		}
		return prevTail;
	}
	public void insertAt(Node newNode, int index) {
		if (index == 0) {
			this.head.previous = newNode;
			newNode.next = this.head;
			this.head = newNode;
			return;
		}
		Node before = this.findNodeAt(index - 1);
		if (before != null) {
			Node oldNode = before.next;
			newNode.previous = before;
			newNode.next = oldNode;
			if (oldNode != null) {
				oldNode.previous = newNode;
			}
		}
	}
	public void insertAt(Integer val, int index) {
		Node newNode = new Node(val);
		this.insertAt(newNode, index);
	}
	public Node removeAt(int index) {
		if (index == 0) {
			Node oldNode = this.head;
			if (this.head == this.tail) {
				this.head = null;
				this.tail = null;
			} else {
				this.head = this.head.next;
				this.head.previous.next = null;
				this.head.previous = null;
			}
			return oldNode;
		} else {
			Node oldNode = this.findNodeAt(index);
			if (oldNode != null) {
				oldNode.previous.next = oldNode.next;
				oldNode.next.previous = oldNode.previous;
				oldNode.previous = null;
				oldNode.next = null;
			}
			return oldNode;
		}
	}
	public Node findNodeAt(int index) {
		Node runner = this.head;
		int count = 0;
		while (runner != null) {
			runner = runner.next;
			count++;
		}
		if (count != index) {
			return null;
		} else {
			return runner;
		}
	}
	public boolean isPalindrome() {
		if (this.head != this.tail) {
			Node headRunner = this.head;
			Node tailRunner = this.tail;
			while (headRunner != tailRunner && headRunner.next != tailRunner) {
				if (headRunner.value != tailRunner.value) {
					return false;
				}
			}
			headRunner = headRunner.next;
			tailRunner = tailRunner.previous;
		}
		return true;
	}
}
