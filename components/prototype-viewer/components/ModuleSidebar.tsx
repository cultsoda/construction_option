/**
 * ModuleSidebar - 모듈 선택 사이드바 (LNB)
 *
 * 카테고리별 모듈 목록을 표시하고 선택할 수 있는 사이드바
 */

import React from 'react'
import { ChevronRight } from 'lucide-react'
import { ModulesByCategory } from '../types'

interface ModuleSidebarProps {
  modulesByCategory: ModulesByCategory
  selectedModule: string
  expandedCategories: Set<string>
  onSelectModule: (moduleId: string) => void
  onToggleCategory: (category: string) => void
}

export function ModuleSidebar({
  modulesByCategory,
  selectedModule,
  expandedCategories,
  onSelectModule,
  onToggleCategory,
}: ModuleSidebarProps) {
  return (
    <div className="w-[300px] h-full flex-none border-r bg-background flex flex-col z-10 shadow-md">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4 pb-24">
          <h2 className="text-lg font-bold px-2">모듈 선택</h2>
          {Object.entries(modulesByCategory).map(([category, modules]) => {
            const isExpanded = expandedCategories.has(category)
            return (
              <div key={category} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => onToggleCategory(category)}
                  className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {category}
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="p-2 space-y-1 bg-white">
                    {modules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => onSelectModule(module.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs transition-all ${
                          selectedModule === module.id
                            ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                            : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <span className="font-bold mr-2">{module.id}</span>
                        {module.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
