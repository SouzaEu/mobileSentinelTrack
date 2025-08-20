import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Shield, Palette, Code2, FileText, CheckCircle } from "lucide-react"

const requirements = [
  {
    id: 1,
    title: "App Mobile com IA para Detecção",
    description: "Sistema de monitoramento inteligente de motos com câmeras e IA",
    points: 40,
    icon: Smartphone,
    color: "primary",
    items: [
      "Interface mobile para visualização das câmeras em tempo real (10 pts)",
      "Integração com API de detecção de objetos/motos (10 pts)",
      "Sistema de alertas e notificações push (10 pts)",
      "Mapa interativo mostrando posições das motos (10 pts)",
    ],
  },
  {
    id: 2,
    title: "Sistema de Autenticação",
    description: "Controle de acesso para operadores da Mottu",
    points: 20,
    icon: Shield,
    color: "accent",
    items: [
      "Login para operadores Mottu (5 pts)",
      "Cadastro de novos usuários (10 pts)",
      "Logout e controle de sessão (5 pts)",
    ],
  },
  {
    id: 3,
    title: "Interface IoT e Tema",
    description: "Design responsivo com suporte a dispositivos IoT",
    points: 15,
    icon: Palette,
    color: "chart-2",
    items: [
      "Modo claro/escuro para diferentes ambientes (5 pts)",
      "Interface adaptada para tablets/dispositivos IoT (3 pts)",
      "Design seguindo guidelines da Mottu (2 pts)",
      "Identidade visual profissional (5 pts)",
    ],
  },
  {
    id: 4,
    title: "Arquitetura Mobile + IoT",
    description: "Estrutura otimizada para dispositivos móveis e IoT",
    points: 15,
    icon: Code2,
    color: "chart-3",
    items: [
      "Organização modular para componentes IoT",
      "Gerenciamento eficiente de estado para dados em tempo real",
      "Otimização para performance em dispositivos móveis",
      "Integração com sensores e câmeras",
      "Padrões de código para sistemas distribuídos",
    ],
  },
  {
    id: 5,
    title: "Documentação SentinelTrack",
    description: "Documentação específica do projeto e demonstração",
    points: 10,
    icon: FileText,
    color: "chart-4",
    items: [
      "README.md detalhando o sistema SentinelTrack",
      "Explicação da solução para monitoramento Mottu",
      "Documentação da arquitetura mobile + IoT",
      "Dados da equipe: Thomaz (RM555323), Vinicius (RM556089), Gabriel (RM556972)",
      "Vídeo demonstrando detecção e monitoramento",
    ],
  },
]

export function RequirementsGrid() {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black font-montserrat">Critérios SentinelTrack</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Requisitos específicos para o sistema de monitoramento inteligente de motos
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {requirements.map((req) => {
          const IconComponent = req.icon
          const progressValue = (req.points / 40) * 100 // Normalizado para o maior valor

          return (
            <Card key={req.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg bg-${req.color}/10`}>
                    <IconComponent className={`h-6 w-6 text-${req.color}`} />
                  </div>
                  <Badge variant="secondary" className="font-bold">
                    {req.points} pts
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                    {req.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{req.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Importância</span>
                    <span className="font-medium">{req.points}%</span>
                  </div>
                  <Progress value={progressValue} className="h-2" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Requisitos:</h4>
                  <ul className="space-y-1">
                    {req.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
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
