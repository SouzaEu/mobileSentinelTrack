"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Camera, Wifi } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Camera className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-black font-montserrat text-foreground">SentinelTrack</h1>
                <p className="text-sm text-muted-foreground">Sistema de Monitoramento Inteligente - Mottu</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-2">
              <Wifi className="h-4 w-4" />
              Mobile + IoT
            </Badge>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
