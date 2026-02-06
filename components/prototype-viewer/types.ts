/**
 * Prototype Viewer - 공통 타입 정의
 *
 * 모든 모듈에서 사용하는 공통 타입을 정의합니다.
 */

// ============================================================================
// 모듈 관련 타입
// ============================================================================

export interface Module {
  id: string;
  name: string;
  hasPreview: boolean;
  category?: string;
}

export interface ModulesByCategory {
  [category: string]: Module[];
}

// ============================================================================
// 디바이스 관련 타입
// ============================================================================

export type DeviceView = "desktop" | "tablet" | "mobile";

// ============================================================================
// 조건 시뮬레이션 타입
// ============================================================================

export interface Condition {
  id: string;
  label: string;
  type: "toggle" | "radio";
  options?: string[];
  defaultValue: string | boolean;
}

// ============================================================================
// 옵션 데이터 타입 (M02용)
// ============================================================================

export interface OptionItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  isDefault?: boolean;
  image?: string;
  category?: string;
  parent?: string;
  excludes?: string[];
  requires?: string[];
}

export interface OptionData {
  depth1Options: OptionItem[];
  depth2Options: OptionItem[];
  depth3Options: OptionItem[];
}

// ============================================================================
// 공간 데이터 타입 (M03용)
// ============================================================================

export interface SpaceItem {
  id: string;
  name: string;
  icon: string;
}

// ============================================================================
// 견적 데이터 타입 (M04용)
// ============================================================================

export interface QuoteItem {
  name: string;
  category: string;
  price: number;
}

export interface QuoteCategory {
  id: number;
  name: string;
  description: string;
}

// ============================================================================
// 제출 데이터 타입 (M05용)
// ============================================================================

export interface SubmissionHistory {
  id: string;
  date: string;
  total: number;
  status: string;
  name?: string;
  type?: string;
}

// ============================================================================
// 가이드 데이터 타입 (M07용)
// ============================================================================

export interface GuideStep {
  id: number;
  title: string;
  image: string;
  description: string;
}

export interface VideoItem {
  id: number;
  title: string;
  duration: string;
  url: string;
  uploadDate: string;
}

export interface GuideMenuItem {
  id: string;
  name: string;
  icon: any; // lucide-react icon type
}

// ============================================================================
// 관리자 데이터 타입 (M08용)
// ============================================================================

export interface AdminStats {
  totalSubmissions: number;
  todaySubmissions: number;
  averageAmount: number;
  topOption: string;
}

export interface SearchResult {
  id: string;
  name: string;
  type: string;
  amount: number;
  date: string;
  status: string;
}

// ============================================================================
// Props 타입
// ============================================================================

export interface ModuleComponentProps {
  // 개별 모듈 컴포넌트가 받을 수 있는 공통 props
  // 필요 시 확장
}

export interface PrototypeViewerProps {
  onNavigateToModules: () => void;
}
