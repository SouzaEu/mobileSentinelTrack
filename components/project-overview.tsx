import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Target, Users, Trophy } from "lucide-react"

export function ProjectOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pontuação Total</CardTitle>
          <Trophy className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">100 pontos</div>
          <p className="text-xs text-muted-foreground">Distribuídos em 5 critérios</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-accent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Entrega</CardTitle>
          <Calendar className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3º Sprint</div>
          <p className="text-xs text-muted-foreground">Entrega intermediária</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tecnologias</CardTitle>
          <Target className="h-4 w-4 text-chart-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Mobile + IoT</div>
          <p className="text-xs text-muted-foreground">React Native + IA</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Equipe</CardTitle>
          <Users className="h-4 w-4 text-chart-3" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3 membros</div>
          <p className="text-xs text-muted-foreground">Thomaz, Vinicius, Gabriel</p>
        </CardContent>
      </Card>
    </div>
  )
}
