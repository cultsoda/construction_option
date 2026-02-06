/**
 * M03 공간/네비게이션 - 샘플 데이터
 */

import { Home, Utensils, Bed, Bath } from 'lucide-react'

export const sampleSpaceData = [
  { id: 'living', name: '거실', icon: Home },
  { id: 'kitchen', name: '주방', icon: Utensils },
  { id: 'bedroom1', name: '침실1', icon: Bed },
  { id: 'bedroom2', name: '침실2', icon: Bed },
  { id: 'bathroom', name: '욕실', icon: Bath },
]

export const optionSpaceMapping: Record<string, string> = {
  '주방 가구장': 'kitchen',
  '침실 붙박이장': 'bedroom1',
  '거실 확장': 'living',
  '욕실 타일': 'bathroom',
}

export const highlightAreas = [
  { id: 'area1', name: '주방 상부장', space: 'kitchen', color: 'blue' },
  { id: 'area2', name: '거실 벽면', space: 'living', color: 'green' },
  { id: 'area3', name: '침실 붙박이장', space: 'bedroom1', color: 'orange' },
]

export const structureTypes = [
  {
    id: 'basic',
    name: '기본형',
    model: 'model_basic.glb',
    description: '84㎡ 기본 구조',
  },
  {
    id: 'expanded',
    name: '확장형',
    model: 'model_expanded.glb',
    description: '거실+침실2 확장',
  },
  {
    id: 'alpharoom',
    name: '알파룸형',
    model: 'model_alpha.glb',
    description: '알파룸 추가 구조',
  },
]
