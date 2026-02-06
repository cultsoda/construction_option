'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, ClipboardCheck, Package, Monitor } from 'lucide-react'
import { ChecklistForm } from '@/components/checklist-form'
import { ModulesDisplay } from '@/components/modules-display'
import { PrototypeViewer } from '@/components/prototype-viewer'
import { useAppStore } from '@/store/useAppStore'

export default function Page() {
  const activeTab = useAppStore((state) => state.activeTab)
  const setActiveTab = useAppStore((state) => state.setActiveTab)

  return (
    <div className="min-h-screen">
      {/* Header with Gradient */}
      <header className="gradient-header shadow-lg border-b border-primary/20">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
              <Building2 className="h-8 w-8 text-white" strokeWidth={2.5} />
            </div>
          </div>
          
          <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-white tracking-tight text-balance">
            옵션 시스템 빌더
          </h1>
          
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground shadow-md">
              v1.0
            </span>
          </div>
        </div>
      </header>

      {/* Decorative Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

      {/* Main Content */}
      <main className="container mx-auto px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-3 bg-transparent p-0 mb-10 h-auto">
            <TabsTrigger 
              value="checklist" 
              className="flex items-center gap-3 rounded-xl border-2 border-border bg-card px-6 py-4 text-base font-semibold shadow-sm transition-all hover:shadow-md hover:border-primary/40 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
            >
              <ClipboardCheck className="h-5 w-5" />
              체크리스트
            </TabsTrigger>
            <TabsTrigger 
              value="modules" 
              className="flex items-center gap-3 rounded-xl border-2 border-border bg-card px-6 py-4 text-base font-semibold shadow-sm transition-all hover:shadow-md hover:border-primary/40 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
            >
              <Package className="h-5 w-5" />
              모듈 확인
            </TabsTrigger>
            <TabsTrigger 
              value="prototype" 
              className="flex items-center gap-3 rounded-xl border-2 border-border bg-card px-6 py-4 text-base font-semibold shadow-sm transition-all hover:shadow-md hover:border-primary/40 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
            >
              <Monitor className="h-5 w-5" />
              프로토타입
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="mt-0">
            <ChecklistForm onNavigateToModules={() => setActiveTab('modules')} />
          </TabsContent>

          <TabsContent value="modules" className="mt-0">
            <ModulesDisplay 
              onNavigateToChecklist={() => setActiveTab('checklist')}
              onNavigateToPrototype={() => setActiveTab('prototype')}
            />
          </TabsContent>

          <TabsContent value="prototype" className="mt-0">
            <PrototypeViewer onNavigateToModules={() => setActiveTab('modules')} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
