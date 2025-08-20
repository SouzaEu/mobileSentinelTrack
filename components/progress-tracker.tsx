"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

const progressItems = [
  {
    category: "Telas funcionais integradas com API",
    points: 40,
    completed: 32,
    status: "in-progress",
    tasks: [
      { name: "Interface mobile para câmeras", completed: true },
      { name: "Integração com API de detecção", completed: true },
      { name: "Sistema de alertas", completed: false },
      { name: "Mapa interativo", completed: false },
    ],
  },
  {
    category: "Sistema de Login",
    points: 20,
    completed: 20,
    status: "completed",
    tasks: [
      { name: "Tela de Login", completed: true },
      { name: "Tela de Cadastro", completed: true },
      { name: "Logout funcional", completed: true },
    ],
  },
  {
    category: "Estilização com Tema",
    points: 15,
    completed: 15,
    status: "completed",
    tasks: [
      { name: "Modo claro/escuro", completed: true },
      { name: "Personalização visual", completed: true },
      { name: "Guidelines de design", completed: true },
      { name: "Identidade visual", completed: true },
    ],
  },
  {
    category: "Arquitetura de Código",
    points: 15,
    completed: 12,
    status: "in-progress",
    tasks: [
      { name: "Organização de arquivos", completed: true },
      { name: "Separação de responsabilidades", completed: true },
      { name: "Código limpo", completed: false },
      { name: "Boas práticas React Native", completed: false },
    ],
  },
  {
    category: "Documentação e Apresentação",
    points: 10,
    completed: 8,
    status: "in-progress",
    tasks: [
      { name: "README.md", completed: true },
      { name: "Vídeo demonstrativo", completed: false },
    ],
  },
]

export function ProgressTracker() {
  const totalPoints = progressItems.reduce((sum, item) => sum + item.points, 0)
  const completedPoints = progressItems.reduce((sum, item) => sum + item.completed, 0)
  const overallProgress = (completedPoints / totalPoints) * 100

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-accent" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Concluído</Badge>
      case "in-progress":
        return <Badge variant="secondary">Em Progresso</Badge>
      default:
        return <Badge variant="outline">Pendente</Badge>
    }
  }

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black font-montserrat">Progresso do Projeto</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Acompanhe o desenvolvimento do SentinelTrack em tempo real
        </p>
      </div>

      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Progresso Geral</span>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {completedPoints}/{totalPoints} pontos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={overallProgress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{overallProgress.toFixed(1)}% concluído</span>
              <span>{totalPoints - completedPoints} pontos restantes</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {progressItems.map((item, index) => {
          const progress = (item.completed / item.points) * 100

          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  {getStatusIcon(item.status)}
                  {getStatusBadge(item.status)}
                </div>
                <CardTitle className="text-base font-semibold leading-tight">{item.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">
                      {item.completed}/{item.points} pts
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Tarefas:</h4>
                  <ul className="space-y-1">
                    {item.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center gap-2 text-sm">
                        {task.completed ? (
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                        ) : (
                          <div className="h-3 w-3 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                        )}
                        <span className={task.completed ? "text-foreground" : "text-muted-foreground"}>
                          {task.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
