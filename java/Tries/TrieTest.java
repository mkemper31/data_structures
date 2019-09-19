public class TrieTest {

	public static void main(String[] args) {
		Trie trie = new Trie();
		trie.insertWord("car");
        trie.insertWord("card");
        trie.insertWord("chip");
        trie.insertWord("trie");
        trie.insertWord("try");
        trie.insertWord("Lorem".toLowerCase());
        trie.insertWord("ipsum".toLowerCase());
        trie.insertWord("dolor".toLowerCase());
        trie.insertWord("sit".toLowerCase());
        trie.insertWord("amet".toLowerCase());
        trie.insertWord("consectetur".toLowerCase());
        trie.insertWord("adipiscing".toLowerCase());
        trie.insertWord("elit".toLowerCase());
        trie.insertWord("Nunc".toLowerCase());
        trie.insertWord("interdum".toLowerCase());
        trie.insertWord("magna".toLowerCase());
        trie.insertWord("eget".toLowerCase());
        trie.insertWord("rutrum".toLowerCase());
        trie.insertWord("dui".toLowerCase());
        trie.insertWord("Sed".toLowerCase());
        trie.insertWord("elementum".toLowerCase());
        trie.insertWord("elit".toLowerCase());
        trie.insertWord("risus".toLowerCase());
        trie.printAllKeys();
	}

}
