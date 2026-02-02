"use client"

import { ArrowUpRight, Calendar, Users, BarChart3, Clock, Edit, Check, Copy, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Simple Sparkline Component
function Sparkline({ data, color = "text-green-500" }: { data: number[], color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const height = 30
  const width = 60

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * height
    return `${x},${y}`
  }).join(" ")

  return (
    <svg width={width} height={height} className={cn("overflow-visible", color)} stroke="currentColor" fill="none" strokeWidth="2">
      <polyline points={points} />
    </svg>
  )
}

function StatCard({ title, value, label, icon: Icon, trendData }: { title: string, value: string, label: string, icon: any, trendData: number[] }) {
  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="text-2xl font-bold mt-2">{value}</div>
        </div>
        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-xs text-green-500 font-medium">
          <ArrowUpRight className="h-3 w-3 mr-1" />
          {label}
        </div>
        <Sparkline data={trendData} />
      </div>
    </div>
  )
}

export default function Home() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handlePostNow = (id: number, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Mock data for activities
  const recentActivities = [
    { id: 1, title: "โพสต์แผนภาพคณิตศาสตร์ใหม่", desc: 'สร้างเมื่อ 2 ชั่วโมงที่แล้วสำหรับ "คณิตศาสตร์ เทอม 1"', status: "ร่าง", content: "เนื้อหาโพสต์..." },
    { id: 2, title: "สรุปสูตรตรีโกณมิติ", desc: 'สร้างเมื่อ 5 ชั่วโมงที่แล้ว', status: "พร้อมโพสต์", content: "สรุปสูตรตรีโกณฯ ครบจบในภาพเดียว!..." },
    { id: 3, title: "Quiz ประจำวัน", desc: 'สร้างเมื่อวานนี้', status: "โพสต์แล้ว", content: "Quiz วันนี้: sin(30) + cos(60) เท่ากับเท่าไหร่?" },
  ]

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">แดชบอร์ด</h1>
          <p className="text-muted-foreground mt-2">ภาพรวมประสิทธิภาพคอนเทนต์โซเชียลของคุณ</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Users className="h-4 w-4" />
            <span>ดูโปรเจกต์ทั้งหมด</span>
          </button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            <span>สร้างจากโปรเจกต์เดิม (Remix)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="โพสต์ที่วางแผนไว้" value="12" label="+4 จากสัปดาห์ที่แล้ว" icon={Calendar} trendData={[5, 8, 6, 9, 10, 11, 12]} />
        <StatCard title="ฉบับร่างที่สร้างแล้ว" value="34" label="+12% การใช้งาน" icon={BarChart3} trendData={[20, 22, 25, 28, 30, 32, 34]} />
        <StatCard title="โปรเจกต์ทั้งหมด" value="4" label="แคมเปญที่ใช้งานอยู่" icon={Users} trendData={[1, 1, 2, 2, 3, 4, 4]} />
        <StatCard title="ชั่วโมงที่กำหนดการ" value="18" label="7 วันข้างหน้า" icon={Clock} trendData={[10, 12, 15, 12, 14, 16, 18]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-semibold mb-4">กิจกรรมล่าสุด</h3>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors border-b last:border-0 border-border/50 group">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs shrink-0">
                    IMG
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.desc}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full shrink-0",
                      activity.status === "พร้อมโพสต์" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                        activity.status === "ร่าง" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    )}>
                      {activity.status}
                    </span>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/generator?id=${activity.id}`} className="p-2 hover:bg-background rounded-full border border-transparent hover:border-border transition-all" title="แก้ไข">
                        <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                      {activity.status === "พร้อมโพสต์" && (
                        <button
                          onClick={() => handlePostNow(activity.id, activity.content)}
                          className="p-2 hover:bg-background rounded-full border border-transparent hover:border-border transition-all"
                          title="โพสต์เลย (คัดลอก)"
                        >
                          {copiedId === activity.id ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 w-24 h-24 rounded-full blur-xl"></div>
            <h3 className="font-bold text-lg relative z-10">สร้างด่วน ✨</h3>
            <p className="text-sm opacity-90 mt-2 mb-6 relative z-10">ต้องการแคปชั่นด่วน? เข้าไปที่ตัวสร้างคอนเทนต์เลย</p>
            <Link href="/generator" className="block w-full text-center py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors relative z-10">
              สร้างเลย
            </Link>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">กำหนดการเร็วๆ นี้</h3>
              <Link href="/planner" className="text-xs text-primary hover:underline">ดูทั้งหมด</Link>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3 items-center text-sm">
                <div className="w-12 text-muted-foreground text-right">09:00</div>
                <div className="flex-1 p-2 bg-muted rounded border border-l-4 border-l-orange-500 truncate">คำคมสร้างแรงบันดาลใจตอนเช้า</div>
              </div>
              <div className="flex gap-3 items-center text-sm">
                <div className="w-12 text-muted-foreground text-right">14:00</div>
                <div className="flex-1 p-2 bg-muted rounded border border-l-4 border-l-blue-500 truncate">วิดีโอสอน: เศษส่วน</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
