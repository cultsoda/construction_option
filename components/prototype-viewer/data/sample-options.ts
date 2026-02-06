/**
 * M02 옵션 구조 - 샘플 데이터
 */

import { OptionData } from '../types'

export const sampleOptionData: OptionData = {
  depth1Options: [
    {
      id: 'opt1-1',
      name: '확장형',
      price: 5000000,
      description: '거실 확장 + 침실2 확장',
      image: '/placeholder.svg',
    },
    {
      id: 'opt1-2',
      name: '기본형',
      price: 0,
      description: '기본 평면',
      isDefault: true,
      image: '/placeholder.svg',
    },
    {
      id: 'opt1-3',
      name: '알파룸형',
      price: 3000000,
      description: '알파룸 추가',
      image: '/placeholder.svg',
    },
  ],
  depth2Options: [
    {
      id: 'opt2-1',
      name: '주방 가구장',
      category: '주방',
      price: 2000000,
      parent: 'opt1-1',
      image: '/placeholder.svg',
    },
    {
      id: 'opt2-2',
      name: '냉장고장',
      category: '주방',
      price: 800000,
      excludes: ['opt2-3'],
      image: '/placeholder.svg',
    },
    {
      id: 'opt2-3',
      name: '김치냉장고장',
      category: '주방',
      price: 600000,
      excludes: ['opt2-2'],
      image: '/placeholder.svg',
    },
    {
      id: 'opt2-4',
      name: '시스템 에어컨 - 거실+침실',
      category: '냉난방',
      price: 1000000,
      image: '/placeholder.svg',
    },
    {
      id: 'opt2-5',
      name: '시스템 에어컨 - 전체',
      category: '냉난방',
      price: 2000000,
      image: '/placeholder.svg',
    },
    {
      id: 'opt2-6',
      name: '기본 조명 제외',
      category: '조명',
      price: -500000,
      description: '기본 조명을 제외하고 가격 차감',
      image: '/placeholder.svg',
    },
  ],
  depth3Options: [
    {
      id: 'opt3-1',
      name: '식기세척기',
      category: '주방가전',
      price: 1500000,
      requires: ['opt2-1'],
      parent: 'opt2-1',
      image: '/placeholder.svg',
    },
    {
      id: 'opt3-2',
      name: '인덕션 3구',
      category: '주방가전',
      price: 800000,
      requires: ['opt2-1'],
      parent: 'opt2-1',
      image: '/placeholder.svg',
    },
  ],
}
