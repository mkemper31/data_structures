class TrieNode {
  /**
   * TrieNode can be instantiated with no parameters, but should be instantiated with at least a char.
   * @param {string} char Single character string telling which character the node is associated with.
   * @param {string} word Given if the node is the end of a word.
   * @param {Boolean} isWord True if and only if the node is the end of a word.
   * @param {Object.<string, TrieNode} children Object of character - TrieNode associations.
   */
  constructor(char = null, word = null, isWord = false, children = {}) {
    if(char && char.length > 1) this.char = char.charAt(0);
    else this.char = char;
    this.children = children;
    this.word = word;
    this.isWord = isWord;
  }
  /**
   * TODO
   * Removes a child. Called by the trie's remove method. Calls self recursively.
   * @param {Array<string>} arr Split word to be removed.
   * @param {number=} index Current index of the array.
   * @returns True if the character was successfully removed.
   */
  remove(arr, index=0) {
    if (index >= arr.length - 2) {
      if (!this.children[arr[index]]) {
        return false;
      }
      if (Object.keys(this.children[arr[index]].children).length === 0) {
        delete this.children[arr[index]];
      } else {
        this.children[arr[index]].word = null;
        this.children[arr[index]].isWord = false;
      }
      return true;
    }
    return this.children[arr[index]].remove(arr, index + 1);
  }
}
