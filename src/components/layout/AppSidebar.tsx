"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Sparkles, Folder, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'แดชบอร์ด', href: '/', icon: LayoutDashboard },
    { name: 'ปฏิทินคอนเทนต์', href: '/planner', icon: Calendar },
    { name: 'สร้างคอนเทนต์ AI', href: '/generator', icon: Sparkles },

    { name: 'โปรเจกต์', href: '/projects', icon: Folder },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-card hidden md:flex md:flex-col">
            <div className="flex h-16 items-center border-b px-6 gap-3">
                <div className="relative h-8 w-8">
                    <img src="/logo.png" alt="Logo" className="object-contain w-full h-full" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">ContentPlanner</span>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                            pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="border-t p-4">
                <Link href="/settings" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                    <Settings className="h-4 w-4" />
                    ตั้งค่า
                </Link>
            </div>
        </aside>
    )
}
