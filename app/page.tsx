'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, ClipboardCheck, Package, Monitor, FileText, LayoutGrid } from 'lucide-react'
import { ChecklistForm } from '@/components/checklist-form'
import { ModulesDisplay } from '@/components/modules-display'
import { PrototypeViewer } from '@/components/prototype-viewer'
import { ProjectDocs } from '@/components/project-docs'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'

export default function Page() {
  const activeTab = useAppStore((state) => state.activeTab)
  const setActiveTab = useAppStore((state) => state.setActiveTab)
  const viewMode = useAppStore((state) => state.viewMode)
  const setViewMode = useAppStore((state) => state.setViewMode)

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header with Gradient */}
      <header className="gradient-header shadow-lg border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
              <Building2 className="h-8 w-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                옵션 시스템 빌더
              </h1>
              <p className="text-xs text-white/70 font-medium">Auto-generated Option System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-black/20 p-1 rounded-lg backdrop-blur-md border border-white/10">
            <Button
              onClick={() => setViewMode('builder')}
              variant="ghost"
              size="sm"
              className={`gap-2 h-9 text-sm font-semibold transition-all ${
                viewMode === 'builder' 
                  ? 'bg-white text-primary shadow-sm hover:bg-white hover:text-primary' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              시스템 빌더
            </Button>
            <div className="w-px h-4 bg-white/20" />
            <Button
              onClick={() => setViewMode('docs')}
              variant="ghost"
              size="sm"
              className={`gap-2 h-9 text-sm font-semibold transition-all ${
                viewMode === 'docs' 
                  ? 'bg-white text-primary shadow-sm hover:bg-white hover:text-primary' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileText className="h-4 w-4" />
              기획서
            </Button>
          </div>
        </div>
      </header>

      {/* Decorative Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 sticky top-20 z-40" />

      {/* Main Content */}
      <main className="container mx-auto px-8 py-12">
        {viewMode === 'builder' ? (
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
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

            <TabsContent value="checklist" className="mt-0 focus-visible:outline-none">
              <ChecklistForm onNavigateToModules={() => setActiveTab('modules')} />
            </TabsContent>

            <TabsContent value="modules" className="mt-0 focus-visible:outline-none">
              <ModulesDisplay 
                onNavigateToChecklist={() => setActiveTab('checklist')}
                onNavigateToPrototype={() => setActiveTab('prototype')}
              />
            </TabsContent>

            <TabsContent value="prototype" className="mt-0 focus-visible:outline-none">
              <PrototypeViewer onNavigateToModules={() => setActiveTab('modules')} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProjectDocs />
          </div>
        )}
      </main>
    </div>
  )
}