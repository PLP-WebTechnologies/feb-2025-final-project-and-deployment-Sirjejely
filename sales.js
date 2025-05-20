// sales.js - Main functionality for sales tracking

let sales = JSON.parse(localStorage.getItem('sales')) || [];
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderSalesTable();
    updateSummary();
});

// Form submission handler
document.getElementById('saleForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const item = document.getElementById('item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
    
    // Input validation
    if (!item || isNaN(quantity) || isNaN(costPrice) || isNaN(sellingPrice)) {
        alert('Please fill all fields with valid numbers');
        return;
    }

    const sale = {
        id: Date.now(),
        item,
        quantity,
        costPrice,
        sellingPrice,
        date: new Date().toISOString().split('T')[0],
        totalRevenue: quantity * sellingPrice,
        profit: (sellingPrice - costPrice) * quantity,
        tithe: ((sellingPrice - costPrice) * quantity) * 0.1
    };

    sales.push(sale);
    saveToLocalStorage();
    renderSalesTable();
    updateSummary();
    clearForm();
});

// Render sales table
function renderSalesTable() {
    const tbody = document.getElementById('salesBody');
    tbody.innerHTML = '';

    sales.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.item}</td>
            <td>${sale.quantity}</td>
            <td>₦${sale.costPrice.toFixed(2)}</td>
            <td>₦${sale.sellingPrice.toFixed(2)}</td>
            <td>₦${sale.totalRevenue.toFixed(2)}</td>
            <td>₦${sale.profit.toFixed(2)}</td>
            <td>₦${sale.tithe.toFixed(2)}</td>
            <td>
                <button onclick="deleteSale(${sale.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Update summary calculations
function updateSummary() {
    const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalRevenue, 0);
    const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
    const totalTithe = sales.reduce((sum, sale) => sum + sale.tithe, 0);

    document.getElementById('totalQuantity').textContent = totalQuantity.toFixed(1);
    document.getElementById('totalRevenue').textContent = totalRevenue.toFixed(2);
    document.getElementById('totalProfit').textContent = totalProfit.toFixed(2);
    document.getElementById('totalTithe').textContent = totalTithe.toFixed(2);
}

// Delete sale functionality
window.deleteSale = (id) => {
    sales = sales.filter(sale => sale.id !== id);
    saveToLocalStorage();
    renderSalesTable();
    updateSummary();
}

// Local storage management
function saveToLocalStorage() {
    localStorage.setItem('sales', JSON.stringify(sales));
}

function clearForm() {
    document.getElementById('saleForm').reset();
}

// Export functionality
window.downloadCSV = () => {
    const csvContent = [
        ['Item', 'Quantity', 'Cost Price', 'Selling Price', 'Revenue', 'Profit', 'Tithe', 'Date'],
        ...sales.map(sale => [
            sale.item,
            sale.quantity,
            sale.costPrice,
            sale.sellingPrice,
            sale.totalRevenue,
            sale.profit,
            sale.tithe,
            sale.date
        ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
};

window.downloadPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text('Sales Report', 10, 10);
    let yPosition = 20;
    
    sales.forEach((sale, index) => {
        doc.text(
            `${index + 1}. ${sale.item}: Qty ${sale.quantity} - Profit ₦${sale.profit.toFixed(2)}`,
            10,
            yPosition
        );
        yPosition += 10;
    });
    
    doc.save(`sales-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

window.printSales = () => {
    window.print();
};