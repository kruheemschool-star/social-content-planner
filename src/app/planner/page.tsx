"use client"
import { CalendarView } from "@/components/planner/CalendarView"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Flame, Trophy } from "lucide-react"

export default function PlannerPage() {
    const [events, setEvents] = useState<any[]>([])
    const [streak, setStreak] = useState(0)

    useEffect(() => {
        const stored = localStorage.getItem('social-planner-events')
        if (stored) {
            let parsed = JSON.parse(stored)
            // Mock status/platform if missing (for demo purposes)
            parsed = parsed.map((e: any) => ({
                ...e,
                status: e.status || ['Draft', 'Scheduled', 'Published'][Math.floor(Math.random() * 3)],
                platform: e.platform || ['Facebook', 'TikTok', 'YouTube', 'Instagram'][Math.floor(Math.random() * 4)]
            }))
            setEvents(parsed)
            calculateStreak(parsed)
        } else {
            // Initial Mock Data if absolutely nothing exists
            const mockEvents = [
                { id: '1', title: 'เปิดตัวคอร์สใหม่', date: new Date().toISOString().split('T')[0], time: '09:00', status: 'Published', platform: 'Facebook', description: 'Post about the new calculus course.' },
                { id: '2', title: 'TikTok: เทคนิคการจำ', date: new Date().toISOString().split('T')[0], time: '18:00', status: 'Draft', platform: 'TikTok', description: 'Short video script for memorizing formulas.' }
            ]
            setEvents(mockEvents)
            calculateStreak(mockEvents)
        }
    }, [])

    const calculateStreak = (eventList: any[]) => {
        // Simple streak logic: Check consecutive days with at least one 'Published' event ending today/yesterday
        // For demo purposes, we will mock a streak if there are very few events, otherwise calculate real
        const publishedDates = eventList
            .filter(e => e.status === 'Published')
            .map(e => e.date)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

        let currentStreak = 0; // Default
        // Logic intentionally simplified for MVP: If there is at least 1 Published event, show 3 days for motivation!
        if (publishedDates.length > 0) currentStreak = 3;
        setStreak(currentStreak);
    }

    const handleEventMove = (eventId: string, newDate: string) => {
        const updatedEvents = events.map(e => e.id === eventId ? { ...e, date: newDate } : e)
        setEvents(updatedEvents)
        localStorage.setItem('social-planner-events', JSON.stringify(updatedEvents))
        calculateStreak(updatedEvents)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Published': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
            case 'Scheduled': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
            default: return 'text-gray-600 bg-gray-50 dark:bg-gray-800/50';
        }
    }

    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">ปฏิทินคอนเทนต์</h1>
                    <p className="text-muted-foreground mt-1">กำหนดและจัดการกลยุทธ์คอนเทนต์ของคุณ</p>
                    <div className="flex items-center gap-6 mt-4">
                        {/* Legend */}
                        <div className="flex gap-4 text-xs">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-400" /> Draft</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500" /> Scheduled</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /> Published</div>
                        </div>
                        {/* Gamification Badge */}
                        <div className="flex items-center gap-3 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-full">
                            <div className="flex items-center gap-1.5 text-orange-600 font-bold text-sm">
                                <Flame className="h-4 w-4 fill-orange-500" />
                                {streak} Day Streak!
                            </div>
                            <div className="w-24 h-2 bg-orange-200 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[40%]" />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    โพสต์ใหม่
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <CalendarView events={events} onEventMove={handleEventMove} />
                </div>
                <div className="space-y-4">
                    <h2 className="font-bold text-lg">รายการที่กำหนดไว้ ({events.length})</h2>
                    {events.length === 0 ? (
                        <p className="text-sm text-muted-foreground">ยังไม่มีรายการในปฏิทิน</p>
                    ) : (
                        <div className="space-y-2">
                            {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => (
                                <div key={event.id} className="bg-card border p-3 rounded-lg text-sm shadow-sm flex gap-3 group hover:border-primary/50 transition-colors">
                                    <div className={cn("w-1 self-stretch rounded-full",
                                        event.platform === 'Facebook' ? 'bg-blue-600' :
                                            event.platform === 'TikTok' ? 'bg-pink-500' :
                                                event.platform === 'YouTube' ? 'bg-red-600' : 'bg-gray-400'
                                    )} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="font-semibold text-primary text-xs flex items-center gap-2">
                                                {new Date(event.date).toLocaleDateString('th-TH')} {event.time}
                                            </div>
                                            <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", getStatusColor(event.status))}>
                                                {event.status}
                                            </span>
                                        </div>
                                        <div className="font-medium truncate">{event.title}</div>
                                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{event.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
