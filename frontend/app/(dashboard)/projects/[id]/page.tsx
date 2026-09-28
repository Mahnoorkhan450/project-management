
import ProjectDetails from "@/components/projects/ProjectDetails";

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <h1 className="font-semibold text-red-700">
          Invalid project ID
        </h1>

        <p className="mt-2 text-sm text-red-600">
          The project ID is not valid.
        </p>
      </div>
    );
  }

  return <ProjectDetails projectId={projectId} />;
}