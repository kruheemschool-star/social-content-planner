
"use client"
import { Folder, Plus, FileText, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getSavedIdeas, SavedIdea, deleteIdea } from "@/lib/storage"

const projects = [
    { id: 1, name: "คณิตศาสตร์ เทอม 1", posts: 12, lastUpdated: "2 วันที่แล้ว" },
    { id: 2, name: "เคล็ดลับประจำวัน", posts: 45, lastUpdated: "วันนี้" },
    { id: 3, name: "แคมเปญโปรโมท", posts: 8, lastUpdated: "สัปดาห์ที่แล้ว" },
    { id: 4, name: "คลิปสั้น TikTok", posts: 21, lastUpdated: "เมื่อวาน" },
]

export default function ProjectsPage() {
    const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([])

    useEffect(() => {
        setSavedIdeas(getSavedIdeas())
    }, [])

    const handleDelete = (id: string) => {
        deleteIdea(id)
        setSavedIdeas(getSavedIdeas())
    }

    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">โปรเจกต์</h1>
                    <p className="text-muted-foreground mt-1">จัดระเบียบคอนเทนต์ของคุณเป็นโฟลเดอร์</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                    <Plus className="h-4 w-4" /> โฟลเดอร์ใหม่
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {projects.map((project) => (
                    <Link href={`/projects/${project.id}`} key={project.id} className="group relative flex flex-col p-6 bg-card border rounded-xl hover:border-primary/50 transition-all hover:shadow-md cursor-pointer">
                        <Folder className="h-12 w-12 text-blue-500/80 mb-4 fill-blue-500/10" strokeWidth={1.5} />
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                            <span>{project.posts} ไฟล์</span>
                            <span>{project.lastUpdated}</span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="pt-8 border-t">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">ไอเดียที่บันทึกไว้ (Saved Drafts)</h2>
                    <p className="text-muted-foreground mt-1">คอนเทนต์ที่คุณบันทึกจาก AI Generator</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {savedIdeas.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
                            <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            ยังไม่มีไอเดียที่บันทึกไว้ ลองไปที่ <Link href="/generator" className="text-primary underline">Generator</Link> เพื่อสร้างใหม่
                        </div>
                    ) : (
                        savedIdeas.map((idea) => (
                            <div key={idea.id} className="group relative bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                                <Link href={`/generator?id=${idea.id}`} className="absolute inset-0 z-0" />
                                <div className="relative z-10 flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <FileText className="h-4 w-4" />
                                        </div>
                                        <span className="text-xs text-muted-foreground">{new Date(idea.savedAt).toLocaleDateString('th-TH')}</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent navigation
                                            handleDelete(idea.id);
                                        }}
                                        className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                                <h3 className="font-bold text-lg mb-2 line-clamp-1">{idea.topic}</h3>
                                {idea.imageUrl && (
                                    <div className="mb-3 rounded-lg overflow-hidden border">
                                        <img src={idea.imageUrl} alt="Saved" className="w-full h-32 object-cover" />
                                    </div>
                                )}
                                {idea.hooks?.challenging && (
                                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                                        {idea.hooks.challenging}
                                    </p>
                                )}
                                <div className="mt-auto pt-4 border-t flex flex-wrap gap-2">
                                    {idea.hashtags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
