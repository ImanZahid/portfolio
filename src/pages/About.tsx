import { motion } from "framer-motion";
import { Code2, Users, Rocket, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  const values = [
    {
      icon: Code2,
      title: "Clean Architecture",
      description:
        "Building maintainable, scalable systems with clear separation of concerns and best practices.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Mentoring developers, conducting code reviews, and fostering a culture of continuous learning.",
    },
    {
      icon: Rocket,
      title: "Performance First",
      description:
        "Optimizing for speed, efficiency, and exceptional user experiences in every project.",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description:
        "Prioritizing accessibility, security, and intuitive interfaces that users love.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">About Me</h1>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Background</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                I'm a Software Engineer with a passion for building modern,
                performant web applications. With a Computer Science degree from
                Bilkent University, I've honed my skills in creating scalable
                architectures and leading development teams at companies like
                ARKSOFT and INOVAKO.
              </p>
              <p>
                My expertise spans the full React ecosystem, including Next.js,
                Zustand, and React Query, as well as backend technologies like
                Node.js and PostgreSQL. I specialize in implementing secure
                routing patterns, state management solutions, and mentoring
                developers to write better code.
              </p>
              <p>
                Beyond coding, I'm passionate about sharing knowledge through
                mentoring, code reviews, and establishing best practices that
                help teams deliver high-quality software efficiently.
              </p>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-6">What I Value</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <Icon className="h-8 w-8 mb-2 text-primary" />
                        <CardTitle className="text-xl">{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{value.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Philosophy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                I believe that great software is built on three pillars:{" "}
                <strong>clean code</strong>, <strong>user empathy</strong>, and{" "}
                <strong>continuous improvement</strong>. Every line of code
                should be purposeful, every feature should solve a real problem,
                and every project should leave the codebase better than we found
                it.
              </p>
              <p>
                My approach combines technical excellence with pragmatic
                problem-solving. I advocate for modern tools and practices, but
                always with a focus on delivering value to users and
                maintainability for teams.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
