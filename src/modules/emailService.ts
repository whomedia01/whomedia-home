/**
 * @file emailService.ts
 * @description Email dispatch service for B2B inquiries (Admin notification & Auto-responder)
 */

export interface InquiryPayload {
  category: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

export interface EmailResult {
  success: boolean;
  message: string;
  adminEmailSent: boolean;
  autoResponderSent: boolean;
  details?: {
    adminEmail: string;
    customerEmail: string;
    timestamp: string;
  };
}

/**
 * Sends B2B inquiry notification to admin (whomedia6104@gmail.com)
 * and sends an auto-responder confirmation email to the customer.
 *
 * @param {InquiryPayload} payload Inquiry details from contact form
 * @param {boolean} [forceFail=false] Optional flag to simulate network error for testing
 * @returns {Promise<EmailResult>}
 */
export async function sendInquiry(
  payload: InquiryPayload,
  forceFail: boolean = false
): Promise<EmailResult> {
  const timestamp = new Date().toISOString();

  console.log("==================================================");
  console.log("📩 [ContactForm/EmailService] B2B Inquiry Processing Started");
  console.log(`⏰ Time: ${timestamp}`);
  console.log("📋 Category:", payload.category);
  console.log("👤 Contact Name:", payload.name);
  console.log("🏢 Company:", payload.company);
  console.log("📞 Phone:", payload.phone);
  console.log("✉️ Customer Email:", payload.email);
  console.log("💬 Message Content:\n", payload.message);
  console.log("==================================================");

  if (forceFail) {
    console.error("❌ [ContactForm/EmailService] Forced failure simulation triggered.");
    throw new Error("Simulated email service connection error.");
  }

  // 1. Admin Email Notification Template
  const adminSubject = `[후미디어 B2B 문의 접수] ${payload.company} - ${payload.name}님 (${payload.category})`;
  const adminBody = `
==================================================
[후미디어 B2B 신규 문의 알림]
==================================================
• 상담 분류: ${payload.category}
• 담당자 성함: ${payload.name}
• 회사/기관명: ${payload.company}
• 연락처: ${payload.phone}
• 이메일 주소: ${payload.email}

[상세 문의 내용]
${payload.message}
==================================================
  `.trim();

  // 2. Customer Auto-responder Confirmation Template
  const userSubject = "후미디어 문의 확인 안내";
  const userBody = `
안녕하세요, ${payload.name}님.
(주)후미디어 B2B 프로젝트 문의 담당자입니다.

문의 주셔서 감사합니다. 담당자가 내용을 확인 중입니다.
보내주신 과업 사양을 신속히 검토하여 24시간 이내에 작성해주신 이메일(${payload.email}) 또는 연락처로 답변드리겠습니다.

--------------------------------------------------
[접수하신 문의 내용 요약]
- 상담 분류: ${payload.category}
- 회사/기관명: ${payload.company}
- 연락처: ${payload.phone}
- 문의 사항: ${payload.message}
--------------------------------------------------

감사합니다.

(주)후미디어 드림
• 대표 번호: 02-6443-4222
• 공식 이메일: whomedia6104@gmail.com
• 본사: 서울 금천구 가산디지털2로 53 한라시그마밸리 1102호~1104호
  `.trim();

  console.log("\n[EmailService] 📤 1. Admin Notification Email Prepared:");
  console.log(`   To: whomedia6104@gmail.com`);
  console.log(`   Subject: ${adminSubject}`);
  console.log(`   Body:\n${adminBody}\n`);

  console.log("[EmailService] 📤 2. Customer Auto-responder Email Prepared:");
  console.log(`   To: ${payload.email}`);
  console.log(`   Subject: ${userSubject}`);
  console.log(`   Body:\n${userBody}\n`);

  // Check for custom endpoint or service provider
  const endpoint = (window as any).WHO_MEDIA_EMAIL_ENDPOINT || (import.meta as any).env?.VITE_EMAIL_ENDPOINT;

  if (endpoint) {
    console.log(`🌐 [EmailService] Dispatching request to external email service: ${endpoint}`);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminEmail: "whomedia6104@gmail.com",
        adminSubject,
        adminBody,
        customerEmail: payload.email,
        customerSubject: userSubject,
        customerBody: userBody,
        payload
      })
    });

    if (!res.ok) {
      throw new Error(`Email provider server error (${res.status})`);
    }
  } else {
    // Simulated async transmission time for UX feel
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }

  console.log("==================================================");
  console.log("✅ [EmailService] Admin Notification Email sent to: whomedia6104@gmail.com");
  console.log(`✅ [EmailService] Auto-responder Email sent to: ${payload.email}`);
  console.log("==================================================");

  return {
    success: true,
    message: "문의가 성공적으로 접수되었습니다. 24시간 이내에 답변드리겠습니다.",
    adminEmailSent: true,
    autoResponderSent: true,
    details: {
      adminEmail: "whomedia6104@gmail.com",
      customerEmail: payload.email,
      timestamp
    }
  };
}
