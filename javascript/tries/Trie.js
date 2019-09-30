class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  /**
   * Adds a word to the trie.
   * @param {String} word Word to be added to the Trie
   */
  addWord(word) {
    if(!word) return this;
    let currentNode = this.root;
    for (const char of word.split()) {
      if(!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode(char);
      }
      currentNode = currentNode.children[char];
    }
    currentNode.word = word;
    currentNode.isWord = true;
    return this;
  }
  /**
   * Checks if the trie contains the word given.
   * @param {String} word Word to be found in the trie
   * @returns True if and only if the word is found in the trie; false otherwise.
   */
  contains(word) {
    if (!word || typeof word != string) {
      return false;
    }
    let currentNode = this.root;
    for (const char of word.split()) {
      if (!currentNode.children[char]) return false;
      currentNode = currentNode.children[char];
    }
    return (currentNode.word === word);
  }
  /**
   * TODO
   * Removes a given word from a trie
   * @param {string} word Word to be removed from the trie
   * @returns True if and only if the removal was successful; false otherwise.
   */
  remove(word) {
    if (!word || word.length === 0) return false;
    if (word.length === 1) {
      if (!this.root.children[word.charAt(0)]) return false;
      if (Object.keys(this.root.children[word.charAt(0)].children).length === 0) {
        delete this.root.children[word.charAt(0)];
        return true;
      }
    }
    return this.root.remove(word.split());
  }
}
