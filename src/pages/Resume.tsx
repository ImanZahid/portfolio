import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const resumePdf = "/assets/ImanZahidCV.pdf";

export default function Resume() {
  const experience = [
    {
      company: "ARKSOFT",
      position: "Software Engineer",
      period: "2021 - Present",
      description:
        "Leading development of scalable web applications using React, Next.js, and Node.js. Mentoring developers and establishing best practices.",
    },
    {
      company: "INOVAKO",
      position: "Software Engineer",
      period: "2019 - 2021",
      description:
        "Developed enterprise applications with Angular and React. Implemented secure routing patterns and state management solutions.",
    },
  ];

  const skills = {
    Frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "Angular",
      "Tailwind CSS",
      "Zustand",
      "React Query",
    ],
    Backend: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB", "Redis"],
    "Tools & Practices": [
      "Git",
      "Docker",
      "CI/CD",
      "Agile/Scrum",
      "TDD",
      "Code Review",
    ],
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-white">Resume</h1>
            <p className="text-gray-300">
              Software Engineer specializing in React ecosystems and scalable
              architectures
            </p>
          </div>
          <Button asChild>
            <a href={resumePdf} download="ImanZahidCV.pdf">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </a>
          </Button>
        </div>

        <div className="space-y-8">
          {/* Education */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <GraduationCap className="h-5 w-5 text-purple-400" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className="font-semibold text-white">Bilkent University</h3>
                <p className="text-sm text-gray-400">
                  Bachelor of Science in Computer Science
                </p>
                <p className="text-sm text-gray-400">Ankara, Turkey</p>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="h-5 w-5 text-purple-400" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {experience.map((job, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-6 bg-slate-700" />}
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{job.position}</h3>
                        <p className="text-sm text-gray-400">
                          {job.company}
                        </p>
                      </div>
                      <p className="text-sm text-gray-400">
                        {job.period}
                      </p>
                    </div>
                    <p className="text-sm text-gray-300">{job.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5 text-purple-400" />
                Skills & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(skills).map(([category, techs]) => (
                <div key={category}>
                  <h3 className="font-semibold mb-2 text-white">{category}</h3>
                  <p className="text-sm text-gray-300">
                    {techs.join(" • ")}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* PDF Embed */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Full Resume (PDF)</CardTitle>
              <CardDescription className="text-gray-400">
                View or download the complete PDF version
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[8.5/11] border border-slate-700 rounded-lg overflow-hidden bg-slate-800">
                <iframe
                  src={resumePdf}
                  className="w-full h-full"
                  title="Resume PDF"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
