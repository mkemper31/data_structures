import java.util.Set;

public class Trie {
	public Node root;

	public Trie() {
		this.root = new Node();
	}

	public void insertWord(String word) {
		Node currentNode = this.root;

		for(int i = 0; i < word.length(); i++) {
			Character currentLetter = word.charAt(i);
			Node child = currentNode.children.get(currentLetter);
			if(child == null) {
				child = new Node();
				currentNode.children.put(currentLetter, child);
			}
			currentNode = child;
		}
		currentNode.isCompleteWord = true;
	}
	public boolean isPrefixValid(String prefix) {
		Node currentNode = this.root;

		for(int i = 0; i < prefix.length(); i++) {
			Character currentLetter = prefix.charAt(i);
			Node child = currentNode.children.get(currentLetter);
			if(child == null) {
				return false;
			}
			currentNode = child;
		}
		return true;
	}
	public boolean isWordValid(String word) {
		Node currentNode = this.root;
		for(int i = 0; i < word.length(); i++) {
			Character currentLetter = word.charAt(i);
			Node child = currentNode.children.get(currentLetter);
			if (child == null) {
				return false;
			}
			currentNode = child;
		}
		return currentNode.isCompleteWord;
	}
	public void printAllKeys() {
		this.printAllKeys(this.root);

	}
	private void printAllKeys(Node root) {
		Node currentNode = root;
		Set<Character> keys = currentNode.children.keySet();
		for(Character k: keys) {
			System.out.println(k);
			this.printAllKeys(currentNode.children.get(k));
		}
	}
}
