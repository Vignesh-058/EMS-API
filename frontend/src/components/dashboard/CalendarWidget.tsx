import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock event dates for highlights (e.g., today + 2 days, today + 5 days)
const getMockEvents = () => {
  const today = new Date()
  return [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toDateString(),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).toDateString(),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12).toDateString(),
  ]
}

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [events] = React.useState(getMockEvents())

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
  const today = new Date()
  const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear()

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const monthName = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()

  const renderCells = () => {
    const cells = []
    
    // Empty cells before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="h-8 w-8" />)
    }
    
    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), d).toDateString()
      const isToday = isCurrentMonth && d === today.getDate()
      const hasEvent = events.includes(dateStr)
      
      cells.push(
        <div 
          key={d} 
          className={cn(
            "relative mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm transition-all hover:bg-muted",
            isToday && "bg-primary font-bold text-primary-foreground hover:bg-primary/90",
            !isToday && hasEvent && "font-bold text-primary"
          )}
        >
          {d}
          {hasEvent && !isToday && (
            <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
          )}
          {hasEvent && isToday && (
            <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary-foreground" />
          )}
        </div>
      )
    }
    
    return cells
  }

  return (
    <Card className="col-span-1 shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">{monthName} {year}</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-y-2 text-center">
          {days.map(day => (
            <div key={day} className="py-1 text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          {renderCells()}
        </div>
      </CardContent>
    </Card>
  )
}
