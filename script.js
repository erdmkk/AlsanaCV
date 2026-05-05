// --- DRAG AND DROP (SÜREKLE & BIRAK) ---
        let draggedItem = null;
        let dragSelector = '.item-card';

        function handleDragStart(e) {
            const card = e.target.closest('.item-card');
            const section = e.target.closest('.form-section');

            if (card) {
                draggedItem = card;
                dragSelector = '.item-card';
            } else if (section && section.hasAttribute('draggable')) {
                draggedItem = section;
                dragSelector = '.form-section';
            }
            if (draggedItem) {
                setTimeout(() => draggedItem.classList.add('dragging'), 0);
            }
        }

        function handleDragEnd(e) {
            if (draggedItem) {
                draggedItem.classList.remove('dragging');
                draggedItem = null;
                updateCV();
            }
        }

        function initSortable(listId, itemSelector = '.item-card') {
            const list = document.getElementById(listId);
            if (!list) return;
            list.addEventListener('dragover', e => {
                e.preventDefault();
                if (dragSelector !== itemSelector) return;
                
                const afterElement = getDragAfterElement(list, e.clientY, itemSelector);
                if (draggedItem) {
                    if (afterElement == null) list.appendChild(draggedItem);
                    else list.insertBefore(draggedItem, afterElement);
                }
            });
        }

        function getDragAfterElement(container, y, selector) {
            const draggableElements = [...container.querySelectorAll(`${selector}:not(.dragging)`)];
            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) return { offset: offset, element: child };
                else return closest;
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }

        const dragSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>`;

        // --- FORM İÇERİK EKLEME FONKSİYONLARI ---
        function addExperience(data = {}) {
            const html = `
                <div class="item-card" draggable="true" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)">
                    <div class="item-header">
                        <div class="drag-handle">${dragSvg} Deneyim</div>
                        <button type="button" class="btn-remove" onclick="this.closest('.item-card').remove(); updateCV();">Sil</button>
                    </div>
                    <div class="input-group"><input type="text" class="exp-company" placeholder="Şirket Adı" oninput="updateCV()"></div>
                    <div class="input-group"><input type="text" class="exp-role" placeholder="Pozisyon" oninput="updateCV()"></div>
                    <div class="input-group"><input type="text" class="exp-date" placeholder="Tarih" oninput="updateCV()"></div>
                    <div class="input-group"><textarea class="exp-desc" placeholder="Açıklama" oninput="updateCV()"></textarea></div>
                </div>`;
            document.getElementById('exp-list').insertAdjacentHTML('beforeend', html);
            const card = document.getElementById('exp-list').lastElementChild;
            if (data.company) card.querySelector('.exp-company').value = data.company;
            if (data.role) card.querySelector('.exp-role').value = data.role;
            if (data.date) card.querySelector('.exp-date').value = data.date;
            if (data.desc) card.querySelector('.exp-desc').value = data.desc;
            updateCV();
        }

        function addEducation(data = {}) {
            const html = `
                <div class="item-card" draggable="true" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)">
                    <div class="item-header"><div class="drag-handle">${dragSvg} Eğitim</div><button type="button" class="btn-remove" onclick="this.closest('.item-card').remove(); updateCV();">Sil</button></div>
                    <div class="input-group"><input type="text" class="edu-school" placeholder="Okul Adı" oninput="updateCV()"></div>
                    <div class="input-group"><input type="text" class="edu-degree" placeholder="Bölüm" oninput="updateCV()"></div>
                    <div class="input-group"><input type="text" class="edu-date" placeholder="Tarih" oninput="updateCV()"></div>
                    <div class="input-group"><textarea class="edu-desc" placeholder="Açıklama" oninput="updateCV()"></textarea></div>
                </div>`;
            document.getElementById('edu-list').insertAdjacentHTML('beforeend', html);
            const card = document.getElementById('edu-list').lastElementChild;
            if (data.school) card.querySelector('.edu-school').value = data.school;
            if (data.degree) card.querySelector('.edu-degree').value = data.degree;
            if (data.date) card.querySelector('.edu-date').value = data.date;
            if (data.desc) card.querySelector('.edu-desc').value = data.desc;
            updateCV();
        }

        function addProject(data = {}) {
            const html = `
                <div class="item-card" draggable="true" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)">
                    <div class="item-header"><div class="drag-handle">${dragSvg} Proje</div><button type="button" class="btn-remove" onclick="this.closest('.item-card').remove(); updateCV();">Sil</button></div>
                    <div class="input-group"><input type="text" class="proj-name" placeholder="Proje Adı" oninput="updateCV()"></div>
                    <div class="input-group"><textarea class="proj-desc" placeholder="Açıklama" oninput="updateCV()"></textarea></div>
                </div>`;
            document.getElementById('proj-list').insertAdjacentHTML('beforeend', html);
            const card = document.getElementById('proj-list').lastElementChild;
            if (data.name) card.querySelector('.proj-name').value = data.name;
            if (data.desc) card.querySelector('.proj-desc').value = data.desc;
            updateCV();
        }

        function addLanguage(data = {}) {
            const html = `
                <div class="item-card" draggable="true" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)">
                    <div class="item-header"><div class="drag-handle">${dragSvg} Dil</div><button type="button" class="btn-remove" onclick="this.closest('.item-card').remove(); updateCV();">Sil</button></div>
                    <div class="input-group"><input type="text" class="lang-name" placeholder="Örn: İngilizce" oninput="updateCV()"></div>
                    <div class="input-group">
                        <select class="lang-level" onchange="updateCV()">
                            <optgroup label="Standart Seviyeler">
                                <option value="1">Başlangıç</option><option value="2">Orta</option>
                                <option value="3">İyi</option><option value="4">İleri</option><option value="5">Anadil</option>
                            </optgroup>
                            <optgroup label="Harf Notları (CEFR)">
                                <option value="A1">A1</option><option value="A2">A2</option>
                                <option value="B1">B1</option><option value="B2">B2</option>
                                <option value="C1">C1</option><option value="C2">C2</option>
                            </optgroup>
                        </select>
                    </div>
                </div>`;
            document.getElementById('lang-list').insertAdjacentHTML('beforeend', html);
            const card = document.getElementById('lang-list').lastElementChild;
            if (data.name) card.querySelector('.lang-name').value = data.name;
            if (data.level) card.querySelector('.lang-level').value = data.level;
            updateCV();
        }

        function addCert(data = {}) {
            const html = `
                <div class="item-card" draggable="true" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)">
                    <div class="item-header"><div class="drag-handle">${dragSvg} Sertifika</div><button type="button" class="btn-remove" onclick="this.closest('.item-card').remove(); updateCV();">Sil</button></div>
                    <div class="input-group"><input type="text" class="cert-name" placeholder="Sertifika Adı" oninput="updateCV()"></div>
                    <div class="input-group"><input type="text" class="cert-issuer" placeholder="Kurum" oninput="updateCV()"></div>
                    <div class="input-group"><input type="text" class="cert-date" placeholder="Tarih" oninput="updateCV()"></div>
                </div>`;
            document.getElementById('cert-list').insertAdjacentHTML('beforeend', html);
            const card = document.getElementById('cert-list').lastElementChild;
            if (data.name) card.querySelector('.cert-name').value = data.name;
            if (data.issuer) card.querySelector('.cert-issuer').value = data.issuer;
            if (data.date) card.querySelector('.cert-date').value = data.date;
            updateCV();
        }

        function addRef(data = {}) {
            const html = `
                <div class="item-card" draggable="true" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)">
                    <div class="item-header"><div class="drag-handle">${dragSvg} Referans</div><button type="button" class="btn-remove" onclick="this.closest('.item-card').remove(); updateCV();">Sil</button></div>
                    <div class="input-group"><input type="text" class="ref-name" placeholder="Ad Soyad" oninput="updateCV()"></div>
                    <div class="input-group"><input type="text" class="ref-title" placeholder="Ünvan ve Şirket" oninput="updateCV()"></div>
                    <div class="input-group"><input type="text" class="ref-contact" placeholder="İletişim Bilgisi" oninput="updateCV()"></div>
                </div>`;
            document.getElementById('ref-list').insertAdjacentHTML('beforeend', html);
            const card = document.getElementById('ref-list').lastElementChild;
            if (data.name) card.querySelector('.ref-name').value = data.name;
            if (data.title) card.querySelector('.ref-title').value = data.title;
            if (data.contact) card.querySelector('.ref-contact').value = data.contact;
            updateCV();
        }

        function addCustomSection(title = 'Yeni Bölüm', text = '') {
            const id = Math.random().toString(36).substr(2, 9);
            const html = `
            <div class="form-section collapsed custom-section" id="fs-custom-${id}" draggable="true" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)">
                <div class="section-header" onclick="toggleFormSection('fs-custom-${id}')">
                    <div class="drag-handle" style="margin-right:0.5rem; color:#aaa;" onclick="event.stopPropagation()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;cursor:grab"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg></div>
                    <input type="text" class="section-title-input custom-sec-title" value="${title}" oninput="updateCV()" onclick="event.stopPropagation()">
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                        <button type="button" class="btn-remove" onclick="removeCustomSection('${id}', event)" style="margin-right:0.5rem;">Sil</button>
                        <button type="button" class="toggle-btn"></button>
                    </div>
                </div>
                <div class="section-content">
                    <div class="input-group">
                        <textarea class="custom-sec-text" placeholder="İçeriğinizi buraya yazın..." oninput="updateCV()">${text}</textarea>
                    </div>
                </div>
            </div>`;
            document.getElementById('main-sections-list').insertAdjacentHTML('beforeend', html);
            updateCV();
        }

        function removeCustomSection(id, e) {
            e.stopPropagation();
            const el = document.getElementById(`fs-custom-${id}`);
            if(el) { el.remove(); updateCV(); debounceSave(); }
        }

        // --- TASARIM VE TEMPLATE YÖNETİMİ ---
        
        function applySectionOrder() {
            const tpl = document.querySelector('.tpl-btn.active')?.dataset?.tpl || 'classic';
            const sidebar = document.getElementById('cv-sidebar');
            const main = document.getElementById('cv-main');

            const mainSectionsList = document.querySelectorAll('#main-sections-list > .form-section');
            mainSectionsList.forEach(fs => {
                let cvId = fs.id.startsWith('fs-custom-') ? 'cv-section-custom-' + fs.id.replace('fs-custom-', '') : 'cv-section-' + fs.id.replace('fs-', '');
                const el = document.getElementById(cvId);
                if (el) {
                    if ((tpl === 'modern' || tpl === 'kreatif' || tpl === 'kurumsal') && (fs.id === 'fs-languages' || fs.id === 'fs-skills' || fs.id === 'fs-hobbies')) {
                        sidebar.append(el);
                    } else {
                        main.append(el);
                    }
                }
            });
        }

        function changeTemplate(tpl) {
            const sheet = document.getElementById('cv-sheet');
            sheet.className = `cv-sheet template-${tpl}`;
            if (photoUrl) sheet.classList.add('has-photo');

            document.querySelectorAll('.tpl-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`.tpl-btn[data-tpl="${tpl}"]`).classList.add('active');

            const header = document.getElementById('cv-header-container');
            const headerText = document.getElementById('cv-header-text');
            const photo = document.getElementById('cv-photo');
            const name = document.getElementById('cv-name');
            const title = document.getElementById('cv-title');
            const contact = document.getElementById('cv-contact');

            const sidebar = document.getElementById('cv-sidebar');
            const main = document.getElementById('cv-main');
            const social = document.getElementById('cv-social-icons');

            const summary = document.getElementById('cv-summary');
            const skills = document.getElementById('cv-section-skills');
            const exp = document.getElementById('cv-section-experience');
            const edu = document.getElementById('cv-section-education');
            const proj = document.getElementById('cv-section-projects');
            const hobbies = document.getElementById('cv-section-hobbies');
            const langs = document.getElementById('cv-section-languages');
            const certs = document.getElementById('cv-section-certs');
            const refs = document.getElementById('cv-section-refs');

            if (tpl === 'modern' || tpl === 'kreatif') {
                sidebar.append(photo, name, title, contact, social);
                main.append(summary);
                header.style.display = 'none';
            } else if (tpl === 'kurumsal') {
                header.style.display = 'flex';
                headerText.append(name, title);
                header.append(headerText);
                header.append(photo);
                sidebar.append(contact, social);
                main.append(summary);
            } else {
                header.style.display = 'flex';
                header.append(photo);
                header.append(headerText);
                headerText.append(name, title, contact, social);
                main.append(summary);
            }
            applySectionOrder();
            debounceSave();
        }

        document.querySelectorAll('.btn-style').forEach(btn => {
            btn.addEventListener('click', function () {
                this.classList.toggle('active');
                updateDesign();
            });
        });

        function updateDesign() {
            const root = document.documentElement;

            const font = document.getElementById('in-font-family').value;
            const sizeName = document.getElementById('in-size-name').value;
            const sizeTitle = document.getElementById('in-size-title').value;
            const sizeText = document.getElementById('in-size-text').value;
            const color = document.getElementById('in-color-primary').value;
            const spacing = document.getElementById('in-spacing').value;

            // Kontrast (YIQ)
            const hex = color.replace("#", "");
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            const contrastColor = (yiq >= 128) ? '#0f172a' : '#ffffff';

            root.style.setProperty('--cv-font', font);
            root.style.setProperty('--size-name', sizeName + 'px');
            root.style.setProperty('--size-title', sizeTitle + 'px');
            root.style.setProperty('--size-text', sizeText + 'px');
            root.style.setProperty('--primary', color);
            root.style.setProperty('--primary-contrast', contrastColor);

            root.style.setProperty('--space-item', spacing + 'rem');
            root.style.setProperty('--space-section', (parseFloat(spacing) * 1.5) + 'rem');
            root.style.setProperty('--line-height', 1.6 + (parseFloat(spacing) - 1.5) * 0.2);

            document.getElementById('val-size-name').innerText = sizeName;
            document.getElementById('val-size-title').innerText = sizeTitle;
            document.getElementById('val-size-text').innerText = sizeText;

            const checkActive = (target, style) => document.querySelector(`.btn-style[data-target="${target}"][data-style="${style}"]`).classList.contains('active');
            root.style.setProperty('--weight-name', checkActive('name', 'bold') ? '700' : '400');
            root.style.setProperty('--style-name', checkActive('name', 'italic') ? 'italic' : 'normal');
            root.style.setProperty('--weight-title', checkActive('title', 'bold') ? '600' : '400');
            root.style.setProperty('--style-title', checkActive('title', 'italic') ? 'italic' : 'normal');
            root.style.setProperty('--weight-text', checkActive('text', 'bold') ? '600' : '400');
            root.style.setProperty('--style-text', checkActive('text', 'italic') ? 'italic' : 'normal');

            debounceSave();
        }

        // --- LOCAL STORAGE (OTOMATİK KAYIT) ---
        let saveTimeout;
        let isInitialized = false;

        function debounceSave() {
            if (!isInitialized) return;
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveData, 500);
        }

        function saveData() {
            const data = {
                design: {
                    font: document.getElementById('in-font-family').value,
                    color: document.getElementById('in-color-primary').value,
                    sizeName: document.getElementById('in-size-name').value,
                    sizeTitle: document.getElementById('in-size-title').value,
                    sizeText: document.getElementById('in-size-text').value,
                    spacing: document.getElementById('in-spacing').value,
                    template: document.querySelector('.tpl-btn.active').dataset.tpl,
                    nameBold: document.querySelector('.btn-style[data-target="name"][data-style="bold"]').classList.contains('active'),
                    nameItalic: document.querySelector('.btn-style[data-target="name"][data-style="italic"]').classList.contains('active'),
                    titleBold: document.querySelector('.btn-style[data-target="title"][data-style="bold"]').classList.contains('active'),
                    titleItalic: document.querySelector('.btn-style[data-target="title"][data-style="italic"]').classList.contains('active'),
                    textBold: document.querySelector('.btn-style[data-target="text"][data-style="bold"]').classList.contains('active'),
                    textBold: document.querySelector('.btn-style[data-target="text"][data-style="bold"]').classList.contains('active'),
                    textItalic: document.querySelector('.btn-style[data-target="text"][data-style="italic"]').classList.contains('active')
                },
                titles: {
                    exp: document.getElementById('in-t-exp').value, edu: document.getElementById('in-t-edu').value,
                    langs: document.getElementById('in-t-langs').value, certs: document.getElementById('in-t-certs').value,
                    proj: document.getElementById('in-t-proj').value, skills: document.getElementById('in-t-skills').value,
                    hobbies: document.getElementById('in-t-hobbies').value, refs: document.getElementById('in-t-refs').value
                },
                personal: {
                    photo: photoUrl,
                    name: document.getElementById('in-name').value, title: document.getElementById('in-title').value,
                    email: document.getElementById('in-email').value, phone: document.getElementById('in-phone').value,
                    address: document.getElementById('in-address').value, linkedin: document.getElementById('in-linkedin').value,
                    github: document.getElementById('in-github').value, website: document.getElementById('in-website').value,
                    summary: document.getElementById('in-summary').value
                },
                skills: document.getElementById('in-skills').value,
                hobbies: document.getElementById('in-hobbies').value,
                sectionOrder: Array.from(document.querySelectorAll('#main-sections-list > .form-section')).map(s => {
                    if (s.classList.contains('custom-section')) {
                        return { type: 'custom', id: s.id.replace('fs-custom-', ''), title: s.querySelector('.custom-sec-title').value, text: s.querySelector('.custom-sec-text').value };
                    } else {
                        return { type: 'standard', id: s.id };
                    }
                }),
                experiences: Array.from(document.querySelectorAll('#exp-list .item-card')).map(c => ({ company: c.querySelector('.exp-company').value, role: c.querySelector('.exp-role').value, date: c.querySelector('.exp-date').value, desc: c.querySelector('.exp-desc').value })),
                education: Array.from(document.querySelectorAll('#edu-list .item-card')).map(c => ({ school: c.querySelector('.edu-school').value, degree: c.querySelector('.edu-degree').value, date: c.querySelector('.edu-date').value, desc: c.querySelector('.edu-desc').value })),
                projects: Array.from(document.querySelectorAll('#proj-list .item-card')).map(c => ({ name: c.querySelector('.proj-name').value, desc: c.querySelector('.proj-desc').value })),
                languages: Array.from(document.querySelectorAll('#lang-list .item-card')).map(c => ({ name: c.querySelector('.lang-name').value, level: c.querySelector('.lang-level').value })),
                certs: Array.from(document.querySelectorAll('#cert-list .item-card')).map(c => ({ name: c.querySelector('.cert-name').value, issuer: c.querySelector('.cert-issuer').value, date: c.querySelector('.cert-date').value })),
                refs: Array.from(document.querySelectorAll('#ref-list .item-card')).map(c => ({ name: c.querySelector('.ref-name').value, title: c.querySelector('.ref-title').value, contact: c.querySelector('.ref-contact').value }))
            };

            try { localStorage.setItem('cvMakerData', JSON.stringify(data)); }
            catch (e) { data.personal.photo = ''; localStorage.setItem('cvMakerData', JSON.stringify(data)); } // Fotoğraf çok büyükse onsuz kaydet
        }

        function loadData() {
            const saved = localStorage.getItem('cvMakerData');
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    // Kişisel
                    ['name', 'title', 'email', 'phone', 'address', 'linkedin', 'github', 'website', 'summary'].forEach(k => {
                        if (data.personal[k] !== undefined) document.getElementById(`in-${k}`).value = data.personal[k];
                    });
                    if (data.personal.photo) { photoUrl = data.personal.photo; updatePhotoDisplay('Kayıtlı Fotoğraf'); }

                    document.getElementById('in-skills').value = data.skills || '';
                    document.getElementById('in-hobbies').value = data.hobbies || '';

                    document.querySelectorAll('.custom-section').forEach(el => el.remove());
                    document.querySelectorAll('.custom-cv-section').forEach(el => el.remove());
                    if (data.sectionOrder && data.sectionOrder.length > 0) {
                        const list = document.getElementById('main-sections-list');
                        data.sectionOrder.forEach(item => {
                            if (item.type === 'standard') {
                                const el = document.getElementById(item.id);
                                if (el) list.appendChild(el);
                            } else if (item.type === 'custom') {
                                // To maintain id integrity:
                                const id = item.id || Math.random().toString(36).substr(2, 9);
                                const html = `
                                <div class="form-section collapsed custom-section" id="fs-custom-${id}" draggable="true" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)">
                                    <div class="section-header" onclick="toggleFormSection('fs-custom-${id}')">
                                        ${svg_handle}
                                        <input type="text" class="section-title-input custom-sec-title" value="${item.title}" oninput="updateCV()" onclick="event.stopPropagation()">
                                        <div style="display:flex; align-items:center; gap:0.5rem;">
                                            <button type="button" class="btn-remove" onclick="removeCustomSection('${id}', event)" style="margin-right:0.5rem;">Sil</button>
                                            <button type="button" class="toggle-btn"></button>
                                        </div>
                                    </div>
                                    <div class="section-content">
                                        <div class="input-group">
                                            <textarea class="custom-sec-text" placeholder="İçeriğinizi buraya yazın..." oninput="updateCV()">${item.text}</textarea>
                                        </div>
                                    </div>
                                </div>`;
                                list.insertAdjacentHTML('beforeend', html);
                            }
                        });
                    } else if (data.customSections && data.customSections.length > 0) {
                        data.customSections.forEach(sec => addCustomSection(sec.title, sec.text));
                    }

                    // Dinamik Listeler
                    document.getElementById('exp-list').innerHTML = '';
                    if (data.experiences && data.experiences.length > 0) data.experiences.forEach(item => addExperience(item));

                    document.getElementById('edu-list').innerHTML = '';
                    if (data.education && data.education.length > 0) data.education.forEach(item => addEducation(item));

                    document.getElementById('proj-list').innerHTML = '';
                    if (data.projects && data.projects.length > 0) data.projects.forEach(item => addProject(item));

                    document.getElementById('lang-list').innerHTML = '';
                    if (data.languages && data.languages.length > 0) data.languages.forEach(item => addLanguage(item));

                    document.getElementById('cert-list').innerHTML = '';
                    if (data.certs && data.certs.length > 0) data.certs.forEach(item => addCert(item));

                    document.getElementById('ref-list').innerHTML = '';
                    if (data.refs && data.refs.length > 0) data.refs.forEach(item => addRef(item));

                    if (data.titles) {
                        ['exp', 'edu', 'langs', 'certs', 'proj', 'skills', 'hobbies', 'refs'].forEach(k => {
                            if (data.titles[k] !== undefined && document.getElementById(`in-t-${k}`)) {
                                document.getElementById(`in-t-${k}`).value = data.titles[k];
                            }
                        });
                    }

                    // Tasarım
                    if (data.design) {
                        if (data.design.font) document.getElementById('in-font-family').value = data.design.font;
                        if (data.design.color) document.getElementById('in-color-primary').value = data.design.color;
                        if (data.design.sizeName) document.getElementById('in-size-name').value = data.design.sizeName;
                        if (data.design.sizeTitle) document.getElementById('in-size-title').value = data.design.sizeTitle;
                        if (data.design.sizeText) document.getElementById('in-size-text').value = data.design.sizeText;
                        if (data.design.spacing) document.getElementById('in-spacing').value = data.design.spacing;

                        const setT = (t, s, act) => { const b = document.querySelector(`.btn-style[data-target="${t}"][data-style="${s}"]`); if (act) b.classList.add('active'); else b.classList.remove('active'); };
                        setT('name', 'bold', data.design.nameBold); setT('name', 'italic', data.design.nameItalic);
                        setT('title', 'bold', data.design.titleBold); setT('title', 'italic', data.design.titleItalic);
                        setT('text', 'bold', data.design.textBold); setT('text', 'italic', data.design.textItalic);

                        if (data.design.template) changeTemplate(data.design.template);
                    }
                } catch (e) { console.error("Load error:", e); initDefaults(); }
            } else { initDefaults(); }

            isInitialized = true;
            updateDesign();
            updateCV();
        }

        function initDefaults() {
            addExperience(); addEducation(); addLanguage(); addProject();
        }

        // --- SIFIRLAMA ve İÇE/DIŞA AKTARMA MODALI ---
        function showResetModal() { document.getElementById('reset-modal').style.display = 'flex'; }
        function hideResetModal() { document.getElementById('reset-modal').style.display = 'none'; }
        function confirmReset() { localStorage.removeItem('cvMakerData'); location.reload(); }

        function exportJSON() {
            const data = localStorage.getItem('cvMakerData');
            if (!data) return alert('Dışa aktarılacak veri bulunamadı.');
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const name = document.getElementById('in-name').value.trim();
            a.download = name ? `cv-${name.toLowerCase().replace(/\s+/g, '-')}.json` : 'cv-data.json';
            a.click();
            URL.revokeObjectURL(url);
        }

        function handleImport(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const json = JSON.parse(e.target.result);
                    if (typeof json !== 'object') throw new Error();
                    localStorage.setItem('cvMakerData', JSON.stringify(json));
                    alert('Veriler başarıyla içe aktarıldı. Sayfa yenileniyor...');
                    location.reload();
                } catch(err) {
                    alert('Hata: Geçersiz veya bozuk dosya formatı.');
                }
            };
            reader.readAsText(file);
            event.target.value = '';
        }

        function downloadPDF() {
            const element = document.getElementById('cv-sheet');
            const btnPdf = document.getElementById('btn-pdf');
            const originalHtml = btnPdf.innerHTML;
            
            btnPdf.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width:18px;height:18px;animation:spin 2s linear infinite;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                İndiriliyor...
            `;
            btnPdf.disabled = true;
            btnPdf.style.opacity = '0.7';
            btnPdf.style.cursor = 'wait';

            const name = document.getElementById('in-name').value.trim();
            const filename = name ? `cv-${name.toLowerCase().replace(/\s+/g, '-')}.pdf` : 'cv.pdf';

            const opt = {
                margin:       [5, 0, 10, 0], // Top, Left, Bottom, Right
                filename:     filename,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak:    { mode: ['css', 'legacy'], avoid: ['.cv-item', '.cv-section-title', '.cv-contact'] }
            };

            html2pdf().set(opt).from(element).save().then(() => {
                btnPdf.innerHTML = originalHtml;
                btnPdf.disabled = false;
                btnPdf.style.opacity = '1';
                btnPdf.style.cursor = 'pointer';
            }).catch(err => {
                console.error(err);
                btnPdf.innerHTML = originalHtml;
                btnPdf.disabled = false;
                btnPdf.style.opacity = '1';
                btnPdf.style.cursor = 'pointer';
                alert('PDF oluşturulurken bir hata oluştu.');
            });
        }

        const defaultTitles = {
            exp: 'Deneyim', edu: 'Eğitim', langs: 'Yabancı Diller', certs: 'Sertifikalar / Kurslar', proj: 'Projeler', skills: 'Yetenekler', hobbies: 'Hobiler & İlgi Alanları', refs: 'Referanslar'
        };

        // --- GÜNCELLEME MOTORU ---
        function formatText(str) {
            if (!str) return '';
            let escaped = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            escaped = escaped.replace(/\*(.*?)\*/g, '<i>$1</i>');
            return escaped.replace(/\n/g, '<br>');
        }

        function updateCV() {
            const updateT = (id, cvId, def) => {
                const val = document.getElementById(id).value;
                const el = document.getElementById(cvId);
                el.innerText = val || def;
                el.classList.toggle('placeholder-text', !val);
            };

            ['exp', 'edu', 'langs', 'certs', 'proj', 'skills', 'hobbies', 'refs'].forEach(k => {
                if (document.getElementById(`in-t-${k}`)) {
                    const val = document.getElementById(`in-t-${k}`).value;
                    document.getElementById(`t-${k}`).innerText = val || defaultTitles[k];
                }
            });

            updateT('in-name', 'cv-name', 'Ad Soyad');
            updateT('in-title', 'cv-title', 'Meslek / Ünvan');

            ['linkedin', 'github', 'website'].forEach(key => {
                const val = document.getElementById(`in-${key}`).value.trim();
                const link = document.getElementById(`cv-link-${key}`);
                if (val) {
                    let href = val;
                    if (!href.startsWith('http://') && !href.startsWith('https://')) { href = 'https://' + href; }
                    link.href = href;
                    link.style.display = 'flex';
                } else { link.style.display = 'none'; }
            });

            ['email', 'phone', 'address'].forEach(key => {
                const val = document.getElementById(`in-${key}`).value;
                document.getElementById(`cv-${key}`).innerText = val || (key === 'email' ? 'e-posta adresiniz' : key);
                document.getElementById(`cv-${key}-wrapper`).classList.toggle('placeholder-text', !val);
                document.getElementById(`cv-${key}-wrapper`).style.display = val ? 'flex' : 'none';
            });

            // Hakkımda
            const summaryVal = document.getElementById('in-summary').value;
            const cvSummary = document.getElementById('cv-summary');
            if (summaryVal) { cvSummary.innerHTML = formatText(summaryVal); cvSummary.classList.remove('placeholder-text'); }
            else { cvSummary.innerText = 'Hakkınızdaki özet bilgi burada görünecektir.'; cvSummary.classList.add('placeholder-text'); }

            // Yetenek ve Hobiler
            const sVal = document.getElementById('in-skills').value.trim();
            if (sVal) { document.getElementById('cv-skills').innerHTML = formatText(sVal); document.getElementById('cv-section-skills').classList.remove('hidden'); }
            else document.getElementById('cv-section-skills').classList.add('hidden');

            const hVal = document.getElementById('in-hobbies').value.trim();
            if (hVal) { document.getElementById('cv-hobbies').innerHTML = formatText(hVal); document.getElementById('cv-section-hobbies').classList.remove('hidden'); }
            else document.getElementById('cv-section-hobbies').classList.add('hidden');

            // Özel (Dinamik) Bölümler
            document.querySelectorAll('.custom-cv-section').forEach(el => el.remove());
            const customForms = document.querySelectorAll('.custom-section');
            customForms.forEach(f => {
                const title = f.querySelector('.custom-sec-title').value.trim();
                const text = f.querySelector('.custom-sec-text').value.trim();
                if (title || text) {
                    const id = f.id.replace('fs-custom-', '');
                    const html = `
                    <div class="cv-section custom-cv-section" id="cv-section-custom-${id}">
                        <h3 class="cv-section-title">${title || 'Yeni Bölüm'}</h3>
                        <div class="cv-desc">${formatText(text)}</div>
                    </div>`;
                    document.getElementById('cv-main').insertAdjacentHTML('beforeend', html);
                }
            });

            // Deneyim
            const expForms = document.querySelectorAll('#exp-list .item-card');
            let expHtml = '';
            expForms.forEach(f => {
                const c = f.querySelector('.exp-company').value, r = f.querySelector('.exp-role').value, d = f.querySelector('.exp-date').value, desc = f.querySelector('.exp-desc').value;
                if (c || r || d || desc) expHtml += `<div class="cv-item"><div class="cv-item-header"><div class="cv-item-title">${c || 'Şirket'}</div><div class="cv-item-date">${d || 'Tarih'}</div></div><div class="cv-item-subtitle">${r || 'Pozisyon'}</div><div class="cv-desc">${formatText(desc)}</div></div>`;
            });
            document.getElementById('cv-exp-container').innerHTML = expHtml;
            document.getElementById('cv-section-experience').classList.toggle('hidden', expHtml === '');

            // Eğitim
            const eduForms = document.querySelectorAll('#edu-list .item-card');
            let eduHtml = '';
            eduForms.forEach(f => {
                const s = f.querySelector('.edu-school').value, deg = f.querySelector('.edu-degree').value, d = f.querySelector('.edu-date').value, desc = f.querySelector('.edu-desc').value;
                if (s || deg || d || desc) eduHtml += `<div class="cv-item"><div class="cv-item-header"><div class="cv-item-title">${s || 'Okul'}</div><div class="cv-item-date">${d || 'Tarih'}</div></div><div class="cv-item-subtitle" style="${desc ? 'margin-bottom:0' : ''}">${deg || 'Bölüm'}</div>${desc ? `<div class="cv-desc" style="margin-top:0.5rem">${formatText(desc)}</div>` : ''}</div>`;
            });
            document.getElementById('cv-edu-container').innerHTML = eduHtml;
            document.getElementById('cv-section-education').classList.toggle('hidden', eduHtml === '');

            // Projeler
            const projForms = document.querySelectorAll('#proj-list .item-card');
            let projHtml = '';
            projForms.forEach(f => {
                const n = f.querySelector('.proj-name').value, desc = f.querySelector('.proj-desc').value;
                if (n || desc) projHtml += `<div class="cv-item"><div class="cv-item-title" style="margin-bottom:0.5rem">${n || 'Proje'}</div><div class="cv-desc">${formatText(desc)}</div></div>`;
            });
            document.getElementById('cv-proj-container').innerHTML = projHtml;
            document.getElementById('cv-section-projects').classList.toggle('hidden', projHtml === '');

            // Diller
            const langForms = document.querySelectorAll('#lang-list .item-card');
            let langHtml = '';
            langForms.forEach(f => {
                const n = f.querySelector('.lang-name').value, val = f.querySelector('.lang-level').value;
                if (n) {
                    if (['1', '2', '3', '4', '5'].includes(val)) {
                        let lvl = parseInt(val);
                        let dots = ''; for (let i = 1; i <= 5; i++) dots += `<div class="lang-dot ${i <= lvl ? 'filled' : ''}"></div>`;
                        langHtml += `<div class="lang-item"><span>${n}</span><div class="lang-dots">${dots}</div></div>`;
                    } else {
                        langHtml += `<div class="lang-item"><span>${n}</span><span style="font-weight:700; opacity:0.9;">${val}</span></div>`;
                    }
                }
            });
            document.getElementById('cv-lang-container').innerHTML = langHtml;
            document.getElementById('cv-section-languages').classList.toggle('hidden', langHtml === '');

            // Sertifikalar
            const certForms = document.querySelectorAll('#cert-list .item-card');
            let certHtml = '';
            certForms.forEach(f => {
                const n = f.querySelector('.cert-name').value, i = f.querySelector('.cert-issuer').value, d = f.querySelector('.cert-date').value;
                if (n || i || d) certHtml += `<div class="cv-item"><div class="cv-item-header"><div class="cv-item-title">${n || 'Sertifika'}</div><div class="cv-item-date">${d || 'Tarih'}</div></div><div class="cv-item-subtitle" style="margin-bottom:0">${i || 'Kurum'}</div></div>`;
            });
            document.getElementById('cv-cert-container').innerHTML = certHtml;
            document.getElementById('cv-section-certs').classList.toggle('hidden', certHtml === '');

            // Referanslar
            const refForms = document.querySelectorAll('#ref-list .item-card');
            let refHtml = '<div class="ref-grid">'; let hasRef = false;
            refForms.forEach(f => {
                const n = f.querySelector('.ref-name').value, t = f.querySelector('.ref-title').value, c = f.querySelector('.ref-contact').value;
                if (n || t || c) { refHtml += `<div class="cv-item"><div class="cv-item-title">${n || 'İsim'}</div><div class="cv-item-subtitle" style="margin-bottom:0.2rem">${t || 'Ünvan'}</div><div class="cv-item-date">${c || 'İletişim'}</div></div>`; hasRef = true; }
            });
            refHtml += '</div>';
            document.getElementById('cv-ref-container').innerHTML = hasRef ? refHtml : '';
            document.getElementById('cv-section-refs').classList.toggle('hidden', !hasRef);

            applySectionOrder();
            debounceSave();
        }

        // --- DİĞER YARDIMCILAR ---
        function toggleFormSection(id) { document.getElementById(id).classList.toggle('collapsed'); }

        function toggleMobileEditor() {
            const panel = document.getElementById('editor-panel');
            const text = document.getElementById('mobileToggleText');
            panel.classList.toggle('mobile-open');
            if (panel.classList.contains('mobile-open')) {
                text.innerText = 'Önizle';
            } else {
                text.innerText = 'Düzenle';
            }
        }

        // Fotoğraf Yönetimi
        let photoUrl = '';
        function setupDragAndDrop() {
            const z = document.getElementById('photo-drop-zone'), i = document.getElementById('in-photo');
            z.addEventListener('click', e => { if (!e.target.closest('.btn-remove-photo') && !z.classList.contains('has-file')) i.click(); });
            z.addEventListener('dragover', e => { e.preventDefault(); if (!z.classList.contains('has-file')) z.classList.add('dragover'); });
            z.addEventListener('dragleave', e => { e.preventDefault(); z.classList.remove('dragover'); });
            z.addEventListener('drop', e => { e.preventDefault(); z.classList.remove('dragover'); if (!z.classList.contains('has-file') && e.dataTransfer.files[0]) { i.files = e.dataTransfer.files; handleFile(e.dataTransfer.files[0]); } });
        }
        function previewPhoto(e) { if (e.target.files[0]) handleFile(e.target.files[0]); }
        function handleFile(f) { const r = new FileReader(); r.onload = e => { photoUrl = e.target.result; updatePhotoDisplay(f.name); debounceSave(); }; r.readAsDataURL(f); }
        function removePhoto(e) { if (e) e.stopPropagation(); photoUrl = ''; document.getElementById('in-photo').value = ''; updatePhotoDisplay(); debounceSave(); }
        function updatePhotoDisplay(name = '') {
            const cvP = document.getElementById('cv-photo'), z = document.getElementById('photo-drop-zone'), s = document.getElementById('cv-sheet');
            if (photoUrl) { 
                cvP.style.backgroundImage = `url(${photoUrl})`; 
                cvP.style.backgroundSize = 'cover';
                cvP.style.backgroundPosition = 'center';
                cvP.style.display = 'block'; 
                s.classList.add('has-photo'); 
                z.classList.add('has-file'); 
                document.getElementById('photo-filename').innerText = name; 
            }
            else { 
                cvP.style.display = 'none'; 
                cvP.style.backgroundImage = '';
                s.classList.remove('has-photo'); 
                z.classList.remove('has-file'); 
            }
        }

        function updateMobileScale() {
            const sheet = document.getElementById('cv-sheet');
            if (window.innerWidth <= 1024) {
                const scale = (window.innerWidth - 20) / 794;
                sheet.style.transform = `scale(${scale})`;
                sheet.style.marginBottom = `${(1122 * scale) - 1122 + 40}px`;
            } else {
                sheet.style.transform = 'none';
                sheet.style.marginBottom = '3rem';
            }
        }

        window.addEventListener('resize', updateMobileScale);

        document.addEventListener('DOMContentLoaded', () => {
            setupDragAndDrop();
            ['exp-list', 'edu-list', 'proj-list', 'lang-list', 'cert-list', 'ref-list'].forEach(id => initSortable(id, '.item-card'));
            initSortable('main-sections-list', '.form-section');
            loadData();
            updateMobileScale();
        });