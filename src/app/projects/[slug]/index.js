import { useRouter } from 'next/router'
import { projects } from '../index'

export default function ProjectDetail() {
  const router = useRouter()
  const { slug } = router.query
  const project = projects.find(p => p.slug === slug)

  if (!project) return <div>Project not found</div>

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
      {project.image && (
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          width={800}
          height={400}
          className="w-full rounded-xl mb-6"
        />
      )}
      <p className="text-gray-700 dark:text-gray-200 mb-4">{project.description}</p>
      <ul className="list-disc list-inside mb-4">
        {project.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <p><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
    </section>
  )
}