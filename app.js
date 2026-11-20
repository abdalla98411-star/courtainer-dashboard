// public/app.js - منطق التطبيق وحسابات الواجهة والرسم والتكامل مع أودو

// حالة التطبيق (State)
const state = {
  activeTab: 'inspection',
  meetingStep: 1,
  inspection: {
    window_type: 'شباك',
    right_width: 75,
    window_width: 150,
    left_width: 75,
    total_width: 300,
    pocket_width: 300,
    total_height: 280,
    window_height: 140,
    above_window: 50,
    below_window: 90,
    pocket_drop: 15,
    pocket_depth: 25,
    suggestedCurtainWidth: 300,
    suggestedCurtainHeight: 263
  },
  currentRoom: {
    name: 'غرفة النوم الرئيسية',
    width: 300,
    height: 250,
    has_incline: false,
    incline_right: 290,
    incline_center: 270,
    incline_left: 250,
    installation_on: 'سقف',
    ceiling_material: 'جبس',
    ceiling_shape: 'بيت ستارة',
    curtain_box_depth: 25,
    curtain_box_height: 15,
    window_open_type: 'جرار',
    order_type: 'جديد',
    work_stage: 'تركيب',
    expected_delivery: dateOffset(14),
    pelmet_type: 'تشييد بوكس',
    pelmet_meters: 3.2,
    technical_notes: 'يراعى تركيب محول الريل الكهربائي بجوار فتحة الكهرباء اليمنى، وترك مسافة 5 سم للتهوية.',
    sketch_image: '',
    layers: [
      {
        order: 1,
        fabric_type: 'تقيل',
        category: 'مخمل قطيفة فاخر',
        code: 'VEL-304',
        tailoring_type: 'ويفي',
        roll_width: 'عريض',
        height_addition: 25,
        pieces_count: 'قطعتان',
        curtain_shape: 'عادية',
        rail_type: 'عادي',
        color: 'تاوبي #a08a76',
        price_per_meter: 650,
        tailoring_price_per_meter: 60,
        discount_pct: 0
      },
      {
        order: 2,
        fabric_type: 'خفيف',
        category: 'شيفون تركي ناعم',
        code: 'SHF-102',
        tailoring_type: 'ويفي',
        roll_width: 'عرض',
        height_addition: 25,
        pieces_count: 'قطعتان',
        curtain_shape: 'عادية',
        rail_type: 'ريل كهربائي',
        color: 'عاجي #f2eee6',
        price_per_meter: 280,
        tailoring_price_per_meter: 50,
        discount_pct: 0
      }
    ],
    accessories: [],
    tassels: [
      { item: 'حزام', code: 'BELT-01', quantity: 2, unit_price: 150, discount_pct: 0 },
      { item: 'شرابة ديكور', code: 'TAS-05', quantity: 2, unit_price: 220, discount_pct: 0 }
    ]
  },
  activeLayerIndex: 0,
  calculation: null,
  crmLeads: []
};

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  renderLayerTabs();
  recalculateInspection();
  triggerRecalculate();
  loadCRMData();
  setDefaultDates();
});

// ==========================================
// إدارة كروكي المعاينة البصرية (Inspection Sketch)
// ==========================================
function recalculateInspection() {
  const wRight = parseFloat(document.getElementById('insp_right_width')?.value) || 0;
  const wWindow = parseFloat(document.getElementById('insp_window_width')?.value) || 0;
  const wLeft = parseFloat(document.getElementById('insp_left_width')?.value) || 0;
  const wTotal = parseFloat(document.getElementById('insp_total_width')?.value) || 0;
  const wPocket = parseFloat(document.getElementById('insp_pocket_width')?.value) || 0;

  const hTotal = parseFloat(document.getElementById('insp_total_height')?.value) || 0;
  const hWindow = parseFloat(document.getElementById('insp_window_height')?.value) || 0;
  const hAbove = parseFloat(document.getElementById('insp_above_window')?.value) || 0;
  const hBelow = parseFloat(document.getElementById('insp_below_window')?.value) || 0;
  const hDrop = parseFloat(document.getElementById('insp_pocket_drop')?.value) || 0;
  const hDepth = parseFloat(document.getElementById('insp_pocket_depth')?.value) || 0;

  // 1. تدقيق التناسق الأفقي (يمين + شباك + يسار = إجمالي)
  const horizSum = wRight + wWindow + wLeft;
  const horizHint = document.getElementById('insp_horiz_sum_hint');
  if (horizHint) {
    horizHint.innerText = `المجموع الأفقي: ${wRight} + ${wWindow} + ${wLeft} = ${horizSum} سم (الإجمالي المدخل: ${wTotal} سم)`;
  }

  // 2. تدقيق التناسق الرأسي (أعلى + شباك + أسفل = إجمالي)
  const vertSum = hAbove + hWindow + hBelow;
  const vertHint = document.getElementById('insp_vert_sum_hint');
  if (vertHint) {
    vertHint.innerText = `المجموع الرأسي: ${hAbove} + ${hWindow} + ${hBelow} = ${vertSum} سم`;
  }

  // شارة التناسق
  const badge = document.getElementById('insp_consistency_badge');
  const isHorizOk = (wTotal === 0 || Math.abs(horizSum - wTotal) <= 3);
  const isVertOk = (hTotal === 0 || Math.abs(vertSum - hTotal) <= 3);

  if (badge) {
    if (isHorizOk && isVertOk) {
      badge.innerText = 'الأبعاد متطابقة ودقيقة ✓';
      badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800';
    } else {
      badge.innerText = 'تنبيه: يوجد فرق في تجميع المقاسات ⚠️';
      badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800';
    }
  }

  // 3. الاحتساب الذكي لمقاسات الستارة المقترحة:
  // - عرض الستارة: إذا كان هناك بيت ستارة بمقاس، يؤخذ عرضه. وإلا عرض الشباك + الزيادات
  let suggestedW = 0;
  let reasonW = '';
  if (wPocket > 0) {
    suggestedW = wPocket;
    reasonW = '(كامل عرض بيت الستارة)';
  } else if (wTotal > 0 && wTotal <= (wWindow + 60)) {
    suggestedW = wTotal;
    reasonW = '(كامل عرض الحائط)';
  } else if (wWindow > 0) {
    const margin = Math.min(wRight, 25) + Math.min(wLeft, 25);
    suggestedW = wWindow + (margin > 0 ? margin : 40);
    reasonW = `(عرض الشباك ${wWindow} + زيادة جانبية ${suggestedW - wWindow} سم)`;
  } else {
    suggestedW = wTotal || 300;
    reasonW = '(العرض الكلي للحائط)';
  }

  // - ارتفاع الستارة: الارتفاع الكلي - سقوط بيت الستارة - 2 سم خلوص
  const effH = hTotal > 0 ? hTotal : (vertSum > 0 ? vertSum : 280);
  const suggestedH = Math.max(100, Math.round(effH - hDrop - 2));
  const reasonH = `(الارتفاع الكلي ${effH} - سقوط ${hDrop} - خلوص 2 سم)`;

  state.inspection = {
    ...state.inspection,
    right_width: wRight,
    window_width: wWindow,
    left_width: wLeft,
    total_width: wTotal || horizSum,
    pocket_width: wPocket,
    total_height: effH,
    window_height: hWindow,
    above_window: hAbove,
    below_window: hBelow,
    pocket_drop: hDrop,
    pocket_depth: hDepth,
    suggestedCurtainWidth: suggestedW,
    suggestedCurtainHeight: suggestedH
  };

  const badgeW = document.getElementById('suggested_curtain_w_badge');
  const badgeH = document.getElementById('suggested_curtain_h_badge');
  const reasonWEl = document.getElementById('suggested_w_reason');
  const reasonHEl = document.getElementById('suggested_h_reason');

  if (badgeW) badgeW.innerText = `${suggestedW} سم`;
  if (badgeH) badgeH.innerText = `${suggestedH} سم`;
  if (reasonWEl) reasonWEl.innerText = reasonW;
  if (reasonHEl) reasonHEl.innerText = reasonH;
}

function setWindowOpeningMode(mode) {
  const btnWindow = document.getElementById('btn-mode-window');
  const btnBalcony = document.getElementById('btn-mode-balcony');
  const sillBar = document.getElementById('window-sill-bar');
  const belowContainer = document.getElementById('below-window-container');
  const windowBox = document.getElementById('window-visual-box');

  if (mode === 'balcony') {
    state.inspection.window_type = 'باب بلكونة';
    btnBalcony.className = 'px-3 py-1.5 rounded-md bg-indigo-600 text-white shadow font-bold';
    btnWindow.className = 'px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900';
    
    // باب البلكونة يصل للأرض (جلسة منخفضة جداً)
    document.getElementById('insp_below_window').value = 5;
    document.getElementById('insp_window_height').value = 225;
    if (windowBox) windowBox.style.minHeight = '300px';
  } else {
    state.inspection.window_type = 'شباك';
    btnWindow.className = 'px-3 py-1.5 rounded-md bg-indigo-600 text-white shadow font-bold';
    btnBalcony.className = 'px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900';
    
    document.getElementById('insp_below_window').value = 90;
    document.getElementById('insp_window_height').value = 140;
    if (windowBox) windowBox.style.minHeight = '220px';
  }
  recalculateInspection();
}

function resetInspectionDefaults() {
  document.getElementById('insp_right_width').value = 75;
  document.getElementById('insp_window_width').value = 150;
  document.getElementById('insp_left_width').value = 75;
  document.getElementById('insp_total_width').value = 300;
  document.getElementById('insp_pocket_width').value = 300;
  document.getElementById('insp_total_height').value = 280;
  document.getElementById('insp_window_height').value = 140;
  document.getElementById('insp_above_window').value = 50;
  document.getElementById('insp_below_window').value = 90;
  document.getElementById('insp_pocket_drop').value = 15;
  document.getElementById('insp_pocket_depth').value = 25;
  setWindowOpeningMode('window');
  recalculateInspection();
}

function syncClientDataToMeeting() {
  const cName = document.getElementById('insp_client_name')?.value || '';
  const cPhone = document.getElementById('insp_client_phone')?.value || '';
  const rName = document.getElementById('insp_room_name')?.value || '';

  if (document.getElementById('client_name')) document.getElementById('client_name').value = cName;
  if (document.getElementById('client_phone')) document.getElementById('client_phone').value = cPhone;
  if (document.getElementById('room_name')) document.getElementById('room_name').value = rName;
}

/**
 * نقل مقاسات المعاينة المعتمدة مباشرة إلى شاشة التسعير والأقمشة
 */
function transferInspectionToCurtainPricing() {
  recalculateInspection();
  syncClientDataToMeeting();

  // ترحيل العرض والارتفاع المقترحين
  const finalW = state.inspection.suggestedCurtainWidth || 300;
  const finalH = state.inspection.suggestedCurtainHeight || 263;
  const depth = state.inspection.pocket_depth || 25;
  const drop = state.inspection.pocket_drop || 15;

  document.getElementById('room_width').value = finalW;
  document.getElementById('room_height').value = finalH;
  document.getElementById('pocket_depth').value = depth;
  document.getElementById('pocket_height').value = drop;

  // إذا تم اختيار باب بلكونة أو شباك ننقله
  if (document.getElementById('window_open_type')) {
    document.getElementById('window_open_type').value = state.inspection.window_type === 'باب بلكونة' ? 'جرار' : 'مفصلي';
  }

  // التبديل إلى تبويب التسعير وإعادة الحساب فوراً
  switchTab('meeting');
  setMeetingStep(1);
  triggerRecalculate();

  alert(`✓ تم اعتماد مقاسات المعاينة بنجاح ونقلها لشاشة التفصيل:\n- عرض الستارة: ${finalW} سم\n- ارتفاع الستارة: ${finalH} سم\n- عمق بيت الستارة: ${depth} سم`);
}

/**
 * حفظ المعاينة في السجل عبر API
 */
async function saveInspectionToDB() {
  recalculateInspection();
  const payload = {
    customer_name: document.getElementById('insp_client_name').value,
    customer_phone: document.getElementById('insp_client_phone').value,
    room_name: document.getElementById('insp_room_name').value,
    window_type: state.inspection.window_type,
    right_width: state.inspection.right_width,
    window_width: state.inspection.window_width,
    left_width: state.inspection.left_width,
    total_width: state.inspection.total_width,
    pocket_width: state.inspection.pocket_width,
    total_height: state.inspection.total_height,
    window_height: state.inspection.window_height,
    above_window: state.inspection.above_window,
    below_window: state.inspection.below_window,
    pocket_drop: state.inspection.pocket_drop,
    pocket_depth: state.inspection.pocket_depth,
    obstacles_notes: document.getElementById('insp_obstacles').value
  };

  try {
    const res = await fetch('/api/v1/inspections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      alert(`✓ تم حفظ المعاينة في قاعدة البيانات بنجاح! (معرف: #${result.inspection_id})`);
    }
  } catch (err) {
    alert('حدث خطأ أثناء حفظ المعاينة: ' + err.message);
  }
}

function setDefaultDates() {
  const d = new Date().toISOString().split('T')[0];
  document.getElementById('expected_delivery').value = dateOffset(14);
  document.getElementById('sheet_date').innerText = d;
  document.getElementById('sheet_due_date').innerText = dateOffset(14);
  document.getElementById('quote_date').innerText = d;
}

function dateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// ==========================================
// التبويبات والخطوات
// ==========================================
function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(el => {
    el.classList.remove('bg-indigo-800', 'text-white', 'shadow');
    el.classList.add('text-indigo-200');
  });

  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) activeContent.classList.remove('hidden');

  const activeNav = document.getElementById(`nav-${tabId}`);
  if (activeNav) {
    activeNav.classList.add('bg-indigo-800', 'text-white', 'shadow');
    activeNav.classList.remove('text-indigo-200');
  }

  if (tabId === 'jobSheet') updateJobSheetView();
  if (tabId === 'quoteSheet') updateQuoteSheetView();
  if (tabId === 'crm') loadCRMData();
  if (tabId === 'odoo') fetchOdooPayload();
}

function setMeetingStep(step) {
  state.meetingStep = step;
  if (step === 1) {
    document.getElementById('meeting-step-1').classList.remove('hidden');
    document.getElementById('meeting-step-2').classList.add('hidden');
    document.getElementById('step-btn-1').className = 'flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm bg-indigo-50 text-indigo-700 border border-indigo-200';
    document.getElementById('step-btn-2').className = 'flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-slate-500 hover:bg-slate-50 border border-transparent';
  } else {
    document.getElementById('meeting-step-1').classList.add('hidden');
    document.getElementById('meeting-step-2').classList.remove('hidden');
    document.getElementById('step-btn-2').className = 'flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm bg-indigo-50 text-indigo-700 border border-indigo-200';
    document.getElementById('step-btn-1').className = 'flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-slate-500 hover:bg-slate-50 border border-transparent';
  }
}

function toggleInclineFields() {
  const val = document.getElementById('has_incline').value === 'true';
  const box = document.getElementById('incline_fields');
  if (val) {
    box.classList.remove('hidden');
  } else {
    box.classList.add('hidden');
  }
}

// ==========================================
// إدارة الطبقات (Layers)
// ==========================================
function renderLayerTabs() {
  const container = document.getElementById('layer-tabs');
  container.innerHTML = '';
  
  state.currentRoom.layers.forEach((l, idx) => {
    const btn = document.createElement('button');
    btn.className = `px-3 py-1 rounded text-xs font-bold transition ${
      state.activeLayerIndex === idx
        ? 'bg-indigo-600 text-white shadow'
        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    }`;
    btn.innerText = `طبقة ${idx + 1} (${l.fabric_type})`;
    btn.onclick = () => selectLayer(idx);
    container.appendChild(btn);
  });

  if (state.currentRoom.layers.length < 5) {
    const addBtn = document.createElement('button');
    addBtn.className = 'px-2 py-1 rounded text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold';
    addBtn.innerText = '+ طبقة جديدة';
    addBtn.onclick = addNewLayer;
    container.appendChild(addBtn);
  }

  loadActiveLayerToForm();
}

function selectLayer(idx) {
  state.activeLayerIndex = idx;
  renderLayerTabs();
}

function addNewLayer() {
  if (state.currentRoom.layers.length >= 5) return;
  const newIdx = state.currentRoom.layers.length + 1;
  state.currentRoom.layers.push({
    order: newIdx,
    fabric_type: 'بلاك',
    category: 'بلاك أوت معتم',
    code: `BLK-0${newIdx}`,
    tailoring_type: 'عادي',
    roll_width: 'عريض',
    height_addition: 25,
    pieces_count: 'قطعتان',
    curtain_shape: 'عادية',
    rail_type: 'عادي',
    color: 'بيج #d8c9a8',
    price_per_meter: 400,
    tailoring_price_per_meter: 40,
    discount_pct: 0
  });
  state.activeLayerIndex = state.currentRoom.layers.length - 1;
  renderLayerTabs();
  triggerRecalculate();
}

function loadActiveLayerToForm() {
  const layer = state.currentRoom.layers[state.activeLayerIndex];
  if (!layer) return;

  document.getElementById('layer_fabric_type').value = layer.fabric_type || 'تقيل';
  document.getElementById('layer_category').value = layer.category || '';
  document.getElementById('layer_code').value = layer.code || '';
  document.getElementById('layer_tailoring_type').value = layer.tailoring_type || 'ويفي';
  document.getElementById('layer_roll_width').value = layer.roll_width || 'عريض';
  document.getElementById('layer_height_add').value = layer.height_addition !== undefined ? layer.height_addition : 25;
  document.getElementById('layer_rail_type').value = layer.rail_type || 'عادي';
  document.getElementById('layer_color').value = layer.color || '';
  document.getElementById('layer_price').value = layer.price_per_meter || 0;
  document.getElementById('layer_tailoring_price').value = layer.tailoring_price_per_meter || 0;
  document.getElementById('layer_discount').value = layer.discount_pct || 0;
  document.getElementById('layer_curtain_shape').value = layer.curtain_shape || 'عادية';
}

function updateCurrentLayer() {
  const layer = state.currentRoom.layers[state.activeLayerIndex];
  if (!layer) return;

  layer.fabric_type = document.getElementById('layer_fabric_type').value;
  layer.category = document.getElementById('layer_category').value;
  layer.code = document.getElementById('layer_code').value;
  layer.tailoring_type = document.getElementById('layer_tailoring_type').value;
  layer.roll_width = document.getElementById('layer_roll_width').value;
  layer.height_addition = parseFloat(document.getElementById('layer_height_add').value) || 25;
  layer.rail_type = document.getElementById('layer_rail_type').value;
  layer.color = document.getElementById('layer_color').value;
  layer.price_per_meter = parseFloat(document.getElementById('layer_price').value) || 0;
  layer.tailoring_price_per_meter = parseFloat(document.getElementById('layer_tailoring_price').value) || 0;
  layer.discount_pct = parseFloat(document.getElementById('layer_discount').value) || 0;
  layer.curtain_shape = document.getElementById('layer_curtain_shape').value;

  triggerRecalculate();
}

// ==========================================
// محرك الحسابات الفوري (Recalculate)
// ==========================================
async function triggerRecalculate() {
  // تجميع معطيات الغرفة الحالية
  state.currentRoom.width = parseFloat(document.getElementById('room_width').value) || 300;
  state.currentRoom.height = parseFloat(document.getElementById('room_height').value) || 250;
  state.currentRoom.has_incline = document.getElementById('has_incline').value === 'true';
  state.currentRoom.incline_right = parseFloat(document.getElementById('incline_right').value) || 0;
  state.currentRoom.incline_center = parseFloat(document.getElementById('incline_center').value) || 0;
  state.currentRoom.incline_left = parseFloat(document.getElementById('incline_left').value) || 0;
  state.currentRoom.installation_on = document.getElementById('installation_on').value;
  state.currentRoom.ceiling_material = document.getElementById('ceiling_material').value;
  state.currentRoom.ceiling_shape = document.getElementById('ceiling_shape').value;
  state.currentRoom.curtain_box_depth = parseFloat(document.getElementById('pocket_depth').value) || 0;
  state.currentRoom.curtain_box_height = parseFloat(document.getElementById('pocket_height').value) || 0;

  try {
    const res = await fetch('/api/v1/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room: state.currentRoom })
    });
    const result = await res.json();
    if (result.success) {
      state.calculation = result.calculation;
      state.currentRoom.accessories = result.suggested_accessories;
      updateUIWithCalculations();
    }
  } catch (err) {
    console.error('Calculation API error:', err);
  }
}

function updateUIWithCalculations() {
  if (!state.calculation) return;
  const calc = state.calculation;
  const activeL = calc.layers[state.activeLayerIndex];

  if (activeL) {
    document.getElementById('calc_layer_widths').innerText = activeL.number_of_widths ? `${activeL.number_of_widths} عروض` : 'عرض كامل';
    document.getElementById('calc_layer_meters').innerText = `${activeL.meters} م`;
    document.getElementById('calc_layer_cost').innerText = `${(activeL.fabric_cost + activeL.tailoring_cost).toLocaleString()} ج.م`;
    document.getElementById('calc_layer_formula').innerText = activeL.formula || '';
  }

  // تحديث شريط الإجمالي الدائم
  document.getElementById('live_fabric_total').innerText = `${calc.fabricTotal.toLocaleString()} ج.م`;
  document.getElementById('live_tailoring_total').innerText = `${calc.tailoringTotal.toLocaleString()} ج.م`;
  document.getElementById('live_acc_total').innerText = `${calc.accessoriesTotal.toLocaleString()} ج.م`;
  document.getElementById('live_tassel_total').innerText = `${calc.tasselsTotal.toLocaleString()} ج.م`;
  document.getElementById('live_room_total').innerText = `${calc.roomTotal.toLocaleString()} ج.م`;

  // تحديث إرشادات بيت الستارة (Section 8.4)
  if (calc.pocketAdvice) {
    const pa = calc.pocketAdvice;
    const badge = document.getElementById('pocket_status_badge');
    badge.innerText = pa.depthStatus;
    if (pa.depthBadge === 'success') {
      badge.className = 'px-2 py-0.5 rounded font-bold text-xs bg-emerald-100 text-emerald-800';
    } else if (pa.depthBadge === 'warning') {
      badge.className = 'px-2 py-0.5 rounded font-bold text-xs bg-amber-100 text-amber-800';
    } else {
      badge.className = 'px-2 py-0.5 rounded font-bold text-xs bg-rose-100 text-rose-800';
    }

    document.getElementById('pocket_details_text').innerText = `العمق المطلوب للطبقات: ${pa.sumMin} - ${pa.sumMax} سم`;
    document.getElementById('tape_visibility_badge').innerText = pa.tapeVisibility;
  }

  // تحديث جدول الإكسسوارات
  renderAccessoriesTable();
}

function renderAccessoriesTable() {
  const tbody = document.getElementById('accessories-table-body');
  tbody.innerHTML = '';

  const accs = state.currentRoom.accessories || [];
  accs.forEach(acc => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50';
    tr.innerHTML = `
      <td class="p-2 font-bold text-slate-800">${acc.item}</td>
      <td class="p-2 font-mono text-xs text-slate-500">${acc.code || '-'}</td>
      <td class="p-2 font-black text-indigo-700">${acc.quantity_display || acc.quantity}</td>
      <td class="p-2 text-xs text-slate-500">${acc.unit || 'قطعة'}</td>
      <td class="p-2">${acc.unit_price || 0} ج.م</td>
      <td class="p-2 font-bold text-slate-800">${((acc.quantity || 1) * (acc.unit_price || 0)).toLocaleString()} ج.م</td>
      <td class="p-2 text-center">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${acc.is_auto ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}">
          ${acc.is_auto ? 'تلقائي' : 'يدوي'}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addManualAccessory() {
  const item = prompt('اسم بند الإكسسوار:');
  if (!item) return;
  const qty = parseFloat(prompt('الكمية / الأمتار:') || '1');
  const price = parseFloat(prompt('سعر الوحدة (ج.م):') || '50');

  state.currentRoom.accessories.push({
    item: item,
    code: 'MANUAL',
    quantity: qty,
    quantity_display: `${qty}`,
    unit: 'قطعة',
    unit_price: price,
    discount_pct: 0,
    is_auto: false,
    is_manual: true
  });
  triggerRecalculate();
}

// ==========================================
// لوحة الرسم التوضيحي (Sketch Canvas)
// ==========================================
let canvas, ctx;
let isDrawing = false;

function initCanvas() {
  canvas = document.getElementById('sketchCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function start(e) {
    e.preventDefault();
    isDrawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stop() {
    if (isDrawing) {
      isDrawing = false;
      state.currentRoom.sketch_image = canvas.toDataURL('image/png');
    }
  }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stop);
  canvas.addEventListener('mouseleave', stop);

  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stop);
}

function clearCanvas() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  state.currentRoom.sketch_image = '';
}

// ==========================================
// مزامنة وعرض أمر التشغيل A4
// ==========================================
function updateJobSheetView() {
  const clientName = document.getElementById('client_name').value;
  const clientPhone = document.getElementById('client_phone').value;
  const roomName = document.getElementById('room_name').value;
  const sellerName = document.getElementById('seller_name').value;
  const techNotes = document.getElementById('technical_notes').value;

  document.getElementById('sheet_client_name').innerText = clientName;
  document.getElementById('sheet_client_phone').innerText = clientPhone;
  document.getElementById('sheet_room_name').innerText = roomName;
  document.getElementById('sheet_seller_name').innerText = sellerName;
  document.getElementById('sheet_technical_notes').innerText = techNotes || 'لا توجد ملاحظات إضافية.';
  document.getElementById('sheet_width').innerText = `${state.currentRoom.width} سم`;
  document.getElementById('sheet_height').innerText = `${state.currentRoom.height} سم`;

  // عرض الرسم إن وجد
  const sketchImg = document.getElementById('sheet_sketch_img');
  const noSketch = document.getElementById('sheet_no_sketch_text');
  if (state.currentRoom.sketch_image) {
    sketchImg.src = state.currentRoom.sketch_image;
    sketchImg.classList.remove('hidden');
    noSketch.classList.add('hidden');
  } else {
    sketchImg.classList.add('hidden');
    noSketch.classList.remove('hidden');
  }

  // جدول القماش بأمر التشغيل (مطابق للورقة)
  const fRows = document.getElementById('sheet_fabric_rows');
  fRows.innerHTML = '';
  const layers = (state.calculation && state.calculation.layers) || state.currentRoom.layers;
  layers.forEach(l => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="font-bold">${l.fabric_type || '-'}</td>
      <td class="font-mono text-xs">${l.code || '-'}</td>
      <td>${l.category || '-'}</td>
      <td class="font-black">${l.meters || 0} م</td>
      <td class="font-bold">${l.number_of_widths || 1}</td>
      <td>${l.tailoring_type || '-'}</td>
      <td>-</td>
      <td>-</td>
    `;
    fRows.appendChild(tr);
  });
}

// ==========================================
// مزامنة وعرض عرض السعر A4
// ==========================================
function updateQuoteSheetView() {
  const container = document.getElementById('quote_rooms_container');
  container.innerHTML = '';

  const calc = state.calculation;
  if (!calc) return;

  const roomBox = document.createElement('div');
  roomBox.className = 'border rounded-lg overflow-hidden';
  roomBox.innerHTML = `
    <div class="bg-indigo-950 text-white px-4 py-2 text-sm font-bold flex justify-between">
      <span>غرفة: ${document.getElementById('room_name').value} (${state.currentRoom.width} × ${state.currentRoom.height} سم)</span>
      <span>إجمالي الغرفة: ${calc.roomTotal.toLocaleString()} ج.م</span>
    </div>
    <div class="p-4">
      <table class="sheet-table text-xs">
        <thead>
          <tr>
            <th>البند والتفصيل</th>
            <th>الكمية</th>
            <th>سعر الوحدة</th>
            <th>الخصم</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          ${calc.layers.map(l => `
            <tr>
              <td class="text-right">قماش ${l.fabric_type} (${l.category}) - ${l.tailoring_type}</td>
              <td class="font-bold">${l.meters} م</td>
              <td>${l.price_per_meter} ج.م</td>
              <td>${l.discount_pct}%</td>
              <td class="font-black">${l.fabric_cost.toLocaleString()} ج.م</td>
            </tr>
            <tr>
              <td class="text-right text-slate-500 pr-4">↳ مصنعية تفصيل ${l.tailoring_type}</td>
              <td>${l.meters} م</td>
              <td>${l.tailoring_price_per_meter} ج.م</td>
              <td>0%</td>
              <td class="font-bold">${l.tailoring_cost.toLocaleString()} ج.م</td>
            </tr>
          `).join('')}
          ${(state.currentRoom.accessories || []).map(acc => `
            <tr>
              <td class="text-right">إكسسوار: ${acc.item} (${acc.code})</td>
              <td>${acc.quantity_display || acc.quantity}</td>
              <td>${acc.unit_price || 0} ج.م</td>
              <td>0%</td>
              <td class="font-bold">${((acc.quantity || 1) * (acc.unit_price || 0)).toLocaleString()} ج.م</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  container.appendChild(roomBox);

  // تحديث إجماليات العرض
  document.getElementById('quote_items_total').innerText = `${calc.roomTotal.toLocaleString()} ج.م`;
  document.getElementById('quote_net_total').innerText = `${calc.roomTotal.toLocaleString()} ج.م`;
  const adv = Math.round(calc.roomTotal * 0.5);
  document.getElementById('quote_advance_val').innerText = `${adv.toLocaleString()} ج.م`;
  document.getElementById('quote_remaining_val').innerText = `${(calc.roomTotal - adv).toLocaleString()} ج.م`;
}

// ==========================================
// حفظ أمر التشغيل وإرساله لقاعدة البيانات
// ==========================================
async function saveAndGenerateJob() {
  const payload = {
    customer_name: document.getElementById('client_name').value,
    customer_phone: document.getElementById('client_phone').value,
    seller_name: document.getElementById('seller_name').value,
    room_name: document.getElementById('room_name').value,
    expected_delivery: document.getElementById('expected_delivery').value,
    order_type: document.getElementById('order_type').value,
    work_stage: document.getElementById('work_stage').value,
    room: {
      ...state.currentRoom,
      pelmet_type: document.getElementById('pelmet_type').value,
      pelmet_meters: parseFloat(document.getElementById('pelmet_meters').value) || 0,
      technical_notes: document.getElementById('technical_notes').value
    }
  };

  try {
    const res = await fetch('/api/v1/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      alert(`✓ تم حفظ أمر التشغيل بنجاح!\nرقم الشيك: ${result.check_number}\nكود المعرف: ${result.job_id}`);
      switchTab('jobSheet');
    }
  } catch (err) {
    alert('حدث خطأ أثناء حفظ أمر التشغيل: ' + err.message);
  }
}

// ==========================================
// مسار CRM والمهام
// ==========================================
async function loadCRMData() {
  try {
    const [tasksRes, leadsRes] = await Promise.all([
      fetch('/api/v1/today-tasks'),
      fetch('/api/v1/leads')
    ]);
    const tasks = await tasksRes.json();
    const leads = await leadsRes.json();

    if (tasks.success) {
      document.getElementById('count_overdue').innerText = tasks.stats.overdue_count;
      document.getElementById('count_today').innerText = tasks.stats.today_count;
      document.getElementById('count_no_followup').innerText = tasks.stats.no_followup_count;
      document.getElementById('count_feedback').innerText = tasks.stats.feedback_required_count;
    }

    if (leads.success) {
      renderCRMKanban(leads.data);
    }
  } catch (err) {
    console.error('CRM load error:', err);
  }
}

function renderCRMKanban(leads) {
  const stages = ['فرصة بيع', 'عرض سعر', 'تفاوض', 'مؤكد', 'تحت التشغيل', 'جاهز للتسليم', 'تم التسليم', 'فيد باك'];
  const lanesContainer = document.getElementById('crm_pipeline_lanes');
  lanesContainer.innerHTML = '';

  stages.forEach(stage => {
    const stageLeads = leads.filter(l => l.stage === stage);
    const col = document.createElement('div');
    col.className = 'w-64 flex-shrink-0 bg-slate-100 rounded-xl p-3 border border-slate-200 flex flex-col max-h-[600px]';
    col.innerHTML = `
      <div class="flex justify-between items-center mb-3 border-b border-slate-200 pb-2">
        <h3 class="font-bold text-xs text-slate-800">${stage}</h3>
        <span class="w-5 h-5 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold">
          ${stageLeads.length}
        </span>
      </div>
      <div class="space-y-2 overflow-y-auto flex-1">
        ${stageLeads.map(l => `
          <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-xs space-y-1 hover:border-indigo-400 transition">
            <div class="font-bold text-slate-900">${l.customer_name}</div>
            <div class="text-slate-500 font-mono text-[11px]">${l.customer_phone}</div>
            <div class="text-emerald-700 font-bold">${(l.value || 0).toLocaleString()} ج.م</div>
            <div class="text-[10px] text-slate-400">متابعة: ${l.follow_up_date || 'غير محدد'}</div>
          </div>
        `).join('')}
      </div>
    `;
    lanesContainer.appendChild(col);
  });
}

// ==========================================
// أودو وواجهات الربط (Odoo APIs)
// ==========================================
async function fetchOdooPayload() {
  try {
    const box = document.getElementById('odoo_payload_box');
    box.innerText = 'جاري طلب الحمولة المتوافقة مع أودو...';
    const res = await fetch('/api/v1/odoo/payload/job/1');
    const data = await res.json();
    box.innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById('odoo_payload_box').innerText = 'خطأ في جلب بيانات أودو: ' + err.message;
  }
}

function copyPythonCode() {
  const code = document.getElementById('python_code_box').innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert('✓ تم نسخ كود بايثون للاتصال بأودو بنجاح!');
  });
}

function loadSampleData() {
  triggerRecalculate();
  alert('تم تحميل بيانات العميل والمعاينة بنجاح!');
}
