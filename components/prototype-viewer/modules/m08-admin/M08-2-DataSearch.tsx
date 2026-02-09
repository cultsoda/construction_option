/**
 * M08-2: 데이터 검색 기능
 * 제출된 견적 데이터를 검색하고 필터링하는 기능
 */

import React, { useState } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { DeviceView } from '../../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Download } from 'lucide-react'

interface M08_2_DataSearchProps {
  deviceView: DeviceView
}

const adminData = [
  { id: 'REQ-001', name: '홍길동1', type: '84A', amount: 15800000, date: '2024-02-05', status: '제출완료' },
  { id: 'REQ-002', name: '홍길동2', type: '59B', amount: 8500000, date: '2024-02-05', status: '임시저장' },
  { id: 'REQ-003', name: '홍길동3', type: '84B', amount: 21000000, date: '2024-02-04', status: '제출완료' },
  { id: 'REQ-004', name: '김철수', type: '101A', amount: 25000000, date: '2024-02-04', status: '제출완료' },
  { id: 'REQ-005', name: '이영희', type: '84A', amount: 16000000, date: '2024-02-03', status: '상담요청' }
]

export function M08_2_DataSearch({ deviceView }: M08_2_DataSearchProps) {
  const [m08_2_searchTerm, setM08_2_searchTerm] = useState('')
  const [m08_2_filterType, setM08_2_filterType] = useState('all')
  const [m08_2_searchResults, setM08_2_searchResults] = useState<any[]>(adminData)

  const handleSearch = () => {
    let filtered = adminData

    if (m08_2_searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.includes(m08_2_searchTerm) ||
          item.id.includes(m08_2_searchTerm)
      )
    }

    if (m08_2_filterType !== 'all') {
      filtered = filtered.filter((item) => item.type === m08_2_filterType)
    }

    setM08_2_searchResults(filtered)
  }

  return (
    <DeviceFrame deviceView={deviceView}>
      <div className="flex flex-col h-full p-6 space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            데이터 검색 기능
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-1">
            💡 제출된 견적 데이터를 다양한 조건으로 검색하고 필터링할 수 있습니다
          </p>
          <p className="text-sm text-muted-foreground">
            고객명, 타입, 기간 등으로 검색 가능합니다
          </p>
        </div>

        {/* 검색 영역 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">검색 조건</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  검색어
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="이름, 견적 ID"
                    value={m08_2_searchTerm}
                    onChange={(e) => setM08_2_searchTerm(e.target.value)}
                  />
                  <Button onClick={handleSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  타입 필터
                </label>
                <select
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={m08_2_filterType}
                  onChange={(e) => setM08_2_filterType(e.target.value)}
                >
                  <option value="all">전체</option>
                  <option value="84A">84A</option>
                  <option value="84B">84B</option>
                  <option value="59A">59A</option>
                  <option value="59B">59B</option>
                  <option value="101A">101A</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  시작일
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  종료일
                </label>
                <Input type="date" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSearch} className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                검색
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setM08_2_searchTerm("")
                  setM08_2_filterType("all")
                  setM08_2_searchResults(adminData)
                }}
              >
                초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 검색 결과 */}
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                검색 결과{" "}
                {m08_2_searchResults.length > 0 &&
                  `(${m08_2_searchResults.length}건)`}
              </CardTitle>
              {m08_2_searchResults.length > 0 && (
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="h-3 w-3" />
                  Excel 다운로드
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {m08_2_searchResults.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold">
                        견적 ID
                      </th>
                      <th className="text-left p-3 font-semibold">
                        고객명
                      </th>
                      <th className="text-left p-3 font-semibold">
                        타입
                      </th>
                      <th className="text-right p-3 font-semibold">
                        금액
                      </th>
                      <th className="text-left p-3 font-semibold">
                        날짜
                      </th>
                      <th className="text-center p-3 font-semibold">
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {m08_2_searchResults.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/30">
                        <td className="p-3 font-medium">{item.id}</td>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">
                          <Badge variant="outline">{item.type}</Badge>
                        </td>
                        <td className="p-3 text-right font-medium">
                          {item.amount.toLocaleString()}원
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {item.date}
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant={item.status === '제출완료' ? 'default' : 'secondary'} className="text-[10px]">
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">
                  검색 결과가 없습니다.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DeviceFrame>
  )
}
