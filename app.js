/* ============================================
   TILT - APAC Market Labelling Instruction Tool
   Application Logic
   ============================================ */

// ---- Password Gate ----
const GATE_HASH = '5a7d4c8e'; // simple hash of the password
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

function checkGatePassword() {
  const input = document.getElementById('gate-password').value;
  if (input === 'local2026!') {
    sessionStorage.setItem('tilt-access', 'granted');
    document.getElementById('password-gate').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  } else {
    document.getElementById('gate-error').style.display = 'block';
    document.getElementById('gate-password').value = '';
    document.getElementById('gate-password').focus();
  }
}

// Check on load if already authenticated this session
if (sessionStorage.getItem('tilt-access') === 'granted') {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('password-gate').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  });
}

// ---- Sample Data ----
const sampleInstructions = [
  { id: 'LI-2026-0047', market: 'KR', brand: 'Dior', sku: 'F068920009', desc: 'Rouge Dior Lipstick #999', controlPoint: 'Effective date - Apr 2026', status: 'completed', statusText: 'Completed', updated: '2026-03-16', updatedBy: 'Kim Soo-jin', color: '#C41E3A', fontColor: 'White', size: '48mm x 32mm', location: 'Back panel', language: 'Korean', ingredientVer: 'v3.2', awId: 'AW-KR-2026-0188' },
  { id: 'LI-2026-0046', market: 'JP', brand: 'Givenchy', sku: 'P056321004', desc: 'Le Rouge Interdit Cream', controlPoint: 'First batch - Mar 2026', status: 'pending', statusText: 'Waiting LI Validation', updated: '2026-03-16', updatedBy: 'Tanaka Yuki', color: 'Black', fontColor: 'Gold', size: '45mm x 30mm', location: 'Side panel', language: 'Japanese', ingredientVer: 'v2.8', awId: 'AW-JP-2026-0321' },
  { id: 'LI-2026-0045', market: 'TH', brand: 'Fenty Beauty', sku: 'M078432001', desc: 'Gloss Bomb Universal Lip Luminizer', controlPoint: 'First batch - Feb 2026', status: 'rejected', statusText: 'Label Position Rejected', updated: '2026-03-15', updatedBy: 'Siriporn W.', color: 'White', fontColor: 'Black', size: '50mm x 35mm', location: 'Bottom', language: 'Thai', ingredientVer: 'v1.5', awId: 'AW-TH-2026-0097' },
  { id: 'LI-2026-0044', market: 'TW', brand: 'Benefit', sku: 'C091287003', desc: 'BADgal BANG! Volumizing Mascara', controlPoint: 'Effective date - May 2026', status: 'validated', statusText: 'Position Validated', updated: '2026-03-15', updatedBy: 'Chen Wei-lin', color: 'Pink', fontColor: 'Black', size: '40mm x 25mm', location: 'Front panel', language: 'Traditional Chinese', ingredientVer: 'v4.0', awId: 'AW-TW-2026-0145' },
  { id: 'LI-2026-0043', market: 'SG-MY', brand: 'Fresh', sku: 'S046718002', desc: 'Rose Deep Hydration Moisturizer', controlPoint: 'First batch - Apr 2026', status: 'draft', statusText: 'Drafted', updated: '2026-03-14', updatedBy: 'Lim Mei Ting', color: 'White', fontColor: 'Green', size: '55mm x 40mm', location: 'Back panel', language: 'English', ingredientVer: 'v2.1', awId: 'AW-SG-2026-0063' },
  { id: 'LI-2026-0042', market: 'KR', brand: 'Dior', sku: 'F068920010', desc: 'Dior Addict Lip Glow Oil', controlPoint: 'Effective date - Apr 2026', status: 'pending', statusText: 'Waiting LI Validation', updated: '2026-03-15', updatedBy: 'Kim Soo-jin', color: 'Transparent', fontColor: 'Black', size: '42mm x 28mm', location: 'Back panel', language: 'Korean', ingredientVer: 'v3.1', awId: 'AW-KR-2026-0189' },
  { id: 'LI-2026-0041', market: 'HK', brand: 'Guerlain', sku: 'G034561007', desc: 'Abeille Royale Youth Watery Oil', controlPoint: 'First batch - Mar 2026', status: 'completed', statusText: 'Completed', updated: '2026-03-13', updatedBy: 'Lee Wing-yan', color: 'Gold', fontColor: 'Black', size: '60mm x 45mm', location: 'Back panel', language: 'Traditional Chinese', ingredientVer: 'v5.0', awId: 'AW-HK-2026-0072' },
  { id: 'LI-2026-0040', market: 'VN', brand: 'Make Up For Ever', sku: 'U089123005', desc: 'HD Skin Foundation', controlPoint: 'Effective date - Jun 2026', status: 'draft', statusText: 'Drafted', updated: '2026-03-12', updatedBy: 'Nguyen Thi Mai', color: 'Beige', fontColor: 'Dark Brown', size: '52mm x 38mm', location: 'Side panel', language: 'Vietnamese', ingredientVer: 'v1.2', awId: 'AW-VN-2026-0031' },
  { id: 'LI-2026-0039', market: 'SG-MY', brand: 'Fenty Beauty', sku: 'M078432001', desc: 'Gloss Bomb Universal Lip Luminizer', controlPoint: 'Effective date - May 2026', status: 'pending', statusText: 'Waiting Position Validation', updated: '2026-03-14', updatedBy: 'Lim Mei Ting', color: 'White', fontColor: 'Black', size: '50mm x 35mm', location: 'Bottom', language: 'English', ingredientVer: 'v1.5', awId: 'AW-SG-2026-0064' },
  { id: 'LI-2026-0038', market: 'ID', brand: 'Dior', sku: 'F068920011', desc: 'Capture Totale Serum', controlPoint: 'First batch - Apr 2026', status: 'rejected', statusText: 'LI Rejected', updated: '2026-03-11', updatedBy: 'Putri Ayu', color: 'White', fontColor: 'Navy', size: '65mm x 48mm', location: 'Back panel', language: 'Bahasa Indonesia', ingredientVer: 'v2.3', awId: 'AW-ID-2026-0018' },
];

// ---- Status map for CSS classes ----
const statusClassMap = {
  draft: 'status-draft',
  pending: 'status-pending',
  validated: 'status-validated',
  rejected: 'status-rejected',
  completed: 'status-completed',
  deleted: 'status-deleted',
};

// ---- Login Handling ----
function handleSSOLogin() {
  showToast('Redirecting to Okta SSO...');
  setTimeout(() => {
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('main-app').classList.add('active');
    document.getElementById('current-user-name').textContent = 'Crystal Yao';
    document.getElementById('current-user-role').textContent = 'Admin';
    loadInstructionsTable();
  }, 800);
}

function handleLocalLogin() {
  const username = document.getElementById('login-username').value;
  if (!username) { showToast('Please enter your username'); return; }
  document.getElementById('login-page').classList.remove('active');
  document.getElementById('main-app').classList.add('active');
  document.getElementById('current-user-name').textContent = username;
  document.getElementById('current-user-role').textContent = 'External User';
  loadInstructionsTable();
}

function logout() {
  document.getElementById('main-app').classList.remove('active');
  document.getElementById('login-page').classList.add('active');
  showToast('Signed out successfully');
}

// ---- Login Tab Switching ----
document.querySelectorAll('.login-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.login-form').forEach(f => f.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    document.getElementById(target === 'sso' ? 'sso-form' : 'local-form').classList.add('active');
  });
});

// ---- Navigation ----
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    navigateTo(item.dataset.page);
  });
});

function navigateTo(page) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.content-page').forEach(p => p.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) navItem.classList.add('active');
  const pageEl = document.getElementById(`page-${page}`);
  if (pageEl) pageEl.classList.add('active');
  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ---- Notification Panel ----
function toggleNotifications() {
  document.getElementById('notification-panel').classList.toggle('open');
}

function markAllRead() {
  document.querySelectorAll('.notif-item.unread').forEach(item => {
    item.classList.remove('unread');
  });
  document.querySelector('.notif-dot').style.display = 'none';
  showToast('All notifications marked as read');
}

// Close notification panel when clicking outside
document.addEventListener('click', (e) => {
  const panel = document.getElementById('notification-panel');
  const btn = document.querySelector('.notification-btn');
  if (panel.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)) {
    panel.classList.remove('open');
  }
});

// ---- Instructions Table ----
function loadInstructionsTable() {
  const tbody = document.getElementById('instructions-tbody');
  if (!tbody) return;
  tbody.innerHTML = sampleInstructions.map(instr => `
    <tr>
      <td><input type="checkbox"></td>
      <td><a href="#" onclick="viewInstruction('${instr.id}'); return false;">${instr.id}</a></td>
      <td>${instr.market}</td>
      <td>${instr.brand}</td>
      <td>${instr.sku}</td>
      <td>${instr.desc}</td>
      <td>${instr.controlPoint}</td>
      <td><span class="status-badge ${statusClassMap[instr.status]}">${instr.statusText}</span></td>
      <td>${instr.updated}</td>
      <td>
        <button class="btn-icon" title="View" onclick="viewInstruction('${instr.id}')"><i class="fas fa-eye"></i></button>
        <button class="btn-icon" title="Edit" onclick="editInstruction('${instr.id}')"><i class="fas fa-edit"></i></button>
      </td>
    </tr>
  `).join('');
}

function filterInstructions() {
  const search = document.getElementById('instruction-search').value.toLowerCase();
  const brand = document.getElementById('filter-brand').value;
  const status = document.getElementById('filter-status').value;

  const filtered = sampleInstructions.filter(instr => {
    const matchSearch = !search || instr.id.toLowerCase().includes(search) || instr.sku.toLowerCase().includes(search) || instr.desc.toLowerCase().includes(search);
    const matchBrand = !brand || instr.brand === brand;
    const matchStatus = !status || instr.status === status || (status === 'waiting-position' && instr.statusText.includes('Position Validation')) || (status === 'waiting-li' && instr.statusText.includes('LI Validation')) || (status === 'position-rejected' && instr.statusText === 'Label Position Rejected') || (status === 'position-validated' && instr.statusText === 'Position Validated') || (status === 'li-rejected' && instr.statusText === 'LI Rejected');
    return matchSearch && matchBrand && matchStatus;
  });

  const tbody = document.getElementById('instructions-tbody');
  tbody.innerHTML = filtered.map(instr => `
    <tr>
      <td><input type="checkbox"></td>
      <td><a href="#" onclick="viewInstruction('${instr.id}'); return false;">${instr.id}</a></td>
      <td>${instr.market}</td>
      <td>${instr.brand}</td>
      <td>${instr.sku}</td>
      <td>${instr.desc}</td>
      <td>${instr.controlPoint}</td>
      <td><span class="status-badge ${statusClassMap[instr.status]}">${instr.statusText}</span></td>
      <td>${instr.updated}</td>
      <td>
        <button class="btn-icon" title="View" onclick="viewInstruction('${instr.id}')"><i class="fas fa-eye"></i></button>
        <button class="btn-icon" title="Edit" onclick="editInstruction('${instr.id}')"><i class="fas fa-edit"></i></button>
      </td>
    </tr>
  `).join('');

  document.querySelector('.showing-text').textContent = `Showing 1-${filtered.length} of ${filtered.length} instructions`;
}

function clearFilters() {
  document.getElementById('instruction-search').value = '';
  document.getElementById('filter-brand').value = '';
  document.getElementById('filter-status').value = '';
  loadInstructionsTable();
  document.querySelector('.showing-text').textContent = 'Showing 1-10 of 2,847 instructions';
}

// ---- New Instruction Modal ----
function openNewInstruction() {
  document.getElementById('modal-title').textContent = 'New Labelling Instruction';
  const nextId = 'LI-2026-' + String(48 + Math.floor(Math.random() * 100)).padStart(4, '0');
  document.getElementById('li-record').value = nextId;
  openModal('instruction-modal');
}

function editInstruction(id) {
  const instr = sampleInstructions.find(i => i.id === id);
  if (!instr) return;
  document.getElementById('modal-title').textContent = `Edit Instruction — ${id}`;
  document.getElementById('li-record').value = id;
  document.getElementById('li-sku').value = instr.sku;
  document.getElementById('li-description').value = instr.desc;
  openModal('instruction-modal');
}

function saveInstruction() {
  showToast('Instruction saved as draft');
  closeModal('instruction-modal');
}

function completeInstruction() {
  showToast('Instruction submitted for validation');
  closeModal('instruction-modal');
}

// ---- View Instruction Detail ----
function viewInstruction(id) {
  const instr = sampleInstructions.find(i => i.id === id);
  if (!instr) return;

  const statusSteps = [
    { label: 'Drafted', done: true },
    { label: 'Position Validation', done: ['validated', 'pending', 'completed'].includes(instr.status) && instr.statusText !== 'Waiting Position Validation' },
    { label: 'Position Validated', done: ['validated', 'completed'].includes(instr.status) },
    { label: 'LI Validation', done: instr.status === 'completed' },
    { label: 'Completed', done: instr.status === 'completed' },
  ];

  let currentStep = 0;
  if (instr.status === 'draft') currentStep = 0;
  else if (instr.statusText.includes('Position Validation')) currentStep = 1;
  else if (instr.status === 'validated') currentStep = 2;
  else if (instr.statusText.includes('LI Validation')) currentStep = 3;
  else if (instr.status === 'completed') currentStep = 4;

  const isRejected = instr.status === 'rejected';

  document.getElementById('view-modal-body').innerHTML = `
    <div class="detail-grid">
      <div class="detail-item">
        <div class="detail-item-label">Record Number</div>
        <div class="detail-item-value"><strong>${instr.id}</strong></div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Status</div>
        <div class="detail-item-value"><span class="status-badge ${statusClassMap[instr.status]}">${instr.statusText}</span></div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Market</div>
        <div class="detail-item-value">${instr.market}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Brand</div>
        <div class="detail-item-value">${instr.brand}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">SKU #</div>
        <div class="detail-item-value">${instr.sku}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Description</div>
        <div class="detail-item-value">${instr.desc}</div>
      </div>
    </div>

    <div class="status-flow">
      ${statusSteps.map((step, i) => {
        const dotClass = isRejected && i >= currentStep ? 'rejected-dot' : step.done ? 'done' : i === currentStep + 1 && !isRejected ? 'current' : '';
        const icon = step.done ? '<i class="fas fa-check"></i>' : isRejected && i >= currentStep ? '<i class="fas fa-times"></i>' : '';
        return `
          ${i > 0 ? `<div class="flow-line ${step.done ? 'done' : ''}"></div>` : ''}
          <div class="flow-step">
            <div class="flow-dot ${dotClass}">${icon}</div>
            <span class="flow-label">${step.label}</span>
          </div>
        `;
      }).join('')}
    </div>

    <div class="detail-grid" style="margin-top: 16px;">
      <div class="detail-item">
        <div class="detail-item-label">Control Point</div>
        <div class="detail-item-value">${instr.controlPoint}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Ingredient Version</div>
        <div class="detail-item-value">${instr.ingredientVer}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Label AW ID</div>
        <div class="detail-item-value">${instr.awId}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Label Color</div>
        <div class="detail-item-value">${instr.color}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Font Color</div>
        <div class="detail-item-value">${instr.fontColor}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Label Size</div>
        <div class="detail-item-value">${instr.size}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">AW Location</div>
        <div class="detail-item-value">${instr.location}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Language</div>
        <div class="detail-item-value">${instr.language}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Last Updated By</div>
        <div class="detail-item-value">${instr.updatedBy}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Last Updated</div>
        <div class="detail-item-value">${instr.updated}</div>
      </div>
    </div>

    <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px;">
      <h4 style="font-size: 14px; margin-bottom: 12px;"><i class="fas fa-image" style="margin-right: 6px;"></i> Label AW Image</h4>
      <div style="width: 100%; height: 200px; background: #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
        <div style="text-align: center;">
          <i class="fas fa-file-image" style="font-size: 40px; display: block; margin-bottom: 8px;"></i>
          <span>${instr.awId}.pdf</span>
        </div>
      </div>
    </div>
  `;

  openModal('view-modal');
}

function goBack() {
  closeModal('view-modal');
}

// ---- SKU Search ----
document.querySelectorAll('.search-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.search-mode').forEach(m => m.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.search;
    document.getElementById(target + '-search').classList.add('active');
  });
});

function searchSKU() {
  const sku = document.getElementById('sku-input').value.trim();
  if (!sku) { showToast('Please enter a SKU number'); return; }

  const results = sampleInstructions.filter(i => i.sku.toLowerCase().includes(sku.toLowerCase()));
  displaySKUResults(sku, results);
}

function simulateScan() {
  const randomSKU = sampleInstructions[Math.floor(Math.random() * sampleInstructions.length)].sku;
  showToast(`Barcode scanned: ${randomSKU}`);
  document.getElementById('sku-input').value = randomSKU;

  // Switch to manual tab to show result
  document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.search-mode').forEach(m => m.classList.remove('active'));
  document.querySelector('.search-tab[data-search="manual"]').classList.add('active');
  document.getElementById('manual-search').classList.add('active');

  const results = sampleInstructions.filter(i => i.sku === randomSKU);
  displaySKUResults(randomSKU, results);
}

function displaySKUResults(sku, results) {
  const container = document.getElementById('sku-results');
  const body = document.getElementById('sku-results-body');
  document.getElementById('searched-sku').textContent = sku;
  document.getElementById('result-count').textContent = `${results.length} instruction(s) found`;

  if (results.length === 0) {
    body.innerHTML = '<div style="text-align:center; padding: 40px; color: #94a3b8;"><i class="fas fa-search" style="font-size: 32px; display: block; margin-bottom: 12px;"></i><p>No labelling instructions found for this SKU</p></div>';
  } else if (results.length === 1) {
    // Single result - show directly
    const r = results[0];
    body.innerHTML = `
      <div class="result-card" onclick="viewInstruction('${r.id}')">
        <div class="result-card-header">
          <h4>${r.id} — ${r.brand} ${r.desc}</h4>
          <span class="status-badge ${statusClassMap[r.status]}">${r.statusText}</span>
        </div>
        <div class="result-card-details">
          <div class="result-detail"><span class="result-detail-label">Market</span>${r.market}</div>
          <div class="result-detail"><span class="result-detail-label">Control Point</span>${r.controlPoint}</div>
          <div class="result-detail"><span class="result-detail-label">Label Location</span>${r.location}</div>
          <div class="result-detail"><span class="result-detail-label">Label Color</span>${r.color}</div>
          <div class="result-detail"><span class="result-detail-label">Size</span>${r.size}</div>
          <div class="result-detail"><span class="result-detail-label">Language</span>${r.language}</div>
        </div>
      </div>
    `;
  } else {
    // Multiple results - let user choose
    body.innerHTML = `
      <p style="margin-bottom: 12px; color: #64748b;">Multiple instructions found. Please select the applicable instruction:</p>
      ${results.map(r => `
        <div class="result-card" onclick="viewInstruction('${r.id}')">
          <div class="result-card-header">
            <h4>${r.id} — ${r.brand}</h4>
            <span class="status-badge ${statusClassMap[r.status]}">${r.statusText}</span>
          </div>
          <div class="result-card-details">
            <div class="result-detail"><span class="result-detail-label">Market</span>${r.market}</div>
            <div class="result-detail"><span class="result-detail-label">Control Point</span>${r.controlPoint}</div>
            <div class="result-detail"><span class="result-detail-label">Description</span>${r.desc}</div>
          </div>
        </div>
      `).join('')}
    `;
  }

  container.style.display = 'block';
}

// ---- Approval Actions ----
document.querySelectorAll('.approval-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.approval-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.approval-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.atab).classList.add('active');
  });
});

function approveItem(id) {
  showToast(`${id} has been approved`);
  // Remove from pending list visually
  event.target.closest('.approval-card').style.opacity = '0.5';
  setTimeout(() => {
    event.target.closest('.approval-card').style.display = 'none';
    updateApprovalBadge();
  }, 500);
}

function rejectItem(id) {
  const reason = prompt('Please provide a reason for rejection:');
  if (reason) {
    showToast(`${id} has been rejected`);
    event.target.closest('.approval-card').style.opacity = '0.5';
    setTimeout(() => {
      event.target.closest('.approval-card').style.display = 'none';
      updateApprovalBadge();
    }, 500);
  }
}

function reassignItem(id) {
  showToast(`Reassignment dialog for ${id} — select a user to reassign`);
}

function updateApprovalBadge() {
  const visibleCards = document.querySelectorAll('#pending-approvals .approval-card:not([style*="display: none"])');
  const badge = document.getElementById('approval-badge');
  badge.textContent = visibleCards.length;
}

// ---- Import/Export ----
function openBulkUpload() {
  navigateTo('import-export');
}

// Drag and drop
const uploadZone = document.getElementById('upload-zone');
if (uploadZone) {
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
  });
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    showToast(`${e.dataTransfer.files.length} file(s) selected for import`);
  });
  uploadZone.addEventListener('click', () => {
    document.getElementById('file-input').click();
  });
}

// Format options
document.querySelectorAll('.format-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.format-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

// ---- User Management ----
function openNewUser() {
  showToast('User creation form — configure role, market, team, and language');
}

// ---- Market Filter ----
function changeMarket(market) {
  if (market === 'all') {
    showToast('Showing all markets');
  } else {
    showToast(`Filtered to ${market} market`);
  }
}

// ---- Language ----
const translations = {
  en: { dashboard: 'Dashboard', instructions: 'Labelling Instructions', search: 'SKU Search', approvals: 'Approvals' },
  ja: { dashboard: 'ダッシュボード', instructions: 'ラベル表示手順', search: 'SKU検索', approvals: '承認' },
  ko: { dashboard: '대시보드', instructions: '라벨링 지침', search: 'SKU 검색', approvals: '승인' },
  'zh-tw': { dashboard: '儀表板', instructions: '標籤說明', search: 'SKU搜尋', approvals: '審批' },
  th: { dashboard: 'แดชบอร์ด', instructions: 'คำแนะนำการติดฉลาก', search: 'ค้นหา SKU', approvals: 'การอนุมัติ' },
  vi: { dashboard: 'Bảng điều khiển', instructions: 'Hướng dẫn dán nhãn', search: 'Tìm kiếm SKU', approvals: 'Phê duyệt' },
  id: { dashboard: 'Dasbor', instructions: 'Instruksi Pelabelan', search: 'Cari SKU', approvals: 'Persetujuan' },
};

function changeLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  // Update navigation labels
  const navLabels = ['dashboard', 'instructions', 'search', 'approvals'];
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const page = item.dataset.page;
    if (page === 'sku-search' && t.search) {
      item.querySelector('span').textContent = t.search;
    } else if (t[page]) {
      item.querySelector('span').textContent = t[page];
    }
  });

  showToast(`Language changed to ${lang.toUpperCase()}`);
}

// ---- Modal Utilities ----
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

// ---- Toast Notification ----
function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  loadInstructionsTable();
});

// Handle Enter key on SKU input
document.getElementById('sku-input')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchSKU();
});

// Select all checkbox
document.getElementById('select-all-instructions')?.addEventListener('change', (e) => {
  document.querySelectorAll('#instructions-tbody input[type="checkbox"]').forEach(cb => {
    cb.checked = e.target.checked;
  });
});
