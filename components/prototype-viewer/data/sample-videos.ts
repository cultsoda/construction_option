/**
 * M07 가이드/도움말 - 샘플 데이터
 */

import { AlertCircle, Check, FileText, HelpCircle, Video } from 'lucide-react'

export const sampleGuideSteps = [
  {
    id: 1,
    title: '1단계: 로그인',
    image: 'guide-01.png',
    description: '동호수를 입력하세요',
  },
  {
    id: 2,
    title: '2단계: 타입 선택',
    image: 'guide-02.png',
    description: '원하는 타입을 선택하세요',
  },
  {
    id: 3,
    title: '3단계: 옵션 선택',
    image: 'guide-03.png',
    description: '옵션을 선택하세요',
  },
  {
    id: 4,
    title: '4단계: 견적 확인',
    image: 'guide-04.png',
    description: '최종 견적을 확인하세요',
  },
]

export const sampleVideos = [
  {
    id: 1,
    title: '전체 사용 가이드',
    duration: '05:30',
    url: 'video-full.mp4',
    uploadDate: '2024-01-15',
  },
  {
    id: 2,
    title: '옵션 선택 방법',
    duration: '02:15',
    url: 'video-option.mp4',
    uploadDate: '2024-01-16',
  },
  {
    id: 3,
    title: '견적서 다운로드',
    duration: '01:30',
    url: 'video-download.mp4',
    uploadDate: '2024-01-17',
  },
]

export const popupPages = [
  {
    title: '환영합니다!',
    content: '옵션 선택 시스템 사용법을 안내해드립니다.',
    icon: 'Sparkles',
  },
  {
    title: '타입을 선택하세요',
    content: '먼저 원하는 타입(평형)을 선택합니다.',
    icon: 'Home',
  },
  {
    title: '옵션을 선택하세요',
    content: '각 공간별 옵션을 자유롭게 선택할 수 있습니다.',
    icon: 'Check',
  },
  {
    title: '견적서를 확인하세요',
    content: '최종 견적서를 확인하고 제출할 수 있습니다.',
    icon: 'FileText',
  },
]

export const guideMenu = [
  { id: 'quick-start', name: '빠른 시작', icon: AlertCircle },
  { id: 'option-guide', name: '옵션 선택 가이드', icon: Check },
  { id: 'quote-guide', name: '견적서 가이드', icon: FileText },
  { id: 'faq', name: '자주 묻는 질문', icon: HelpCircle },
  { id: 'video', name: '영상 가이드', icon: Video },
]
