class Hash {
  constructor(cap) {
    this.initialCap = cap;
    this.table = [];
    this.cap = cap;
    this.table.length = this.cap;
    this.numItems = 0;
  }
  size() {
    return this.numItems;
  }
  generateHash(key) {
    let hash = 0;
    if(key.length == 0) return hash;
    for(let i = 0; i < key.length; i++) {
      let char = key.charCodeAt(i);
      hash = ((hash<<5)-hash) + char;
      hash &= hash;
    }
    return (hash % this.cap + this.cap) % this.cap;
  }
  put(key, value) {
    if(!key) return this;
    let found = false;
    const idx = this.generateHash(key);
    if(!this.table[idx]) this.table[idx] = [];
    for(const pair of this.table[idx]) {
      if(pair[0] === key) {
        found = true;
        pair[1] = value;
      }
    }
    if(!found) {
      this.table[idx].push([key, value]);
      this.numItems++;
      if(this.size() > this.cap * 0.8) this.grow();
    }
    return this;
  }
  get(key) {
    if(!key) return null;
    const idx = this.generateHash(key);
    for(const pair of this.table[idx]) {
      if(pair[0] === key) {
        return pair[1];
      }
    }
    return null;
  }
  remove(key) {
    if(!key) return null;
    const idx = this.generateHash(key);
    const subtable = this.table[this.generateHash(key)];
    for(let i = 0; i < subtable.length; i++) {
      if (subtable[i][0] === key) {
        const value = subtable[i][1];
        subtable[i] = subtable[subtable.length-1];
        subtable.pop();
        this.numItems--;
        if(subtable.length == 0) delete this.table[idx];
        if(this.size() < this.cap/4 && this.cap > this.initialCap) this.shrink();
        return value;
      }
    }
    return null;
  }
  grow() {
    return this.resize(Math.round(this.cap * 1.5));
  }
  shrink() {
    return this.resize(Math.max(Math.round(this.cap/2), this.initialCap));
  }
  resize(cap) {
    const oldTable = this.table;
    this.cap = cap;
    this.table = [];
    this.numItems = 0;
    for(const subTable of oldTable) {
      if(subTable) {
        for(const [k, v] of subTable) {
          this.put(k, v);
        }
      }
    }
    return this;
  }
  getValues() {
    return this.getSet(([,v]) => v);
  }
  getKeys() {
    return this.getSet(([k]) => k);
  }
  getSet(callback) {
    let set = [];
    for(const table of this.table) {
      if(table) {
        for(const entry of table) {
          set.push(callback(entry));
        }
      }
    }
    return set;
  }
}
