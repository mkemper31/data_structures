public class TrieTest {

	public static void main(String[] args) {
		Trie trie = new Trie();
		trie.insertWord("car");
    trie.insertWord("unambivalent");
    trie.insertWord("uninformed");
    trie.insertWord("card");
    trie.insertWord("chip");
    trie.insertWord("application");
    trie.insertWord("appliance");
    trie.insertWord("amplify");
    trie.insertWord("amplification");
    trie.insertWord("ambivalent");
    trie.insertWord("bulldog");
    trie.insertWord("bull");
    trie.insertWord("bullhorn");
    trie.insertWord("apple");
    trie.insertWord("trie");
    trie.insertWord("tries");
    trie.insertWord("nice");
    trie.insertWord("niceties");
    trie.insertWord("niceness");
    trie.insertWord("cattle");
    trie.insertWord("cuneiform");
    trie.insertWord("kiloton");
    trie.insertWord("try");
    trie.insertWord("uniform");
    trie.insertWord("unify");
    trie.insertWord("a");
    trie.insertWord("an");
    trie.insertWord("anonymous");
    trie.printAllKeys();
    trie.printAllWords();
	}
}
