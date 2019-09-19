class SLNode:
	def __init__(self,val):
		self.value = val
		self.next = None

class SList:
	def __init__(self):
		self.head = None

	def add_to_front(self,val):
		new_node = SLNode(val)
		new_node.next = self.head
		self.head = new_node
		return self

	def print_values(self):
		runner = self.head
		while runner != None:
			print(runner.value)
			runner = runner.next
		return self

	def add_to_back(self,val):
		if self.head == None:
			self.add_to_front(val)
			return self
		new_node = SLNode(val)
		runner = self.head
		while runner.next != None:
			runner = runner.next
		runner.next = new_node
		return self

	def remove_from_front(self):
		# edge case: list is empty. if so: return None
		if self.head == None:
			return None
		old_head = self.head
		self.head = old_head.next
		return old_head.value

	def remove_from_back(self):
		# edge case: list is empty. if so: return None
		if self.head == None:
			return None
		runner = self.head
		while runner.next.next != None:
			runner = runner.next
		old_tail = runner.next
		runner.next = None
		return old_tail.value

	def remove_val(self,val):
		if self.head.value == val:
			self.remove_from_front()
			return self
		else:
			runner = self.head
			# while runner.next != None and runner.value != val:
			# 	runner = runner.next
			while runner.next != None and runner.next.value != val:
				runner = runner.next
			if runner.next.value == val:
				new_next = runner.next.next
				runner.next = new_next
		return self

	def insert_at(self,val,n):
		if self.head == None or n < 0:
			return self
		index = 0
		runner = self.head
		while runner.next != None and index < n-1:
			runner = runner.next
			index += 1
		new_node = SLNode(val)
		new_node.next = runner.next
		runner.next = new_node
		return self