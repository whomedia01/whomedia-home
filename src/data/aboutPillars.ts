/**
 * @file aboutPillars.ts
 * @description Corporate Philosophy Pillars Data for WHO Media (후미디어).
 */

import { AboutPillar } from "../types.ts";

/**
 * List of corporate philosophy pillars for the About showcase slider.
 */
export const ABOUT_PILLARS: AboutPillar[] = [
  {
    badge: "PILLAR 01 / BUSINESS HUB",
    number: "01",
    title: "통합 미디어 비전 (Vision)",
    desc: "미디어 콘텐츠, 온·오프라인 맞춤 교육, 언론 네트워크를 유기적으로 융합한 최적의 비즈니스 허브입니다.",
    bullets: [
      "기업 및 공공기관 맞춤형 디지털 미디어 비즈니스 솔루션 구축",
      "브랜드 가치 극대화 및 멀티 플랫폼 융복합 사업 연계"
    ],
    leftEyebrow: "WHO WE ARE",
    leftTitle: '디지털 통합<br class="hidden sm:block" /> <span class="text-blue-600">미디어 비즈니스 허브</span>',
    leftDesc: "(주)후미디어는 전문 스튜디오 인프라, 온·오프라인 평생교육원(후캠퍼스), 인터넷 언론 미디어를 유기적으로 결합하여 기업의 지속 가능한 성장과 가치 실현을 이끄는 디지털 통합 미디어 비즈니스 허브입니다."
  },
  {
    badge: "PILLAR 02 / SMART INFRA",
    number: "02",
    title: "체계적 비즈니스 솔루션 (System)",
    desc: "시네마틱 프로덕션 제작 역량과 차세대 클라우드 LMS 솔루션을 통합 제공합니다.",
    bullets: [
      "자체 전문 스튜디오 및 시네마틱 4K 미디어 제작 시스템",
      "SCORM 및 xAPI 표준 규격을 지원하는 맞춤형 인프라"
    ],
    leftEyebrow: "HOW WE BUILD",
    leftTitle: '체계적인 통합<br class="hidden sm:block" /> <span class="text-blue-600">미디어와 인프라</span>',
    leftDesc: "자체 보유한 스튜디오 연출진과 스마트 플랫폼 기술력을 결합하여 비즈니스 목적에 최적화된 몰입감 높은 솔루션을 제공합니다."
  },
  {
    badge: "PILLAR 03 / TANGIBLE VALUE",
    number: "03",
    title: "실질적 성과 창출 (Value)",
    desc: "단순 프로젝트 완수를 넘어 기업과 조직의 지속적 경쟁력 강화를 지향합니다.",
    bullets: [
      "정밀 데이터 분석 기반의 맞춤 리포트 및 성과 모니터링",
      "지속적인 사후 파트너십 케어 및 비즈니스 연계 가이드"
    ],
    leftEyebrow: "WHAT WE DELIVER",
    leftTitle: '비즈니스 성공을<br class="hidden sm:block" /> <span class="text-blue-600">이끄는 가치 실현</span>',
    leftDesc: "공공 및 B2B 과업 성공 경험을 바탕으로 철저한 검수와 성과 분석을 제공하여 고객사의 실질적 가치 창출에 기여합니다."
  }
];
