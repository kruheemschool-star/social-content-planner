"use client"
import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isToday } from "date-fns"
import { th } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Plus, Sparkles, Edit, GripVertical, Image as ImageIcon, Zap } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    status: 'Draft' | 'Scheduled' | 'Published';
    platform: 'Facebook' | 'TikTok' | 'YouTube' | 'Instagram';
    description?: string;
    imageUrl?: string;
}

interface CalendarViewProps {
    events?: CalendarEvent[];
    onEventMove?: (id: string, date: string) => void;
}

export function CalendarView({ events = [], onEventMove }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate })

    const nextMonth = () => setCurrentDate(curr => new Date(curr.getFullYear(), curr.getMonth() + 1, 1))
    const prevMonth = () => setCurrentDate(curr => new Date(curr.getFullYear(), curr.getMonth() - 1, 1))
    const today = () => setCurrentDate(new Date())

    // Helper for colors
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Published': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900';
            case 'Scheduled': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-900';
            default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
        }
    }

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case 'Facebook': return 'bg-blue-600';
            case 'TikTok': return 'bg-pink-500';
            case 'YouTube': return 'bg-red-600';
            case 'Instagram': return 'bg-purple-600';
            default: return 'bg-gray-400';
        }
    }

    // Drag & Drop Handlers
    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("eventId", id);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent, dateStr: string) => {
        e.preventDefault();
        const eventId = e.dataTransfer.getData("eventId");
        if (eventId && onEventMove) {
            onEventMove(eventId, dateStr);
        }
    };

    const SUGGESTED_TOPICS = [
        "ทฤษฎีบทพีทาโกรัส", "การแยกตัวประกอบ", "ตรีโกณมิติ", "ตรรกศาสตร์เบื้องต้น",
        "เทคนิคการจำสูตร", "สมการกำลังสอง", "เซตและสมาชิก", "ความน่าจะเป็น"
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold capitalize">{format(currentDate, "MMMM yyyy", { locale: th })}</h2>
                <div className="flex items-center gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-muted rounded-md"><ChevronLeft className="h-4 w-4" /></button>
                    <button onClick={today} className="px-3 py-1 text-sm border rounded-md hover:bg-muted">วันนี้</button>
                    <button onClick={nextMonth} className="p-2 hover:bg-muted rounded-md"><ChevronRight className="h-4 w-4" /></button>
                </div>
            </div>

            <div className="grid grid-cols-7 border rounded-lg overflow-hidden bg-muted/20">
                {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
                    <div key={day} className="bg-background/50 backdrop-blur py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b">
                        {day}
                    </div>
                ))}

                {calendarDays.map((day, dayIdx) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const dayEvents = events.filter(e => e.date === dateStr);
                    const randomTopic = SUGGESTED_TOPICS[day.getDate() % SUGGESTED_TOPICS.length];

                    // Best Time Logic
                    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                    const bestTime = isWeekend ? "10:00 - 12:00" : "19:00 - 21:00";

                    return (
                        <div
                            key={day.toString()}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, dateStr)}
                            className={cn(
                                "min-h-[140px] border-b border-r bg-background p-3 text-sm transition-colors hover:bg-accent/5 group relative flex flex-col",
                                !isSameMonth(day, monthStart) && "bg-muted/10 text-muted-foreground",
                                (dayIdx % 7 === 6) && "border-r-0" // Remove right border for last col
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={cn(
                                    "flex h-7 w-7 items-center justify-center rounded-full font-medium text-xs",
                                    isToday(day) ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                                )}>
                                    {format(day, 'd')}
                                </span>
                                <div className="flex items-center gap-1">
                                    <div className="hidden group-hover:flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-yellow-50 text-[10px] text-yellow-700 font-medium border border-yellow-200" title={`เวลาทอง: ${bestTime}`}>
                                        <Zap className="h-2.5 w-2.5 fill-yellow-500" />
                                        <span className="hidden xl:inline">{bestTime}</span>
                                    </div>
                                    <Link href={`/generator?date=${dateStr}`} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded text-muted-foreground" title="สร้างคอนเทนต์วันนี้">
                                        <Plus className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-1.5 flex-1">
                                {dayEvents.map(event => (
                                    <div
                                        key={event.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, event.id)}
                                        className={cn(
                                            "relative group/card text-xs p-1.5 rounded border flex items-start gap-1.5 cursor-move hover:shadow-md hover:scale-[1.02] transition-all z-10",
                                            getStatusColor(event.status)
                                        )}
                                    >
                                        <GripVertical className="h-3 w-3 text-muted-foreground/30 opacity-0 group-hover/card:opacity-100 absolute left-0.5 top-2" />
                                        <div className={cn("w-1.5 h-1.5 rounded-full mt-1 shrink-0 ml-1", getPlatformColor(event.platform))} />
                                        <span className="truncate font-medium">{event.title}</span>

                                        {/* Quick Preview Popover */}
                                        <div className="absolute left-0 bottom-full mb-2 w-56 p-3 rounded-xl border bg-popover text-popover-foreground shadow-lg opacity-0 group-hover/card:opacity-100 pointer-events-none group-hover/card:pointer-events-auto transition-all z-50 scale-95 group-hover/card:scale-100 origin-bottom">
                                            <div className="flex gap-2 mb-2">
                                                <div className="h-10 w-10 bg-muted rounded-md shrink-0 flex items-center justify-center overflow-hidden">
                                                    {event.imageUrl ? <img src={event.imageUrl} className="w-full h-full object-cover" /> : <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold truncate">{event.title}</p>
                                                    <p className="text-[10px] text-muted-foreground capitalize">{event.platform}</p>
                                                </div>
                                            </div>
                                            {event.description && <p className="text-[10px] text-muted-foreground line-clamp-2 mb-2 bg-muted/50 p-1.5 rounded">{event.description}</p>}
                                            <Link href={`/generator?id=${event.id}`} className="flex items-center justify-center gap-1 w-full py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded hover:opacity-90 transition-opacity">
                                                <Edit className="h-3 w-3" /> แก้ไขด่วน
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                                {/* Empty State Suggestion */}
                                {dayEvents.length === 0 && isSameMonth(day, monthStart) && (
                                    <Link
                                        href={`/generator?topic=${randomTopic}`}
                                        className="block mt-4 p-2 rounded-lg border border-dashed border-muted-foreground/20 hover:border-primary/40 hover:bg-primary/5 transition-colors group/empty cursor-pointer"
                                    >
                                        <div className="flex items-center gap-1.5 text-muted-foreground group-hover/empty:text-primary transition-colors">
                                            <Sparkles className="h-3 w-3" />
                                            <span className="text-[10px] font-medium">ไอเดียวันนี้?</span>
                                        </div>
                                        <div className="text-[10px] text-muted-foreground/70 group-hover/empty:text-primary/70 mt-0.5 truncate">
                                            ลองเรื่อง "{randomTopic}"
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
