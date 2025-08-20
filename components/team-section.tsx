import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Thomaz Oliveira",
    rm: "RM555323",
    role: "Tech Lead & Mobile Developer",
    specialties: ["React Native", "IoT Integration", "System Architecture"],
    avatar: "/professional-developer-portrait.png",
    github: "thomaz-oliveira",
    linkedin: "thomaz-oliveira-dev",
    email: "thomaz.oliveira@fiap.com.br",
  },
  {
    name: "Vinicius Souza",
    rm: "RM556089",
    role: "AI/ML Engineer & Backend",
    specialties: ["Machine Learning", "Computer Vision", "API Development"],
    avatar: "/ai-engineer-portrait.png",
    github: "vinicius-souza",
    linkedin: "vinicius-souza-ai",
    email: "vinicius.souza@fiap.com.br",
  },
  {
    name: "Gabriel Duarte",
    rm: "RM556972",
    role: "Frontend & UX Designer",
    specialties: ["UI/UX Design", "Frontend Development", "User Research"],
    avatar: "/ux-designer-portrait.png",
    github: "gabriel-duarte",
    linkedin: "gabriel-duarte-ux",
    email: "gabriel.duarte@fiap.com.br",
  },
]

export function TeamSection() {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black font-montserrat">Equipe SentinelTrack</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conheça os desenvolvedores por trás do sistema de monitoramento inteligente
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {teamMembers.map((member, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={`${member.name} avatar`}
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
                <Badge variant="secondary" className="mt-2">
                  {member.rm}
                </Badge>
                <p className="text-sm text-primary font-medium mt-2">{member.role}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Especialidades:</h4>
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((specialty, specIndex) => (
                    <Badge key={specIndex} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <a
                  href={`https://github.com/${member.github}`}
                  className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={`https://linkedin.com/in/${member.linkedin}`}
                  className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
