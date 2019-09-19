class Node:
	def __init__(self,val):
		self.value = val
		self.next = None
		self.prev = None

class DoublyLinkedList:
	def __init__(self):
		self.head = None
		self.tail = None

	def print_values_forward(self):
		runner = self.head
		while runner != None:
			print(runner.value)
			runner = runner.next
		return self

	def print_values_backward(self):
		runner = self.tail
		while runner != None:
			print(runner.value)
			runner = runner.prev
		return self

	def check_if_circular(self,fix=False):
		if self.head == None:
			print("List is empty! Empty lists are considered circular.")
			return self
		runner = self.head
		while runner.next != None and runner.next != self.head:
			runner = runner.next
		if runner.next == None:
			print("List is not circular!")
			return self
		elif runner.next == self.head:
			print("List is circular!")
			if fix == True:
				print("Fixing...")
				self.head.prev = None
				runner.next = None
				self.tail = runner
				return self
			elif fix == False:
				return self


	def add_to_front(self,val):
		new_node = Node(val)
		if self.head == None:
			self.head = new_node
			self.tail = new_node
			return self
		elif self.head.next == None:
			old_head = self.head
			old_head.prev = new_node
			new_node.next = old_head
			self.head = new_node
			self.tail = old_head
			return self
		else:
			old_head = self.head
			old_head.prev = new_node
			new_node.next = old_head
			self.head = new_node
			return self

	def add_to_back(self,val):
		if self.head == None:
			self.add_to_front(val)
			return self
		elif self.head == self.tail:
			new_node = Node(val)
			self.tail = new_node
			self.head.next = new_node
			new_node.prev = self.head
			return self
		else:
			new_node = Node(val)
			old_tail = self.tail
			old_tail.next = new_node
			new_node.prev = old_tail
			self.tail = new_node
			return self

	def remove_from_front(self):
		# Edge case: empty list. if so simply return none
		if self.head == None:
			return None
		# Edge case: Single-item list. If so delete it and return
		old_head = self.head
		if self.head.next == None:
			self.head == None
			self.tail == None
			return old_head.value
		self.head = old_head.next
		self.head.prev = None
		return old_head.value

	def remove_from_back(self):
		# Edge case: empty list. If so return none
		if self.head == None:
			return None
		# Edge case: If single-element list call remove_from_front()
		if self.tail.prev == None:
			self.remove_from_front()
		old_tail = self.tail
		self.tail.prev.next = None
		self.tail = self.tail.prev
		return old_tail.value

	def remove_val_forward(self,val):
		if self.head.value == val:
			self.remove_from_front()
			return self
		runner = self.head
		while runner.next != None and runner.next.value != val:
			runner = runner.next
		if runner.next.value == val:
			old_node = runner.next
			runner.next = old_node.next
			old_node.next.prev = runner
		return self

	def remove_val_backward(self,val):
		if self.tail.value == val:
			self.remove_from_back()
			return self
		runner = self.tail
		while runner.prev != None and runner.prev.value != val:
			runner = runner.prev
		if runner.prev.value == val:
			old_node = runner.prev
			runner.prev = old_node.prev
			old_node.prev.next = runner
		return self

	def remove_at_index(self,n):
		if self.head == None or n < 0:
			return None
		if n == 0:
			old_node = self.head
			self.remove_from_front()
			return old_node.value
		index = 0
		runner = self.head
		while runner.next.next != None and index < n-1:
			runner = runner.next
			index += 1
		if runner.next.next == None and index < n-1:
			return None
		elif runner.next.next == None and index == n-1:
			old_node = runner.next
			self.remove_from_back()
			return old_node.value
		else:
			old_node = runner.next
			old_node.next.prev = runner
			runner.next = old_node.next
			return old_node.value

	def insert_at_first_val(self,val,before=True):
		# if list empty: do nothing and return self
		if self.head == None:
			return self
		# if value is first element in list:
		if self.head.value == val:
			if before == True:
				self.add_to_front(val)
			elif before == False:
				# if single element list
				if self.head == self.tail:
					self.add_to_back(val)
				else:
					new_node = Node(val)
					new_node.next = self.head.next
					new_node.next.prev = new_node
					new_node.prev = self.head
					self.head.next = new_node
			return self
		# enter logic for longer lists
		runner = self.head
		while runner.next != None and runner.next.value != val:
			runner = runner.next
		if runner.next.value == val:
			if before == True:
				new_node = Node(val)
				new_node.next = runner.next
				new_node.next.prev = new_node
				runner.next = new_node
				new_node.prev = runner
			elif before == False:
				runner = runner.next
				if runner.next == None:
					self.add_to_back(val)
				else:
					new_node = Node(val)
					new_node.next = runner.next
					new_node.next.prev = new_node
					runner.next = new_node
					new_node.prev = runner
		return self

	def insert_at_last_val(self,val,before=False):
		# if list empty: do nothing and return self
		if self.head == None:
			return self
		#if value is last element in list:
		if self.tail.value == val:
			if before == False:
				self.add_to_back(val)
			elif before == True:
				# if single-element list
				if self.tail == self.head:
					self.add_to_front(val)
				else:
					new_node = Node(val)
					new_node.next = self.tail
					new_node.prev = self.tail.prev
					new_node.next.prev = new_node
					new_node.prev.next = new_node
			return self
		# enter longer-list logic
		runner = self.tail
		while runner.prev != None and runner.prev.value != val:
			runner = runner.prev
		# if the value is found
		if runner.prev.value == val:
			if before == True:
				if runner.prev == self.head:
					self.add_to_front(val)
				else:
					runner = runner.prev
					new_node = Node(val)
					new_node.prev = runner.prev
					new_node.prev.next = new_node
					runner.prev = new_node
					new_node.next = runner
			elif before == False:
				new_node = Node(val)
				new_node.prev = runner.prev
				new_node.prev.next = new_node
				runner.prev = new_node
				new_node.next = runner
		return self



	def insert_at_index(self,val,n):
		# edge case: empty list or negative index
		if self.head == None or n < 0:
			return self
		index = 0
		runner = self.head
		while runner.next != None and index < n-1:
			runner = runner.next
			index += 1
		new_node = Node(val)
		new_node.next = runner.next
		if new_node.next != None:
			old_node = new_node.next
			old_node.prev = new_node
		new_node.prev = runner
		return self