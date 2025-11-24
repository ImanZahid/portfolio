import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "imanzahidzahid3@gmail.com",
      href: "mailto:imanzahidzahid3@gmail.com",
      description: "Send me an email anytime",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "www.linkedin.com/in/iman-zahid",
      href: "https://www.linkedin.com/in/iman-zahid",
      description: "Connect with me professionally",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/ImanZahid",
      href: "https://github.com/ImanZahid",
      description: "Check out my open-source work",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Ankara, Turkey",
      href: null,
      description: "Based in Ankara, open to remote opportunities",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Get In Touch</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Card className="h-full bg-slate-900/50 border-slate-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all backdrop-blur">
                  <CardHeader>
                    <Icon className="h-8 w-8 mb-2 text-purple-400" />
                    <CardTitle className="text-white">{method.label}</CardTitle>
                    <CardDescription className="text-gray-400">{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {method.href ? (
                      <Button variant="link" className="p-0 h-auto text-purple-300 hover:text-purple-200" asChild>
                        <a
                          href={method.href}
                          target={
                            method.href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            method.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {method.value}
                        </a>
                      </Button>
                    ) : (
                      <p className="text-sm text-gray-300">{method.value}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Let's Work Together</CardTitle>
              <CardDescription className="text-gray-400">
                Whether you have a project in mind or just want to chat about
                technology, feel free to reach out through any of the channels
                above.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  I'm particularly interested in:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                  <li>Full-stack React/Next.js projects</li>
                  <li>State management architecture consulting</li>
                  <li>Code review and mentoring opportunities</li>
                  <li>Open-source collaborations</li>
                  <li>Speaking engagements and technical workshops</li>
                </ul>
                <div className="pt-4">
                  <Button size="lg" asChild>
                    <a href="mailto:imanzahidzahid3@gmail.com">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Me an Email
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
