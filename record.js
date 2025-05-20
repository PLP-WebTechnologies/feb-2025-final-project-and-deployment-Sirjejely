document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recordForm");
    const recordBody = document.getElementById("recordBody");
    const dateInput = document.getElementById("date");
  
    // Set default date to today
    dateInput.valueAsDate = new Date();
  
    // Load records from localStorage
    let records = JSON.parse(localStorage.getItem("records")) || [];
  
    function renderRecords() {
      recordBody.innerHTML = "";
      records.forEach(({ customerName, itemDescription, quantity, date }, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customerName}</td>
          <td>${itemDescription}</td>
          <td>${parseFloat(quantity).toFixed(2)}</td>
          <td>${date}</td>
        `;
        recordBody.appendChild(row);
      });
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const newRecord = {
        customerName: form.customerName.value.trim(),
        itemDescription: form.itemDescription.value.trim(),
        quantity: parseFloat(form.quantity.value),
        date: form.date.value,
      };
  
      // Add record and save to localStorage
      records.push(newRecord);
      localStorage.setItem("records", JSON.stringify(records));
  
      // Update table and reset form
      renderRecords();
      form.reset();
      dateInput.valueAsDate = new Date();
    });
  
    renderRecords();
  });
  