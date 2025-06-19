class Item {
  constructor(quantity, description, price) {
    this.quantity = quantity;
    this.description = description;
    this.price = price;
    this.isImported = description.includes("imported");
    this.isExempt = /(book|chocolate|pill)/i.test(description);
  }

  calculateTax() { // Calculate and Round Off
    let taxRate = 0;
    if (!this.isExempt) taxRate += 0.10;
    if (this.isImported) taxRate += 0.05;

    const rawTax = this.price * taxRate;
    return Math.ceil(rawTax * 20) / 20;
  }

  finalPrice() { // Calculate Item Final Price
    return this.price + this.calculateTax();
  }

  toString() {
    const totalPrice = (this.finalPrice() * this.quantity).toFixed(2);
    return `${this.quantity} ${this.description}: ${totalPrice}`;
  }
}

function parseInput(input) {
  const itemRegex = /^(\d+)\s(.+)\s+at\s([\d.]+)$/;
  return input.trim().split('\n').map(line => {
    const match = line.match(itemRegex);
    if (!match) throw new Error(`Invalid item format: ${line}`);
    const [_, quantity, description, price] = match;
    return new Item(parseInt(quantity), description.trim(), parseFloat(price));
  });
}

function printReceipt(input) {
  const items = parseInput(input);
  let totalTax = 0;
  let totalPrice = 0;

  const output = items.map(item => {
    const tax = item.calculateTax() * item.quantity;
    const price = item.finalPrice() * item.quantity;
    totalTax += tax;
    totalPrice += price;
    return item.toString();
  });

  output.push(`Sales Taxes: ${totalTax.toFixed(2)}`);
  output.push(`Total: ${totalPrice.toFixed(2)}`);
  return output.join('\n');
}

// Running Sample Inputs
console.log("Case1:\n" + printReceipt(`
1 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85
`));

console.log("\nCase2:\n" + printReceipt(`
1 imported box of chocolates at 10.00
1 imported bottle of perfume at 47.50
`));

console.log("\nCase3:\n" + printReceipt(`
1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
1 box of imported chocolates at 11.25
`));
