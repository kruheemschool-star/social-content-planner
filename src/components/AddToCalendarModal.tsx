"use client"

import { useState } from "react"
import { Calendar, X } from "lucide-react"

interface AddToCalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    initialDate?: Date;
}

export function AddToCalendarModal({ isOpen, onClose, title, description }: AddToCalendarModalProps) {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]) // Default to today
    const [time, setTime] = useState("")
    const [isSaved, setIsSaved] = useState(false)

    if (!isOpen) return null

    const handleSave = () => {
        console.log("Saving event:", { title, date, time }) // Debug log
        if (!date) return

        const newEvent = {
            id: crypto.randomUUID(),
            title,
            description,
            date,
            time,
            createdAt: new Date().toISOString()
        }

        const existing = JSON.parse(localStorage.getItem('social-planner-events') || '[]')
        localStorage.setItem('social-planner-events', JSON.stringify([...existing, newEvent]))

        setIsSaved(true)
        setTimeout(() => {
            setIsSaved(false)
            onClose()
        }, 1500)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-background w-full max-w-md rounded-xl shadow-lg border p-6 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        ลงปฏิทินคอนเทนต์
                    </h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">หัวข้อ</label>
                        <input value={title} readOnly className="w-full h-10 px-3 rounded-md border bg-muted" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">วันที่โพสต์</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border bg-background"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">เวลา (ไม่ระบุได้)</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border bg-background"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">รายละเอียด (Preview)</label>
                        <textarea
                            value={description}
                            readOnly
                            className="w-full h-24 p-3 text-xs rounded-md border bg-muted resize-none"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={!date || isSaved}
                        className="w-full h-11 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 disabled:opacity-50"
                    >
                        {isSaved ? "บันทึกเรียบร้อย!" : "ยืนยันการลงปฏิทิน"}
                    </button>
                </div>
            </div>
        </div>
    )
}
