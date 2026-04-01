 import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { ScrollArea } from "@/Components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
} from "@/Components/ui/sheet"
import { Menu } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
  title?: string
  footer?: React.ReactNode
}

export default function Sidebar({ className, children, title, footer }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 lg:hidden z-40"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="h-full flex flex-col">
            {title && (
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">{title}</h2>
              </div>
            )}
            <ScrollArea className="flex-1">
              <div className="p-4">
                {children}
              </div>
            </ScrollArea>
            {footer && (
              <div className="border-t p-4">
                {footer}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex flex-col h-screen w-72 border-r bg-background fixed left-0 top-0", className)}>
        {title && (
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}
        <ScrollArea className="flex-1">
          <div className="p-4">
            {children}
          </div>
        </ScrollArea>
        {footer && (
          <div className="border-t p-4">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}
