document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const item = document.getElementById("item").value.trim();
  let quantity = document.getElementById("quantity").value.replace(/,/g, "").trim();
  let costPrice = document.getElementById("costPrice").value.replace(/,/g, "").trim();
  let sellingPrice = document.getElementById("sellingPrice").value.replace(/,/g, "").trim();

  // Convert strings to numbers
  quantity = parseFloat(quantity);
  costPrice = parseFloat(costPrice);
  sellingPrice = parseFloat(sellingPrice);

  // Validate input
  if (
    !item ||
    isNaN(quantity) || quantity <= 0 ||
    isNaN(costPrice) || costPrice < 0 ||
    isNaN(sellingPrice) || sellingPrice < 0
  ) {
    alert("Please fill in valid values.");
    return;
  }

  // If valid, proceed with your logic (e.g., display or submit the data)
  console.log("Item:", item);
  console.log("Quantity:", quantity);
  console.log("Cost Price:", costPrice);
  console.log("Selling Price:", sellingPrice);

  // You can now safely use the variables in your calculations or to add to a table
});
