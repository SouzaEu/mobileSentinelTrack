import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Brain, Database, Cloud, Shield, Zap } from "lucide-react"

const techCategories = [
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "primary",
    technologies: [
      { name: "React Native", description: "Framework principal para desenvolvimento mobile" },
      { name: "Expo", description: "Plataforma para desenvolvimento e deploy" },
      { name: "TypeScript", description: "Tipagem estática para maior confiabilidade" },
      { name: "React Navigation", description: "Navegação entre telas" },
    ],
  },
  {
    title: "Inteligência Artificial",
    icon: Brain,
    color: "accent",
    technologies: [
      { name: "TensorFlow Lite", description: "Modelos de IA otimizados para mobile" },
      { name: "OpenCV", description: "Processamento de imagens em tempo real" },
      { name: "YOLO", description: "Detecção de objetos (motos) em tempo real" },
      { name: "Python", description: "Treinamento de modelos de IA" },
    ],
  },
  {
    title: "Backend & APIs",
    icon: Database,
    color: "chart-2",
    technologies: [
      { name: "Node.js", description: "Runtime JavaScript para backend" },
      { name: "Express.js", description: "Framework web para APIs REST" },
      { name: "MongoDB", description: "Banco de dados NoSQL para dados IoT" },
      { name: "Socket.io", description: "Comunicação em tempo real" },
    ],
  },
  {
    title: "Cloud & IoT",
    icon: Cloud,
    color: "chart-3",
    technologies: [
      { name: "AWS IoT Core", description: "Gerenciamento de dispositivos IoT" },
      { name: "Firebase", description: "Backend-as-a-Service para mobile" },
      { name: "Docker", description: "Containerização de serviços" },
      { name: "MQTT", description: "Protocolo de comunicação IoT" },
    ],
  },
  {
    title: "Segurança",
    icon: Shield,
    color: "chart-4",
    technologies: [
      { name: "JWT", description: "Autenticação segura de usuários" },
      { name: "OAuth 2.0", description: "Autorização de terceiros" },
      { name: "SSL/TLS", description: "Criptografia de dados em trânsito" },
      { name: "Biometria", description: "Autenticação biométrica mobile" },
    ],
  },
  {
    title: "Performance",
    icon: Zap,
    color: "chart-5",
    technologies: [
      { name: "Redis", description: "Cache em memória para alta performance" },
      { name: "CDN", description: "Distribuição global de conteúdo" },
      { name: "WebRTC", description: "Streaming de vídeo em tempo real" },
      { name: "GraphQL", description: "API eficiente para dados complexos" },
    ],
  },
]

export function TechStack() {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black font-montserrat">Stack Tecnológica</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tecnologias de ponta para um sistema de monitoramento robusto e escalável
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {techCategories.map((category, index) => {
          const IconComponent = category.icon

          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-${category.color}/10`}>
                    <IconComponent className={`h-6 w-6 text-${category.color}`} />
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="font-medium">
                          {tech.name}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
