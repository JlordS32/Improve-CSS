class Node {
   constructor(data) {
      this.data = data;
      this.next = null;
   }
}

class LinkedList {
   constructor() {
      this.head = null;
      this.tail = null;
   }

   append(data) {
      const newNode = new Node(data);
      
      if (!this.head) {
         this.head = newNode;
         this.tail = newNode;
      } else {
         this.tail.next = newNode;
         this.tail = newNode;
      }
   }

   display() {
      let current = this.head;
  
      while (current) {
          console.log(current.data);
          current = current.next;
      }
  
      console.log('null');
  }
}

const list = new LinkedList();

for (let i = 0; i < 10; i++) {
   list.append(10)
}

list.display();