// Authentication
const AUTH_KEY = 'wp_monitor_auth';
const AUTH_PASS = 'MaximoSEO2026!';
const RESET_EMAIL = 'service@maximo-seo.com';

function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
}

function authenticate(password) {
    if (password === AUTH_PASS) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        return true;
    }
    return false;
}

function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    location.reload();
}

// Auth UI
document.addEventListener('DOMContentLoaded', function() {
    const authOverlay = document.getElementById('authOverlay');
    const container = document.querySelector('.container');
    const loginForm = document.getElementById('loginForm');
    const resetForm = document.getElementById('resetForm');
    const authPassword = document.getElementById('authPassword');
    const authSubmit = document.getElementById('authSubmit');
    const authError = document.getElementById('authError');
    const forgotPassword = document.getElementById('forgotPassword');
    const resetSubmit = document.getElementById('resetSubmit');
    const resetEmail = document.getElementById('resetEmail');
    const resetSuccess = document.getElementById('resetSuccess');
    const backToLogin = document.getElementById('backToLogin');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check if already authenticated
    if (isAuthenticated()) {
        authOverlay.style.display = 'none';
        container.classList.add('visible');
        loadDashboard();
    }

    // Login handler
    function handleLogin() {
        const password = authPassword.value;
        if (authenticate(password)) {
            authOverlay.style.display = 'none';
            container.classList.add('visible');
            loadDashboard();
        } else {
            authError.style.display = 'block';
            setTimeout(() => authError.style.display = 'none', 3000);
        }
    }

    authSubmit.addEventListener('click', handleLogin);
    authPassword.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    // Forgot password handler
    forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        resetForm.style.display = 'block';
    });

    // Reset password handler
    resetSubmit.addEventListener('click', () => {
        const email = resetEmail.value;
        if (email === RESET_EMAIL) {
            // Simulate sending reset code
            resetSuccess.style.display = 'block';
            setTimeout(() => {
                resetSuccess.style.display = 'none';
                resetForm.style.display = 'none';
                loginForm.style.display = 'block';
            }, 3000);
        } else {
            alert('כתובת מייל לא נכונה');
        }
    });

    // Back to login
    backToLogin.addEventListener('click', () => {
        resetForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Logout handler
    logoutBtn.addEventListener('click', logout);
});

// Dashboard Functions
function loadDashboard() {
    loadPages();
    loadActivity();
    updateStats();
}

function loadPages() {
    const samplePages = [
        { title: 'דף הבית - MaximoSEO', url: 'https://maximo-seo.com', status: 'updated', date: '2026-06-02 13:00:00' },
        { title: 'שירותי SEO', url: 'https://maximo-seo.com/services', status: 'pending', date: '2026-06-02 12:45:00' },
        { title: 'אודותינו', url: 'https://maximo-seo.com/about', status: 'updated', date: '2026-06-02 12:30:00' },
        { title: 'בלוג - טיפים ל-SEO', url: 'https://maximo-seo.com/blog', status: 'error', date: '2026-06-02 12:15:00' }
    ];

    const tbody = document.getElementById('pages-tbody');
    tbody.innerHTML = '';

    samplePages.forEach(page => {
        const row = document.createElement('tr');
        const statusClass = `status-${page.status}`;
        const statusText = page.status === 'updated' ? 'מעודכן' : page.status === 'pending' ? 'ממתין' : 'שגיאה';
        
        row.innerHTML = `
            <td>${page.title}</td>
            <td><a href="${page.url}" target="_blank" style="color: #bb86fc;">${page.url}</a></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>${page.date}</td>
            <td><button class="btn btn-secondary" onclick="viewPage('${page.url}')" style="padding: 8px 16px; font-size: 0.9em;">👁️ צפה</button></td>
        `;
        tbody.appendChild(row);
    });
}

function loadActivity() {
    const activities = [
        { text: '✅ דף הבית עודכן בהצלחה', type: 'success', time: '13:00' },
        { text: '⏳ שירותי SEO ממתין לעדכון', type: 'warning', time: '12:45' },
        { text: '✅ אודותינו עודכן בהצלחה', type: 'success', time: '12:30' },
        { text: '❌ שגיאה בעדכון בלוג', type: 'error', time: '12:15' }
    ];

    const feed = document.getElementById('activity-feed');
    feed.innerHTML = '';

    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = `activity-item ${activity.type}`;
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>${activity.text}</span>
                <span style="color: #a0a0a0; font-size: 0.9em;">${activity.time}</span>
            </div>
        `;
        feed.appendChild(item);
    });
}

function updateStats() {
    document.getElementById('total-pages').textContent = '4';
    document.getElementById('updated-pages').textContent = '2';
    document.getElementById('pending-pages').textContent = '1';
    document.getElementById('error-pages').textContent = '1';
}

function scanAllPages() {
    alert('🔍 סורק את כל הדפים...');
}

function updatePendingPages() {
    alert('⬆️ מעדכן דפים ממתינים...');
}

function exportReport() {
    alert('📊 מייצא דוח...');
}

function viewPage(url) {
    window.open(url, '_blank');
}
