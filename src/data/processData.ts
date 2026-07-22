/**
 * @file processData.ts
 * @description B2B Project Execution Process Steps Data.
 */

import { ProcessStep } from "../types.ts";

/**
 * Record of B2B Process steps indexed by step number (1 through 4).
 */
export const PROCESS_DATA: Record<number, ProcessStep> = {
  1: {
    title: "고객 문의 및 요구사항 분석",
    subtitle: "고객의 비즈니스 니즈와 목적을 정밀하게 파악하는 맞춤 1:1 진단",
    tag: "상담 & 요구 분석",
    bgNum: "01",
    bullets: [
      "전문 컨설턴트의 1:1 맞춤 상담 및 비즈니스 환경 정밀 진단",
      "프로젝트 목표, 예산, 일정 및 핵심 요구사항 도출",
      "공공·기업 환경 및 가이드라인에 맞춘 최적의 추진 방향성 제시"
    ]
  },
  2: {
    title: "맞춤형 솔루션 기획 및 제안",
    subtitle: "분석된 데이터를 바탕으로 명확하고 체계적인 사업 실행안 기획",
    tag: "기획 & 제안",
    bgNum: "02",
    bullets: [
      "고객사별 특성에 최적화된 맞춤형 기획서 및 전략 제안서 작성",
      "합리적인 견적 산출 및 투명한 스케줄링 프로세스 제공",
      "전문 기획진의 전략 방향성 공유 및 사전 피드백 적극 수렴"
    ]
  },
  3: {
    title: "프로젝트 제작 및 실행",
    subtitle: "자체 전문 인프라와 분야별 제작진이 주도하는 완성도 높은 실행",
    tag: "제작 & 실행",
    bgNum: "03",
    bullets: [
      "자체 전문 스튜디오 인프라 및 최신 촬영·편집 시스템 투입",
      "전문 연출진, 모션그래픽, 크리에이티브 파트너 네트워크 간 유기적 협업 체계",
      "마일스톤별 실시간 진행 상황 공유 및 철저한 품질 관리(QC)"
    ]
  },
  4: {
    title: "최종 검수, 인도 및 사후 지원",
    subtitle: "안정적인 프로젝트 최종 인도와 지속적인 파트너십 케어",
    tag: "검수 & 사후지원",
    bgNum: "04",
    bullets: [
      "고객사 최종 검수 완료 및 맞춤 포맷/시스템 인도",
      "프로젝트 운영 가이드 제공 및 실시간 CS 대응 지원",
      "성과 분석 및 차기 프로젝트 연계를 위한 지속적인 피드백 파트너십"
    ]
  }
};
