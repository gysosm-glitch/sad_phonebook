import { supabase } from './supabaseClient.js';

// CREATE - 전화번호 추가
export async function addContact(name, phoneNumber) {
  // 입력값 유효성 검사
  if (!name || !name.trim()) {
    throw new Error('이름을 입력해주세요.');
  }
  if (!phoneNumber || !phoneNumber.trim()) {
    throw new Error('전화번호를 입력해주세요.');
  }

  const { data, error } = await supabase
    .from('contacts')
    .insert([
      {
        name: name.trim(),
        phone_number: phoneNumber.trim()
      }
    ])
    .select();

  if (error) {
    throw new Error(`전화번호 추가 실패: ${error.message}`);
  }

  return data[0];
}

// READ - 전화번호 목록 조회
export async function getContacts() {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`전화번호 조회 실패: ${error.message}`);
  }

  return data || [];
}

// UPDATE - 전화번호 수정
export async function updateContact(id, name, phoneNumber) {
  // 입력값 유효성 검사
  if (!name || !name.trim()) {
    throw new Error('이름을 입력해주세요.');
  }
  if (!phoneNumber || !phoneNumber.trim()) {
    throw new Error('전화번호를 입력해주세요.');
  }

  const { data, error } = await supabase
    .from('contacts')
    .update({
      name: name.trim(),
      phone_number: phoneNumber.trim()
    })
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(`전화번호 수정 실패: ${error.message}`);
  }

  return data[0];
}

// DELETE - 전화번호 삭제
export async function deleteContact(id) {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`전화번호 삭제 실패: ${error.message}`);
  }

  return true;
}
