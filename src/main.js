import { addContact, getContacts, updateContact, deleteContact } from './api.js';
import './styles.css';

// DOM 요소
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const submitBtn = document.getElementById('submitBtn');
const contactsList = document.getElementById('contactsList');
const messageDiv = document.getElementById('message');

let contacts = [];
let editingId = null;

// 초기화
async function init() {
  await loadContacts();
}

// 전화번호 목록 로드
async function loadContacts() {
  try {
    showLoading();
    contacts = await getContacts();
    renderContacts();
    clearMessage();
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// 연락처 목록 렌더링
function renderContacts() {
  if (contacts.length === 0) {
    contactsList.innerHTML = '<tr><td colspan="4" class="no-data">등록된 연락처가 없습니다.</td></tr>';
    return;
  }

  contactsList.innerHTML = contacts
    .map(contact => `
      <tr>
        <td>${contact.name}</td>
        <td>${contact.phone_number}</td>
        <td>
          <button class="btn btn-edit" onclick="editContact('${contact.id}', '${contact.name}', '${contact.phone_number}')">수정</button>
        </td>
        <td>
          <button class="btn btn-delete" onclick="confirmDelete('${contact.id}')">삭제</button>
        </td>
      </tr>
    `)
    .join('');
}

// 전화번호 추가 또는 수정
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    showError('이름과 전화번호를 모두 입력해주세요.');
    return;
  }

  try {
    showLoading();
    disableForm();

    if (editingId) {
      // 수정
      await updateContact(editingId, name, phone);
      showSuccess('연락처가 수정되었습니다.');
      editingId = null;
      submitBtn.textContent = '추가';
    } else {
      // 추가
      await addContact(name, phone);
      showSuccess('연락처가 추가되었습니다.');
    }

    contactForm.reset();
    await loadContacts();
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
    enableForm();
  }
});

// 수정 모드로 전환
window.editContact = function(id, name, phone) {
  editingId = id;
  nameInput.value = name;
  phoneInput.value = phone;
  nameInput.focus();
  submitBtn.textContent = '수정';
  window.scrollTo(0, 0);
};

// 삭제 확인
window.confirmDelete = function(id) {
  if (confirm('이 연락처를 삭제하시겠습니까?')) {
    deleteContactConfirmed(id);
  }
};

// 삭제 실행
async function deleteContactConfirmed(id) {
  try {
    showLoading();
    disableForm();
    await deleteContact(id);
    showSuccess('연락처가 삭제되었습니다.');
    await loadContacts();
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
    enableForm();
  }
}

// 메시지 표시
function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
}

function showSuccess(text) {
  showMessage(text, 'success');
  setTimeout(clearMessage, 3000);
}

function showError(text) {
  showMessage(text, 'error');
}

function clearMessage() {
  messageDiv.textContent = '';
  messageDiv.className = 'message';
  messageDiv.style.display = 'none';
}

// 로딩 상태
function showLoading() {
  submitBtn.disabled = true;
}

function hideLoading() {
  submitBtn.disabled = false;
}

// 폼 활성화/비활성화
function disableForm() {
  nameInput.disabled = true;
  phoneInput.disabled = true;
  submitBtn.disabled = true;
}

function enableForm() {
  nameInput.disabled = false;
  phoneInput.disabled = false;
  submitBtn.disabled = false;
}

// 초기화
init();
