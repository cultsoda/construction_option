import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

interface SpaceData {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

interface HighlightArea {
  id: string
  name: string
  space: string
  color: string
}

interface M03_4_DropdownNavProps {
  deviceView: DeviceView
  m03_4_highlightedAreas: string[]
  setM03_4_highlightedAreas: (areas: string[]) => void
  highlightAreas: HighlightArea[]
  sampleSpaceData: SpaceData[]
}

const optionList = [
  { id: 'opt1', name: '주방 가구장', space: 'kitchen', price: '200만' },
  { id: 'opt2', name: '거실 우물천장', space: 'living', price: '150만' },
  { id: 'opt3', name: '침실1 붙박이장', space: 'bedroom1', price: '120만' },
  { id: 'opt4', name: '침실2 확장', space: 'bedroom2', price: '300만' },
  { id: 'opt5', name: '공용 욕실 타일', space: 'bathroom', price: '50만' },
  { id: 'opt6', name: '주방 아일랜드', space: 'kitchen', price: '80만' },
]

export function M03_4_DropdownNav({
  deviceView,
  m03_4_highlightedAreas, // Not used directly, using local state for demo
  setM03_4_highlightedAreas,
  highlightAreas,
  sampleSpaceData,
}: M03_4_DropdownNavProps) {
  const [activeSpace, setActiveSpace] = useState<string | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleOptionClick = (option: typeof optionList[0]) => {
    setActiveSpace(option.space)
    
    // Toggle selection
    if (selectedOptions.includes(option.id)) {
      setSelectedOptions(selectedOptions.filter(id => id !== option.id))
    } else {
      setSelectedOptions([...selectedOptions, option.id])
    }
  }

  const handleOptionHover = (spaceId: string | null) => {
    setActiveSpace(spaceId)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col min-h-full bg-slate-50">
        
        {/* 상단: 공간 맵 (Space Map) */}
        <div className="p-6 bg-white border-b-2 border-slate-200 shadow-sm sticky top-0 z-10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            📍 공간 맵
            <Badge variant="outline" className="text-xs font-normal">
              옵션을 선택하면 위치가 표시됩니다
            </Badge>
          </h2>
          
          <div className="grid grid-cols-3 gap-2 h-48 aspect-video mx-auto max-w-sm bg-slate-100 p-2 rounded-xl border border-slate-300 relative">
            {/* 침실 1 */}
            <div 
              className={`col-span-1 row-span-2 rounded-lg flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                activeSpace === 'bedroom1' 
                  ? 'bg-orange-100 border-orange-500 text-orange-700 scale-105 shadow-md z-10' 
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              침실 1
            </div>
            
            {/* 거실 */}
            <div 
              className={`col-span-1 row-span-2 rounded-lg flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                activeSpace === 'living' 
                  ? 'bg-green-100 border-green-500 text-green-700 scale-105 shadow-md z-10' 
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              거실
            </div>
            
            {/* 주방 */}
            <div 
              className={`col-span-1 row-span-2 rounded-lg flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                activeSpace === 'kitchen' 
                  ? 'bg-blue-100 border-blue-500 text-blue-700 scale-105 shadow-md z-10' 
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              주방
            </div>

            {/* 침실 2 */}
            <div 
              className={`col-span-1 rounded-lg flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                activeSpace === 'bedroom2' 
                  ? 'bg-purple-100 border-purple-500 text-purple-700 scale-105 shadow-md z-10' 
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              침실 2
            </div>

            {/* 욕실 */}
            <div 
              className={`col-span-2 rounded-lg flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                activeSpace === 'bathroom' 
                  ? 'bg-cyan-100 border-cyan-500 text-cyan-700 scale-105 shadow-md z-10' 
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              욕실
            </div>
          </div>
        </div>

        {/* 하단: 옵션 리스트 (Option List) */}
        <div className="flex-1 p-6 overflow-auto">
          <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
            옵션 목록
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {optionList.map((option) => {
              const isSelected = selectedOptions.includes(option.id)
              const isActive = activeSpace === option.space

              return (
                <div
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => handleOptionHover(option.space)}
                  onMouseLeave={() => handleOptionHover(null)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                    isSelected 
                      ? 'border-primary bg-primary/5' 
                      : isActive
                        ? 'border-primary/50 bg-white shadow-sm'
                        : 'border-white bg-white shadow-sm hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-bold ${isSelected ? 'text-primary' : 'text-slate-700'}`}>
                        {option.name}
                      </span>
                      {isSelected && <Badge className="h-5 px-1.5 text-[10px]">선택됨</Badge>}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className={`px-1.5 py-0.5 rounded ${isActive ? 'bg-slate-200 text-slate-700 font-bold' : 'bg-slate-100'}`}>
                        {sampleSpaceData.find(s => s.id === option.space)?.name || option.space}
                      </span>
                      <span>+ {option.price}</span>
                    </div>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected 
                      ? 'border-primary bg-primary text-white' 
                      : 'border-slate-300 group-hover:border-primary/50'
                  }`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DeviceFrame>
  )
}
