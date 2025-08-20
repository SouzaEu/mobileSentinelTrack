import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Calendar, Target } from "lucide-react"

const timelineEvents = [
  {
    phase: "Sprint 1",
    title: "Planejamento e Prototipação",
    date: "Semana 1-2",
    status: "completed",
    description: "Definição de requisitos e criação de protótipos",
    deliverables: ["Wireframes", "Arquitetura do sistema", "Setup inicial"],
  },
  {
    phase: "Sprint 2",
    title: "Desenvolvimento Core",
    date: "Semana 3-4",
    status: "completed",
    description: "Implementação das funcionalidades principais",
    deliverables: ["Autenticação", "Interface básica", "Integração inicial com IA"],
  },
  {
    phase: "Sprint 3",
    title: "Integração e Refinamento",
    date: "Semana 5-6",
    status: "in-progress",
    description: "Integração completa com APIs e refinamento da UI",
    deliverables: ["API completa", "Tema dark/light", "Sistema de alertas"],
  },
  {
    phase: "Sprint 4",
    title: "Testes e Documentação",
    date: "Semana 7-8",
    status: "pending",
    description: "Testes finais, documentação e preparação para entrega",
    deliverables: ["Testes automatizados", "Documentação final", "Vídeo demo"],
  },
  {
    phase: "Entrega",
    title: "Deploy e Apresentação",
    date: "Semana 9",
    status: "pending",
    description: "Deploy final e apresentação do projeto",
    deliverables: ["App em produção", "Apresentação final", "Avaliação"],
  },
]

export function ProjectTimeline() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-primary" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-accent" />
      default:
        return <Calendar className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Concluído</Badge>
      case "in-progress":
        return <Badge variant="secondary">Em Andamento</Badge>
      default:
        return <Badge variant="outline">Pendente</Badge>
    }
  }

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black font-montserrat">Timeline do Projeto</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Acompanhe o cronograma de desenvolvimento do SentinelTrack
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-background border-2 border-primary hidden md:block" />

              <Card
                className={`md:ml-16 group hover:shadow-lg transition-all duration-300 ${
                  event.status === "completed"
                    ? "border-primary/20 bg-primary/5"
                    : event.status === "in-progress"
                      ? "border-accent/20 bg-accent/5"
                      : ""
                }`}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(event.status)}
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {event.phase}
                        </Badge>
                        <CardTitle className="text-lg font-bold">{event.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                      </div>
                    </div>
                    {getStatusBadge(event.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Entregáveis:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {event.deliverables.map((deliverable, deliverableIndex) => (
                        <Badge key={deliverableIndex} variant="secondary" className="text-xs">
                          {deliverable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
