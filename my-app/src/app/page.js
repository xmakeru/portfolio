import Header from "@/components/header/header";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS_LINKS } from "@/config/links";

export default function Home() {
  return (
    <>
    <Header />
    <main
    className="text-white min-h-screen pt-32 px-20">
      <section>
        <div className="flex">
          {PROJECTS_LINKS.map((i) => (
            <ProjectCard key={i.id} link={i.link} title={i.title}/>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}
