export function Header() {
    return (
        <header className="sticky top-0 z-40 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-4 md:px-6 justify-between">
                <div className="flex items-center gap-4 md:hidden">
                    {/* Mobile toggle placeholder */}
                    <span className="font-bold">ContentPlanner</span>
                </div>
                <div className="flex items-center gap-4 ml-auto">
                    {/* User profile / Actions placeholder */}
                    <div className="h-8 w-8 rounded-full bg-accent animate-pulse" />
                </div>
            </div>
        </header>
    )
}
