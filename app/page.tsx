import { Header } from "@/components/header"
import { ProjectOverview } from "@/components/project-overview"
import { RequirementsGrid } from "@/components/requirements-grid"
import { PenaltiesSection } from "@/components/penalties-section"
import { DeliverablesList } from "@/components/deliverables-list"
import { ProgressTracker } from "@/components/progress-tracker"
import { TeamSection } from "@/components/team-section"
import { TechStack } from "@/components/tech-stack"
import { ProjectTimeline } from "@/components/project-timeline"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <ProjectOverview />
        <ProgressTracker />
        <RequirementsGrid />
        <ProjectTimeline />
        <TechStack />
        <TeamSection />
        <DeliverablesList />
        <PenaltiesSection />
      </main>
    </div>
  )
}
