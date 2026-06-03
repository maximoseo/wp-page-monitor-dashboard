// Sample data - replace with actual API calls
const samplePages = [
    {
        id: 1,
        title: 'Home Page - MaximoSEO',
        url: 'https://maximo-seo.com',
        status: 'updated',
        lastScan: '2026-06-02 13:00:00'
    },
    {
        id: 2,
        title: 'SEO Services',
        url: 'https://maximo-seo.com/services',
        status: 'pending',
        lastScan: '2026-06-02 12:45:00'
    },
    {
        id: 3,
        title: 'About Us',
        url: 'https://maximo-seo.com/about',
        status: 'updated',
        lastScan: '2026-06-02 12:30:00'
    },
    {
        id: 4,
        title: 'Blog - SEO Tips',
        url: 'https://maximo-seo.com/blog',
        status: 'error',
        lastScan: '2026-06-02 12:15:00'
    }
];

const sampleActivity = [
    { type: 'success', message: 'Page "SEO Services" updated successfully', time: '13:00' },
    { type: 'warning', message: 'Page "About Us" pending approval', time: '12:45' },
    { type: 'success', message: 'Scan completed for 10 pages', time: '12:30' },
    { type: 'error', message: 'Error updating "Blog" page', time: '12:15' }
];

// Initialize dashboard
function initDashboard() {
    updateStats();
    renderPagesTable();
    renderActivityFeed();
}

// Update statistics
function updateStats() {
    const stats = {
        total: samplePages.length,
        updated: samplePages.filter(p => p.status === 'updated').length,
        pending: samplePages.filter(p => p.status === 'pending').length,
        error: samplePages.filter(p => p.status === 'error').length
    };
    
    document.getElementById('total-pages').textContent = stats.total;
    document.getElementById('updated-pages').textContent = stats.updated;
    document.getElementById('pending-pages').textContent = stats.pending;
    document.getElementById('error-pages').textContent = stats.error;
}

// Render pages table
function renderPagesTable() {
    const tbody = document.getElementById('pages-tbody');
    tbody.innerHTML = samplePages.map(page => `
        <tr>
            <td>${page.title}</td>
            <td><a href="${page.url}" target="_blank">${page.url}</a></td>
            <td><span class="status-badge status-${page.status}">${getStatusText(page.status)}</span></td>
            <td>${page.lastScan}</td>
            <td>
                <button class="btn btn-secondary" style="padding: 8px 15px; font-size: 0.9em;" onclick="viewPage(${page.id})">
                    👁️ View
                </button>
            </td>
        </tr>
    `).join('');
}

// Render activity feed
function renderActivityFeed() {
    const feed = document.getElementById('activity-feed');
    feed.innerHTML = sampleActivity.map(activity => `
        <div class="activity-item ${activity.type}">
            <strong>${activity.time}</strong> - ${activity.message}
        </div>
    `).join('');
}

// Helper functions
function getStatusText(status) {
    const statusMap = {
        'updated': 'Updated',
        'pending': 'Pending',
        'error': 'Error'
    };
    return statusMap[status] || status;
}

function viewPage(id) {
    const page = samplePages.find(p => p.id === id);
    if (page) {
        window.open(page.url, '_blank');
    }
}

function scanAllPages() {
    alert('🔍 Starting scan of all pages...\nThis will take a few minutes.');
    // Add actual scan logic here
}

function updatePendingPages() {
    const pendingCount = samplePages.filter(p => p.status === 'pending').length;
    alert(`⬆️ Updating ${pendingCount} pending pages...`);
    // Add actual update logic here
}

function exportReport() {
    alert('📊 Exporting report...\nThe report will be sent to your email.');
    // Add actual export logic here
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initDashboard);
