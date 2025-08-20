import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, Video, Github } from "lucide-react"

const deliverables = [
  {
    title: "Repositório GitHub",
    description: "Código fonte do SentinelTrack com histórico evolutivo",
    icon: Github,
    status: "required",
    details: [
      "Histórico de commits mostrando desenvolvimento do sistema de monitoramento",
      "Mensagens claras sobre implementação de IA e IoT",
      "Demonstrar colaboração da equipe (Thomaz, Vinicius, Gabriel)",
    ],
  },
  {
    title: "README.md SentinelTrack",
    description: "Documentação completa do sistema de monitoramento",
    icon: FileText,
    status: "required",
    details: [
      "Nome: SentinelTrack - Sistema de Monitoramento Inteligente",
      "Proposta: Automatizar localização de motos Mottu com IA",
      "Arquitetura mobile + IoT detalhada",
      "Thomaz Oliveira (RM555323), Vinicius Souza (RM556089), Gabriel Duarte (RM556972)",
    ],
  },
  {
    title: "Vídeo Demonstrativo",
    description: "Apresentação do SentinelTrack em funcionamento",
    icon: Video,
    status: "required",
    details: [
      "Demonstração da detecção de motos em tempo real",
      "Apresentar interface mobile e funcionalidades IoT",
      "Mostrar integração com câmeras e sistema de alertas",
    ],
  },
]

export function DeliverablesList() {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black font-montserrat">Entregáveis SentinelTrack</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Documentação e demonstração específicas do sistema de monitoramento
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {deliverables.map((deliverable, index) => {
          const IconComponent = deliverable.icon

          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Obrigatório
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                    {deliverable.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{deliverable.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Deve incluir:</h4>
                  <ul className="space-y-1">
                    {deliverable.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
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
