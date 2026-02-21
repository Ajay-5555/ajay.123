// DSA basics in simple JavaScript style

// 1) STACK (LIFO: Last In First Out)
class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items);
  }
}

const myStack = new Stack();
myStack.push(10);
myStack.push(20);
myStack.push(30);
console.log("Stack top:", myStack.peek());
console.log("Stack pop:", myStack.pop());
console.log("Stack size:", myStack.size());
myStack.print();


// 2) QUEUE (FIFO: First In First Out)
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items);
  }
}

const myQueue = new Queue();
myQueue.enqueue(100);
myQueue.enqueue(200);
myQueue.enqueue(300);
console.log("Queue front:", myQueue.front());
console.log("Queue dequeue:", myQueue.dequeue());
console.log("Queue size:", myQueue.size());
myQueue.print();


// 3) Small DSA practice functions

// Reverse a string using stack
function reverseString(text) {
  const stack = [];

  for (let char of text) {
    stack.push(char);
  }

  let reversed = "";
  while (stack.length > 0) {
    reversed += stack.pop();
  }

  return reversed;
}

console.log("Reverse of Ajay:", reverseString("Ajay"));


// Check balanced parentheses using stack
function isBalanced(expression) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{"
  };

  for (let char of expression) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}") {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log("Balanced (()):", isBalanced("(())"));
console.log("Balanced ([)]:", isBalanced("([)]"));