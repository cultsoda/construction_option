"use client";

import { useState, useMemo, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceFrame } from "./prototype-viewer/components/DeviceFrame";
import { ModuleSidebar } from "./prototype-viewer/components/ModuleSidebar";
import {
  sampleSpaceData,
  optionSpaceMapping,
  highlightAreas,
  structureTypes,
} from "./prototype-viewer/data/sample-spaces";
import { sampleOptionData } from "./prototype-viewer/data/sample-options";
import {
  selectedOptionsSummary,
  optionCategories,
} from "./prototype-viewer/data/sample-quotes";
import { sampleHistory } from "./prototype-viewer/data/sample-history";
import {
  sampleGuideSteps,
  sampleVideos,
  popupPages,
  guideMenu,
} from "./prototype-viewer/data/sample-videos";
import {
  recentSubmissions,
  sampleSearchResults,
} from "./prototype-viewer/data/sample-submissions";
import { M01_1_SsoLogin } from "./prototype-viewer/modules/m01-auth/M01-1-SsoLogin";
import { M01_2_Login } from "./prototype-viewer/modules/m01-auth/M01-2-Login";
import { M01_3_UserInfo } from "./prototype-viewer/modules/m01-auth/M01-3-UserInfo";
import { M01_4_Validation } from "./prototype-viewer/modules/m01-auth/M01-4-Validation";
import { M01_5_ConfirmInfo } from "./prototype-viewer/modules/m01-auth/M01-5-ConfirmInfo";
import { M01_6_UserHeader } from "./prototype-viewer/modules/m01-auth/M01-6-UserHeader";
import { M02_1_Depth1 } from "./prototype-viewer/modules/m02-options/M02-1-Depth1";
import { M02_2_Depth2 } from "./prototype-viewer/modules/m02-options/M02-2-Depth2";
import { M02_3_Depth3 } from "./prototype-viewer/modules/m02-options/M02-3-Depth3";
import { M02_4_Depth1Link } from "./prototype-viewer/modules/m02-options/M02-4-Depth1Link";
import { M02_5_MultiSelect } from "./prototype-viewer/modules/m02-options/M02-5-MultiSelect";
import { M02_6_DefaultValue } from "./prototype-viewer/modules/m02-options/M02-6-DefaultValue";
import { M02_7_PriceDisplay } from "./prototype-viewer/modules/m02-options/M02-7-PriceDisplay";
import { M02_8_RealTimeCalc } from "./prototype-viewer/modules/m02-options/M02-8-RealTimeCalc";
import { M02_9_Exclusive } from "./prototype-viewer/modules/m02-options/M02-9-Exclusive";
import { M02_10_MinusOption } from "./prototype-viewer/modules/m02-options/M02-10-MinusOption";
import { M02_11_Dependency } from "./prototype-viewer/modules/m02-options/M02-11-Dependency";
import { M03_1_3DViewer } from "./prototype-viewer/modules/m03-space/M03-1-3DViewer";
import { M03_2_SpaceNav } from "./prototype-viewer/modules/m03-space/M03-2-SpaceNav";
import { M03_3_TabNav } from "./prototype-viewer/modules/m03-space/M03-3-TabNav";
import { M03_4_DropdownNav } from "./prototype-viewer/modules/m03-space/M03-4-DropdownNav";
import { M03_5_SliderNav } from "./prototype-viewer/modules/m03-space/M03-5-SliderNav";
import { M04_1_QuoteDownload } from "./prototype-viewer/modules/m04-quote/M04-1-QuoteDownload";
import { M04_2_EmailSend } from "./prototype-viewer/modules/m04-quote/M04-2-EmailSend";
import { M04_3_FinalQuote } from "./prototype-viewer/modules/m04-quote/M04-3-FinalQuote";
import { M04_4_QuoteCompare } from "./prototype-viewer/modules/m04-quote/M04-4-QuoteCompare";
import { M04_5_QuoteSummary } from "./prototype-viewer/modules/m04-quote/M04-5-QuoteSummary";
import { M04_6_FileDownload } from "./prototype-viewer/modules/m04-quote/M04-6-FileDownload";
import { M05_1_LocalSave } from "./prototype-viewer/modules/m05-data/M05-1-LocalSave";
import { M05_2_AutoSave } from "./prototype-viewer/modules/m05-data/M05-2-AutoSave";
import { M05_3_ApiSend } from "./prototype-viewer/modules/m05-data/M05-3-ApiSend";
import { M05_4_DataLoad } from "./prototype-viewer/modules/m05-data/M05-4-DataLoad";
import { M05_5_DataReset } from "./prototype-viewer/modules/m05-data/M05-5-DataReset";
import { M05_6_History } from "./prototype-viewer/modules/m05-data/M05-6-History";
// M06 UI Customizing
import { M06_1_Logo } from "./prototype-viewer/modules/m06-ui/M06-1-Logo";
import { M06_2_ColorTheme } from "./prototype-viewer/modules/m06-ui/M06-2-ColorTheme";
import { M06_3_Font } from "./prototype-viewer/modules/m06-ui/M06-3-Font";
import { M06_4_TypeInfo } from "./prototype-viewer/modules/m06-ui/M06-4-TypeInfo";
import { M06_5_ButtonLayout } from "./prototype-viewer/modules/m06-ui/M06-5-ButtonLayout";
// M07 Guide
import { M07_1_ImageGuide } from "./prototype-viewer/modules/m07-guide/M07-1-ImageGuide";
import { M07_2_VideoGuide } from "./prototype-viewer/modules/m07-guide/M07-2-VideoGuide";
import { M07_3_GuidePopup } from "./prototype-viewer/modules/m07-guide/M07-3-GuidePopup";
import { M07_4_GuideButton } from "./prototype-viewer/modules/m07-guide/M07-4-GuideButton";
// M08 Admin
import { M08_1_Dashboard } from "./prototype-viewer/modules/m08-admin/M08-1-Dashboard";
import { M08_2_DataSearch } from "./prototype-viewer/modules/m08-admin/M08-2-DataSearch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  Save,
  ChevronRight,
  ChevronLeft,
  Check,
  Home,
  Utensils,
  Bed,
  Bath,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  FileText,
  Upload,
  Clock,
  Database as DatabaseIcon,
  Palette,
  Type,
  Layout,
  Image,
  Video,
  HelpCircle,
  UserCog,
  Search,
  Monitor,
  Tablet,
  Smartphone,
  Key,
  X,
  ChevronDown,
  Download,
} from "lucide-react";

interface PrototypeViewerProps {
  onNavigateToModules: () => void;
}

interface Module {
  id: string;
  name: string;
  hasPreview: boolean;
  category: string;
}

interface Condition {
  id: string;
  label: string;
  type: "toggle" | "radio";
  options?: string[];
  defaultValue: string | boolean;
}

// M02 Sample Data - imported from data/sample-options.ts

// M03 Sample Data - imported from data/sample-spaces.ts

// M04 Sample Data - imported from data/sample-quotes.ts

// M05 Sample Data - imported from data/sample-history.ts

// M06 Sample Data
const themeColors = [
  { id: "blue", name: "블루", color: "#2563EB" },
  { id: "green", name: "그린", color: "#16A34A" },
  { id: "purple", name: "퍼플", color: "#9333EA" },
  { id: "orange", name: "오렌지", color: "#EA580C" },
];

const fontFamilies = [
  { id: "sans", name: "기본 고딕 (Pretendard)", class: "font-sans" },
  { id: "serif", name: "명조체 (Noto Serif)", class: "font-serif" },
  { id: "mono", name: "고정폭 (JetBrains Mono)", class: "font-mono" },
];

const layoutOptions = [
  {
    id: "bottom-fixed",
    name: "하단 고정형",
    description: "화면 하단에 버튼 고정",
  },
  { id: "inline", name: "인라인형", description: "컨텐츠 흐름에 따라 배치" },
  { id: "floating", name: "플로팅형", description: "우측 하단에 떠있는 버튼" },
];

// M08 Sample Data
const adminData = [
  {
    id: 1,
    user: "김철수",
    type: "84A",
    date: "2024-02-05",
    status: "제출완료",
  },
  {
    id: 2,
    user: "이영희",
    type: "59B",
    date: "2024-02-05",
    status: "임시저장",
  },
  {
    id: 3,
    user: "박민수",
    type: "84B",
    date: "2024-02-04",
    status: "제출완료",
  },
  {
    id: 4,
    user: "최지은",
    type: "101A",
    date: "2024-02-04",
    status: "제출완료",
  },
  {
    id: 5,
    user: "정현우",
    type: "59A",
    date: "2024-02-03",
    status: "상담요청",
  },
];

export function PrototypeViewer({ onNavigateToModules }: PrototypeViewerProps) {
  const selectedModulesStore = useAppStore((state) => state.selectedModules);
  const activePrototypeModule = useAppStore(
    (state) => state.activePrototypeModule
  );

  // Define all available modules with their categories
  const allModules = useMemo(
    () => ({
      "M01: 인증/접근 관리": [
        { id: "M01-1", name: "건설사 SSO 연동", hasPreview: false },
        { id: "M01-2", name: "자체 로그인 시스템", hasPreview: false },
        { id: "M01-3", name: "고객 정보 입력 폼", hasPreview: true },
        { id: "M01-4", name: "입력 정보 유효성 검증", hasPreview: true },
        { id: "M01-5", name: "정보 재입력 기능", hasPreview: false },
        { id: "M01-6", name: "입력 정보 상단 표시", hasPreview: false },
      ],
      "M02: 옵션 구조 및 선택": [
        { id: "M02-1", name: "1Depth 옵션 UI", hasPreview: false },
        { id: "M02-2", name: "2Depth 옵션 UI", hasPreview: true },
        { id: "M02-3", name: "3Depth 옵션 UI", hasPreview: true },
        { id: "M02-4", name: "1Depth 연동 로직", hasPreview: false },
        { id: "M02-5", name: "다중 선택 기능", hasPreview: false },
        { id: "M02-6", name: "옵션 기본값 설정", hasPreview: false },
        { id: "M02-7", name: "옵션별 가격 표시", hasPreview: false },
        { id: "M02-8", name: "실시간 금액 계산", hasPreview: false },
        { id: "M02-9", name: "배타적 선택 로직", hasPreview: false },
        { id: "M02-10", name: "마이너스 옵션 UI", hasPreview: false },
        { id: "M02-11", name: "필수 연관 선택 가이드", hasPreview: false },
      ],
      "M03: 공간/네비게이션": [
        { id: "M03-1", name: "3D 뷰어 기본", hasPreview: true },
        { id: "M03-2", name: "위치 버튼 네비게이션", hasPreview: true },
        { id: "M03-3", name: "옵션 선택 시 자동 이동", hasPreview: true },
        { id: "M03-4", name: "위치 하이라이트 표시", hasPreview: true },
        { id: "M03-5", name: "구조물 동적 교체", hasPreview: true },
      ],
      "M04: 견적 기능": [
        { id: "M04-1", name: "견적서 팝업", hasPreview: true },
        { id: "M04-2", name: "옵션 요약 표시", hasPreview: true },
        { id: "M04-3", name: "최종 견적서 화면", hasPreview: true },
        { id: "M04-4", name: "견적서 내 옵션 수정", hasPreview: true },
        { id: "M04-5", name: "다음/이전 버튼", hasPreview: true },
        { id: "M04-6", name: "견적서 파일 다운로드", hasPreview: true },
      ],
      "M05: 데이터 저장/전송": [
        { id: "M05-1", name: "구글 시트 API 연동", hasPreview: true },
        { id: "M05-2", name: "자체 DB 저장", hasPreview: true },
        { id: "M05-3", name: "건설사 API 전송", hasPreview: true },
        { id: "M05-4", name: "N회 제출 허용", hasPreview: true },
        { id: "M05-5", name: "1회 제출 제한", hasPreview: true },
        { id: "M05-6", name: "제출 이력 관리", hasPreview: true },
      ],
      "M06: UI 커스터마이징": [
        { id: "M06-1", name: "로고 교체", hasPreview: true },
        { id: "M06-2", name: "컬러 테마 설정", hasPreview: true },
        { id: "M06-3", name: "폰트 적용", hasPreview: true },
        { id: "M06-4", name: "타입 정보 표시", hasPreview: true },
        { id: "M06-5", name: "버튼 레이아웃 설정", hasPreview: true },
      ],
      "M07: 가이드/도움말": [
        { id: "M07-1", name: "이미지 가이드 제작", hasPreview: true },
        { id: "M07-2", name: "영상 가이드 제작", hasPreview: true },
        { id: "M07-3", name: "가이드 팝업", hasPreview: true },
        { id: "M07-4", name: "가이드 버튼", hasPreview: true },
      ],
      "M08: 관리 기능": [
        { id: "M08-1", name: "관리자 페이지", hasPreview: true },
        { id: "M08-2", name: "데이터 검색 기능", hasPreview: true },
      ],
    }),
    []
  );

  // Filter modules based on store selection
  const modulesByCategory = useMemo(() => {
    if (selectedModulesStore.length === 0) {
      return allModules;
    }

    // 이 줄이 정확히 useMemo 블록 안에 선언되어 있는지 확인하세요.
    const filtered: Record<string, any[]> = {};

    Object.entries(allModules).forEach(([category, modules]) => {
      const activeModules = modules.filter((m) =>
        selectedModulesStore.includes(m.id)
      );

      if (activeModules.length > 0) {
        filtered[category] = activeModules;
      }
    });

    return filtered; // 301라인의 return이 filtered를 찾을 수 있어야 합니다.
  }, [allModules, selectedModulesStore]);

  // Get the first available module ID for default selection
  const firstModuleId = useMemo(() => {
    const categories = Object.keys(modulesByCategory);
    // 이 부분에서 categories[0] 뒤에 타입을 명시해 줍니다.
    if (
      categories.length > 0 &&
      modulesByCategory[categories[0] as keyof typeof modulesByCategory]
        .length > 0
    ) {
      return modulesByCategory[
        categories[0] as keyof typeof modulesByCategory
      ][0].id;
    }
    return "M01-3";
  }, [modulesByCategory]);

  const [selectedModule, setSelectedModule] = useState(firstModuleId);

  // Sync selected module with store's active module (from deep linking)
  useEffect(() => {
    if (activePrototypeModule) {
      // Check if the requested module is actually available in the current selection
      const isAvailable = Object.values(modulesByCategory)
        .flat()
        .some((m) => m.id === activePrototypeModule);

      if (isAvailable) {
        setSelectedModule(activePrototypeModule);
      }
    }
  }, [activePrototypeModule, modulesByCategory]);

  // Update selected module if the current one is no longer available (e.g. deselected)
  useEffect(() => {
    const isCurrentModuleAvailable = Object.values(modulesByCategory)
      .flat()
      .some((m) => m.id === selectedModule);

    if (!isCurrentModuleAvailable) {
      setSelectedModule(firstModuleId);
    }
  }, [modulesByCategory, selectedModule, firstModuleId]);

  // Reset conditions when module changes
  useEffect(() => {
    const moduleConditions = getConditionsForModule(selectedModule);
    const newConditions: Record<string, any> = {};

    moduleConditions.forEach((cond) => {
      newConditions[cond.id] = cond.defaultValue;
    });

    setConditions(newConditions);
  }, [selectedModule]);

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(Object.keys(modulesByCategory))
  );
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [conditions, setConditions] = useState<Record<string, any>>({
    loginRequired: true,
    validationCheck: false,
    reenterMethod: "새로고침",
    validationType: "실시간",
    errorDisplay: "인라인",
    depth: "2",
    multiSelect: false,
    depthInfluence: true,
  });

  // Form state for M01-4
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "",
    unit: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Module selection state for M02-2
  const [selectedPackage, setSelectedPackage] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({
    aircon: "",
    door: "",
    closet: "",
  });
  const [showPackageConfirm, setShowPackageConfirm] = useState(false);

  // States for M01-2: 자체 로그인 시스템
  const [loginData, setLoginData] = useState({ id: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    if (!loginData.id || !loginData.password) {
      setLoginError("아이디와 비밀번호를 입력해주세요");
      return;
    }
    setLoginError("");
    // 로그인 성공 시뮬레이션
    alert("로그인 되었습니다!");
  };

  // States for M01-5: 정보 재입력 기능
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "홍길동",
    phone: "010-1234-5678",
    type: "84A",
    unit: "101동 1001호",
  });

  // States for M02 Modules
  const [selected1Depth, setSelected1Depth] = useState<string>("opt1-2");
  const [main1Depth, setMain1Depth] = useState<string>("opt1-1");
  const [dependent2Depth, setDependent2Depth] = useState<string[]>([]);
  const [multiSelection, setMultiSelection] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>(""); // Initialized later in useEffect or useMemo if needed, but simple string is fine
  const [calc1Depth, setCalc1Depth] = useState<string>("opt1-2");
  const [calc2Depth, setCalc2Depth] = useState<string[]>([]);
  const [exclusiveSelection, setExclusiveSelection] = useState<string[]>([]);
  const [minusSelection, setMinusSelection] = useState<string[]>([]);
  const [depSelection, setDepSelection] = useState<string[]>([]);

  // States for M03: 공간/네비게이션
  const [m03_2_currentSpace, setM03_2_currentSpace] = useState("living");
  const [m03_3_selectedOption, setM03_3_selectedOption] = useState("");
  const [m03_3_targetSpace, setM03_3_targetSpace] = useState("");
  const [m03_3_isMoving, setM03_3_isMoving] = useState(false);
  const [m03_4_highlightedAreas, setM03_4_highlightedAreas] = useState<
    string[]
  >([]);
  const [m03_5_structureType, setM03_5_structureType] = useState("basic");

  // States for M04: 견적 기능
  const [m04_2_selectedOptions, setM04_2_selectedOptions] = useState<any[]>([]);
  const [m04_4_quoteOptions, setM04_4_quoteOptions] = useState<any[]>(
    selectedOptionsSummary
  );
  const [m04_4_isEditing, setM04_4_isEditing] = useState(false);
  const [m04_5_currentCategory, setM04_5_currentCategory] = useState(0);

  // States for M05: 데이터 저장/전송
  const [m05_2_isSaving, setM05_2_isSaving] = useState(false);
  const [m05_2_saveResult, setM05_2_saveResult] = useState<any>(null);
  const [m05_3_isSending, setM05_3_isSending] = useState(false);
  const [m05_3_sendResult, setM05_3_sendResult] = useState<any>(null);
  const [m05_4_submitCount, setM05_4_submitCount] = useState(0);
  const [m05_4_maxSubmits, setM05_4_maxSubmits] = useState(5);
  const [m05_5_hasSubmitted, setM05_5_hasSubmitted] = useState(false);
  const [m05_5_submittedData, setM05_5_submittedData] = useState<any>(null);
  const [m05_6_history, setM05_6_history] = useState<any[]>(sampleHistory);
  const [m05_7_showConfirm, setM05_7_showConfirm] = useState(false);
  const [m05_7_isSubmitting, setM05_7_isSubmitting] = useState(false);

  // States for M06: UI 커스터마이징
  const [m06_1_logo, setM06_1_logo] = useState<string | null>(null);
  const [m06_2_color, setM06_2_color] = useState("blue");
  const [m06_3_font, setM06_3_font] = useState("sans");
  const [m06_4_typePos, setM06_4_typePos] = useState("top");
  const [m06_5_layout, setM06_5_layout] = useState("bottom-fixed");

  // States for M07: 가이드/도움말
  const [m07_1_currentStep, setM07_1_currentStep] = useState(0);
  const [m07_2_selectedVideo, setM07_2_selectedVideo] = useState<any>(null);
  const [m07_3_showPopup, setM07_3_showPopup] = useState(false);
  const [m07_3_currentPage, setM07_3_currentPage] = useState(0);
  const [m07_3_dontShowAgain, setM07_3_dontShowAgain] = useState(false);
  const [m07_4_showGuide, setM07_4_showGuide] = useState(false);
  const [m07_4_selectedGuide, setM07_4_selectedGuide] = useState("");

  // States for M08: 관리 기능
  const [m08_1_stats] = useState({
    totalSubmissions: 247,
    todaySubmissions: 15,
    averageAmount: 16500000,
    topOption: "주방 가구장",
  });
  const [m08_2_searchTerm, setM08_2_searchTerm] = useState("");
  const [m08_2_filterType, setM08_2_filterType] = useState("all");
  const [m08_2_searchResults, setM08_2_searchResults] = useState<any[]>([]);
  const [m08_3_isExporting, setM08_3_isExporting] = useState(false);
  const [m08_3_exportProgress, setM08_3_exportProgress] = useState(0);
  const [m08_3_includeOptions, setM08_3_includeOptions] = useState(true);
  const [m08_3_includeCustomerInfo, setM08_3_includeCustomerInfo] =
    useState(true);

  // Initialize currentSelection for M02-6
  useEffect(() => {
    const defaultOption = sampleOptionData.depth1Options.find(
      (opt) => opt.isDefault
    );
    if (defaultOption) {
      setCurrentSelection(defaultOption.id);
    }
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const getConditionsForModule = (moduleId: string): Condition[] => {
    switch (moduleId) {
      case "M01-4":
        return [
          {
            id: "validationType",
            label: "검증 타입",
            type: "radio",
            options: ["실시간", "제출시"],
            defaultValue: "실시간",
          },
          {
            id: "errorDisplay",
            label: "오류 표시",
            type: "radio",
            options: ["인라인", "팝업"],
            defaultValue: "인라인",
          },
        ];
      case "M02-2":
        return [
          {
            id: "multiSelect",
            label: "다중선택",
            type: "toggle",
            defaultValue: false,
          },
          {
            id: "depthInfluence",
            label: "1Depth 영향",
            type: "toggle",
            defaultValue: true,
          },
        ];
      case "M02-3":
        return [
          {
            id: "multiSelect",
            label: "다중선택",
            type: "toggle",
            defaultValue: false,
          },
          {
            id: "depthInfluence",
            label: "1Depth 영향",
            type: "toggle",
            defaultValue: true,
          },
        ];
      case "M02-5":
        return [
          {
            id: "maxSelection",
            label: "최대 선택 수",
            type: "radio",
            options: ["제한없음", "3개", "5개"],
            defaultValue: "제한없음",
          },
          {
            id: "showCount",
            label: "선택 개수 표시",
            type: "toggle",
            defaultValue: true,
          },
        ];
      case "M04-1":
        return [
          {
            id: "showImages",
            label: "이미지 표시",
            type: "toggle",
            defaultValue: true,
          },
          {
            id: "groupByCategory",
            label: "카테고리별 그룹",
            type: "toggle",
            defaultValue: true,
          },
          {
            id: "showPrice",
            label: "가격 표시",
            type: "toggle",
            defaultValue: true,
          },
        ];
      case "M04-3":
        return [];
      case "M04-6":
        return [];
      default:
        return [];
    }
  };

  const getPreviewContent = (moduleId: string) => {
    const isMobile = deviceView === "mobile";
    const isTablet = deviceView === "tablet";
    switch (moduleId) {
      case "M01-1":
        return <M01_1_SsoLogin deviceView={deviceView} />;

      case "M01-2":
        return (
          <M01_2_Login
            deviceView={deviceView}
            loginData={loginData}
            setLoginData={setLoginData}
            loginError={loginError}
            handleLogin={handleLogin}
          />
        );

      case "M01-3":
        return <M01_3_UserInfo deviceView={deviceView} />;

      case "M01-4":
        return (
          <M01_4_Validation
            deviceView={deviceView}
            formData={formData}
            setFormData={setFormData}
            conditions={conditions as any}
            submitAttempted={submitAttempted}
            setSubmitAttempted={setSubmitAttempted}
            showSubmitSuccess={showSubmitSuccess}
            setShowSubmitSuccess={setShowSubmitSuccess}
          />
        );
      case "M01-5":
        return (
          <M01_5_ConfirmInfo
            deviceView={deviceView}
            userInfo={userInfo}
            setIsEditing={setIsEditing}
          />
        );

      case "M01-6":
        return <M01_6_UserHeader deviceView={deviceView} />;
      case "M02-1":
        return (
          <M02_1_Depth1
            deviceView={deviceView}
            sampleOptionData={sampleOptionData}
            selected1Depth={selected1Depth}
            setSelected1Depth={setSelected1Depth}
          />
        );

      case "M02-2":
        return (
          <M02_2_Depth2
            deviceView={deviceView}
            isMobile={isMobile}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            conditions={conditions as any}
            showPackageConfirm={showPackageConfirm}
            setShowPackageConfirm={setShowPackageConfirm}
          />
        );

      case "M02-3":
        return (
          <M02_3_Depth3
            deviceView={deviceView}
            isMobile={isMobile}
            conditions={conditions as any} // 이 부분을 추가하세요!
          />
        );
      case "M02-4":
        return (
          <M02_4_Depth1Link
            deviceView={deviceView}
            sampleOptionData={sampleOptionData}
            main1Depth={main1Depth}
            setMain1Depth={setMain1Depth}
            dependent2Depth={dependent2Depth}
            setDependent2Depth={setDependent2Depth}
          />
        );
      case "M02-5":
        return (
          <M02_5_MultiSelect
            deviceView={deviceView}
            sampleOptionData={sampleOptionData}
            multiSelection={multiSelection}
            setMultiSelection={setMultiSelection}
            conditions={{
              maxSelection: conditions.maxSelection ?? "제한없음",
              showCount: conditions.showCount ?? true,
            }}
          />
        );
      case "M02-6":
        return (
          <M02_6_DefaultValue
            deviceView={deviceView}
            sampleOptionData={sampleOptionData}
            currentSelection={currentSelection}
            setCurrentSelection={setCurrentSelection}
          />
        );

      case "M02-7":
        return (
          <M02_7_PriceDisplay
            deviceView={deviceView}
            sampleOptionData={sampleOptionData}
          />
        );

      case "M02-8":
        return (
          <M02_8_RealTimeCalc
            deviceView={deviceView}
            sampleOptionData={sampleOptionData}
            calc1Depth={calc1Depth}
            setCalc1Depth={setCalc1Depth}
            calc2Depth={calc2Depth}
            setCalc2Depth={setCalc2Depth}
          />
        );

      case "M02-9":
        return (
          <M02_9_Exclusive
            deviceView={deviceView}
            sampleOptionData={sampleOptionData}
            exclusiveSelection={exclusiveSelection}
            setExclusiveSelection={setExclusiveSelection}
          />
        );

      case "M02-10":
        return (
          <M02_10_MinusOption
            deviceView={deviceView}
            sampleOptionData={sampleOptionData}
            minusSelection={minusSelection}
            setMinusSelection={setMinusSelection}
          />
        );

      case "M02-11":
        return (
          <M02_11_Dependency
            deviceView={deviceView}
            sampleOptionData={sampleOptionData}
            depSelection={depSelection}
            setDepSelection={setDepSelection}
          />
        );

      case "M03-1":
        return <M03_1_3DViewer deviceView={deviceView} />;

      case "M03-2":
        return (
          <M03_2_SpaceNav
            deviceView={deviceView}
            m03_2_currentSpace={m03_2_currentSpace}
            setM03_2_currentSpace={setM03_2_currentSpace}
            sampleSpaceData={sampleSpaceData}
          />
        );

      case "M03-3":
        return (
          <M03_3_TabNav
            deviceView={deviceView}
            m03_3_selectedOption={m03_3_selectedOption}
            setM03_3_selectedOption={setM03_3_selectedOption}
            m03_3_isMoving={m03_3_isMoving}
            setM03_3_isMoving={setM03_3_isMoving}
            m03_3_targetSpace={m03_3_targetSpace}
            setM03_3_targetSpace={setM03_3_targetSpace}
            optionSpaceMapping={optionSpaceMapping}
            sampleSpaceData={sampleSpaceData}
          />
        );

      case "M03-4":
        return (
          <M03_4_DropdownNav
            deviceView={deviceView}
            m03_4_highlightedAreas={m03_4_highlightedAreas}
            setM03_4_highlightedAreas={setM03_4_highlightedAreas}
            highlightAreas={highlightAreas}
            sampleSpaceData={sampleSpaceData}
          />
        );

      case "M03-5":
        return (
          <M03_5_SliderNav
            deviceView={deviceView}
            m03_5_structureType={m03_5_structureType}
            setM03_5_structureType={setM03_5_structureType}
            structureTypes={structureTypes}
          />
        );

      case "M04-1":
        return (
          <M04_1_QuoteDownload
            deviceView={deviceView}
            conditions={conditions as any}
          />
        );

      case "M04-3":
        return <M04_3_FinalQuote deviceView={deviceView} />;

      case "M04-2":
        return (
          <M04_2_EmailSend
            deviceView={deviceView}
            selectedOptionsSummary={selectedOptionsSummary}
          />
        );

      case "M04-4":
        return (
          <M04_4_QuoteCompare
            deviceView={deviceView}
            m04_4_quoteOptions={m04_4_quoteOptions}
            setM04_4_quoteOptions={setM04_4_quoteOptions}
            m04_4_isEditing={m04_4_isEditing}
            setM04_4_isEditing={setM04_4_isEditing}
          />
        );

      case "M04-5":
        return (
          <M04_5_QuoteSummary
            deviceView={deviceView}
            m04_5_currentCategory={m04_5_currentCategory}
            setM04_5_currentCategory={setM04_5_currentCategory}
            optionCategories={optionCategories}
          />
        );

      case "M04-6":
        return <M04_6_FileDownload deviceView={deviceView} />;

      case "M05-1":
        return <M05_1_LocalSave deviceView={deviceView} />;
      case "M05-2":
        return (
          <M05_2_AutoSave
            deviceView={deviceView}
            m05_2_isSaving={m05_2_isSaving}
            setM05_2_isSaving={setM05_2_isSaving}
            m05_2_saveResult={m05_2_saveResult}
            setM05_2_saveResult={setM05_2_saveResult}
          />
        );

      case "M05-3":
        return (
          <M05_3_ApiSend
            deviceView={deviceView}
            m05_3_isSending={m05_3_isSending}
            setM05_3_isSending={setM05_3_isSending}
            m05_3_sendResult={m05_3_sendResult}
            setM05_3_sendResult={setM05_3_sendResult}
          />
        );

      case "M05-4":
        return (
          <M05_4_DataLoad
            deviceView={deviceView}
            m05_4_submitCount={m05_4_submitCount}
            setM05_4_submitCount={setM05_4_submitCount}
            m05_4_maxSubmits={m05_4_maxSubmits}
          />
        );

      case "M05-5":
        return (
          <M05_5_DataReset
            deviceView={deviceView}
            m05_5_hasSubmitted={m05_5_hasSubmitted}
            setM05_5_hasSubmitted={setM05_5_hasSubmitted}
          />
        );

      case "M05-6":
        return (
          <M05_6_History
            deviceView={deviceView}
            m05_6_history={m05_6_history}
          />
        );

      case "M06-1":
        return (
          <M06_1_Logo
            deviceView={deviceView}
            m06_1_logo={m06_1_logo}
            setM06_1_logo={setM06_1_logo}
          />
        );

      case "M06-2":
        return (
          <M06_2_ColorTheme
            deviceView={deviceView}
            m06_2_color={m06_2_color}
            setM06_2_color={setM06_2_color}
          />
        );

      case "M06-3":
        return (
          <M06_3_Font
            deviceView={deviceView}
            m06_3_font={m06_3_font}
            setM06_3_font={setM06_3_font}
          />
        );

      case "M06-4":
        return (
          <M06_4_TypeInfo
            deviceView={deviceView}
            m06_4_typePos={m06_4_typePos}
            setM06_4_typePos={setM06_4_typePos}
          />
        );

      case "M06-5":
        return (
          <M06_5_ButtonLayout
            deviceView={deviceView}
            m06_5_layout={m06_5_layout}
            setM06_5_layout={setM06_5_layout}
          />
        );

      case "M07-1":
        return (
          <M07_1_ImageGuide
            deviceView={deviceView}
            m07_1_currentStep={m07_1_currentStep}
            setM07_1_currentStep={setM07_1_currentStep}
          />
        );

      case "M07-2":
        return (
          <M07_2_VideoGuide
            deviceView={deviceView}
            m07_2_selectedVideo={m07_2_selectedVideo}
            setM07_2_selectedVideo={setM07_2_selectedVideo}
          />
        );

      case "M07-3":
        return (
          <M07_3_GuidePopup
            deviceView={deviceView}
            m07_3_showPopup={m07_3_showPopup}
            setM07_3_showPopup={setM07_3_showPopup}
          />
        );

      case "M07-4":
        return <M07_4_GuideButton deviceView={deviceView} />;

      case "M08-1":
        return <M08_1_Dashboard deviceView={deviceView} />;

      case "M08-2":
        return <M08_2_DataSearch deviceView={deviceView} />;

      default:
        const module = Object.values(allModules)
          .flat()
          .find((m) => m.id === moduleId);

        return (
          <DeviceFrame deviceView={deviceView}>
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-muted rounded-xl mx-auto mb-6 flex items-center justify-center">
                  <Monitor className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-lg font-semibold text-foreground mb-2">
                  {module?.name || moduleId}
                </p>
                <Badge variant="outline" className="mb-4">
                  {moduleId}
                </Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  이 모듈의 프로토타입은 다음 단계에서 구현됩니다.
                </p>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                  <p className="font-semibold mb-1">📋 구현 예정 (Phase 2-5)</p>
                  <p>SYSTEM_FLOW.md를 참고하여 구현됩니다.</p>
                </div>
              </div>
            </div>
          </DeviceFrame>
        );
    }
  };

  const currentConditions = getConditionsForModule(selectedModule);

  return (
    <div className="relative w-full h-[calc(100vh-300px)] min-h-[600px] border rounded-xl shadow-sm overflow-hidden bg-background flex flex-col">
      <div className="flex flex-1 overflow-hidden h-full">
        {/* LEFT SIDEBAR */}
        <ModuleSidebar
          modulesByCategory={modulesByCategory}
          selectedModule={selectedModule}
          expandedCategories={expandedCategories}
          onSelectModule={setSelectedModule}
          onToggleCategory={toggleCategory}
        />

        {/* RIGHT PREVIEW AREA */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
          {/* Top Controls Bar */}
          <div className="flex-none p-4 space-y-4 bg-white border-b shadow-sm z-10">
            {/* Device View Toggle */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">
                디바이스 설정
              </h3>
              <div className="flex bg-muted p-1 rounded-lg">
                {[
                  { value: "desktop", icon: Monitor, label: "PC" },
                  { value: "tablet", icon: Tablet, label: "Tablet" },
                  { value: "mobile", icon: Smartphone, label: "Mobile" },
                ].map((device) => {
                  const Icon = device.icon;
                  const isActive = deviceView === device.value;
                  return (
                    <button
                      key={device.value}
                      onClick={() => setDeviceView(device.value as any)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isActive
                          ? "bg-white text-primary shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {device.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Condition Controls */}
            {currentConditions.length > 0 && (
              <div className="pt-2 border-t">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  조건 시뮬레이션
                </h3>
                <div className="flex flex-wrap gap-4">
                  {currentConditions.map((condition) => (
                    <div
                      key={condition.id}
                      className="flex items-center gap-3 bg-muted/30 px-3 py-1.5 rounded-lg border"
                    >
                      <span className="text-xs font-medium text-muted-foreground">
                        {condition.label}
                      </span>

                      {condition.type === "toggle" ? (
                        <div className="flex gap-1">
                          {["Y", "N"].map((option) => {
                            const isActive =
                              conditions[condition.id] === (option === "Y");
                            return (
                              <button
                                key={option}
                                onClick={() =>
                                  setConditions((prev) => ({
                                    ...prev,
                                    [condition.id]: option === "Y",
                                  }))
                                }
                                className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-bold transition-all ${
                                  isActive
                                    ? "bg-primary text-white"
                                    : "bg-white border text-muted-foreground hover:bg-slate-50"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          {condition.options?.map((option) => {
                            const isActive =
                              conditions[condition.id] === option;
                            return (
                              <button
                                key={option}
                                onClick={() =>
                                  setConditions((prev) => ({
                                    ...prev,
                                    [condition.id]: option,
                                  }))
                                }
                                className={`px-2 h-6 flex items-center justify-center rounded-md text-[10px] font-bold transition-all ${
                                  isActive
                                    ? "bg-primary text-white"
                                    : "bg-white border text-muted-foreground hover:bg-slate-50"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview Content Area */}
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
            {getPreviewContent(selectedModule)}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t shadow-lg z-50">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={onNavigateToModules}
            className="gap-2 border-2 bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
            이전
          </Button>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-2 text-sm bg-white">
              {selectedModule}
            </Badge>
            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              {(() => {
                // 1. 카테고리 키를 찾습니다.
                const categoryKey = Object.keys(modulesByCategory).find((cat) =>
                  modulesByCategory[cat as keyof typeof modulesByCategory].some(
                    (m) => m.id === selectedModule
                  )
                ) as keyof typeof modulesByCategory; // 여기서 타입을 확정 짓습니다.

                // 2. 찾은 키로 안전하게 접근하여 이름을 가져옵니다.
                return categoryKey
                  ? modulesByCategory[categoryKey]?.find(
                      (m) => m.id === selectedModule
                    )?.name
                  : "";
              })()}
            </span>
          </div>

          {/* 코드 내보내기 버튼 - 프로토타입에서는 불필요하여 주석처리
          <Button
            variant="default"
            size="lg"
            className="gap-2 bg-slate-900 text-white hover:bg-slate-800"
          >
            <Download className="h-5 w-5" />
            코드 내보내기
          </Button>
          */}
        </div>
      </div>
    </div>
  );
}
