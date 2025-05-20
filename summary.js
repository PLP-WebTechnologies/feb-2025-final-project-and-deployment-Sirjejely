document.addEventListener("DOMContentLoaded", () => {
    const salesData = JSON.parse(localStorage.getItem("sales")) || [];
    
    // Aggregate sales by item
    const summary = {};
    
    salesData.forEach(({ item, quantity, profit, tithe }) => {
      if (!summary[item]) {
        summary[item] = { quantity: 0, profit: 0, tithe: 0 };
      }
      summary[item].quantity += quantity;
      summary[item].profit += profit;
      summary[item].tithe += tithe;
    });
    
    const summaryBody = document.getElementById("summaryBody");
    summaryBody.innerHTML = "";
  
    let totalQty = 0, totalProfit = 0, totalTithe = 0;
  
    for (const item in summary) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item}</td>
        <td>${summary[item].quantity.toFixed(2)}</td>
        <td>₦${summary[item].profit.toFixed(2)}</td>
        <td>₦${summary[item].tithe.toFixed(2)}</td>
      `;
      summaryBody.appendChild(row);
      
      totalQty += summary[item].quantity;
      totalProfit += summary[item].profit;
      totalTithe += summary[item].tithe;
    }
  
    // Display totals
    document.getElementById("totalQty").textContent = totalQty.toFixed(2);
    document.getElementById("totalProfit").textContent = `₦${totalProfit.toFixed(2)}`;
    document.getElementById("totalTithe").textContent = `₦${totalTithe.toFixed(2)}`;
  
    // Prepare data for chart
    const labels = Object.keys(summary);
    const quantities = labels.map(item => summary[item].quantity);
  
    // Render Chart.js bar chart
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Quantity Sold',
          data: quantities,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        }
      }
    });
  });
  