import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, XCircle, Minus } from "lucide-react"

const penalties = [
  {
    description: "Não entregar via GitHub Classroom",
    points: -20,
    severity: "high",
  },
  {
    description: "Não entregar vídeo de apresentação",
    points: -20,
    severity: "high",
  },
  {
    description: "Ausência do arquivo README.md",
    points: -10,
    severity: "medium",
  },
  {
    description: "Não utilizar tema (modo claro/escuro)",
    points: -20,
    severity: "high",
  },
  {
    description: "Aplicativo fora do escopo das aulas",
    points: -60,
    severity: "critical",
  },
  {
    description: "Remoção de telas entregue na Sprint anterior",
    points: -100,
    severity: "critical",
  },
  {
    description: "Histórico do Git incoerente ou confuso",
    points: -50,
    severity: "critical",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "destructive"
    case "high":
      return "destructive"
    case "medium":
      return "secondary"
    default:
      return "secondary"
  }
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "critical":
      return XCircle
    case "high":
      return AlertTriangle
    case "medium":
      return Minus
    default:
      return Minus
  }
}

export function PenaltiesSection() {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black font-montserrat text-destructive">Penalidades</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Atenção aos itens que podem resultar em desconto de pontos
        </p>
      </div>

      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Importante sobre o Git
          </CardTitle>
          <CardDescription>
            É esperado que o repositório tenha uma árvore de commits sequencial e evolutiva, com mensagens claras e
            representando a construção real do app. Repositórios que não demonstrem envolvimento prático ou com uso
            superficial do Git poderão ser penalizados.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {penalties.map((penalty, index) => {
          const IconComponent = getSeverityIcon(penalty.severity)
          const severityColor = getSeverityColor(penalty.severity)

          return (
            <Card key={index} className="border-destructive/20">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <IconComponent className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{penalty.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={severityColor as any} className="font-bold">
                      {penalty.points} pts
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
