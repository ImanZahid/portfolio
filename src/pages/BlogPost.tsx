import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Award, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface BlogPostData {
  id: string;
  title: string;
  date: string;
  category: string;
  images: string[];
  content: React.ReactNode;
  tags: string[];
  links?: { label: string; url: string }[];
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const posts: Record<string, BlogPostData> = {
    "signifyplus-innovation-award": {
      id: "signifyplus-innovation-award",
      title: "SignifyPlus Wins Innovation Award at Bilkent University",
      date: "2024-05-15",
      category: "award",
      images: ["/assets/BilkentFYP2.png"],
      tags: [
        "ASL",
        "Machine Learning",
        "Mobile App",
        "Innovation",
        "MediaPipe",
        "Neural Networks",
      ],
      links: [
        {
          label: "Demo Video",
          url: "https://youtu.be/iFCClF7JPt8?si=KWurlvxnT79KIhMf",
        },
        {
          label: "LinkedIn Post",
          url: "https://www.linkedin.com/posts/kamila-aliyeva-a44a3b253_signifyplus-asltranslation-accessibletech-activity-7328854278708609024-TCT7",
        },
      ],
      content: (
        <div className="prose prose-neutral prose-invert max-w-none">
          <h2>About SignifyPlus</h2>
          <p>
            SignifyPlus bridges the communication gap between signers and
            non-signers, requiring no prior knowledge of ASL. Think of it as
            WhatsApp or Telegram, but specifically designed with deaf and mute
            users in mind.
          </p>

          <h2>What Makes It Special</h2>
          <p>
            What sets our mobile messaging application apart is its{" "}
            <strong>
              real-time ASL (American Sign Language) translation during video
              calls
            </strong>{" "}
            - a feature never before successfully implemented on mobile devices.
          </p>

          <h2>Technical Achievements</h2>
          <p>Our team tackled significant technical challenges:</p>
          <ul>
            <li>
              Implemented sequence buffers and interpolation for frame rate
              stabilization
            </li>
            <li>
              Fine-tuned Google's MediaPipe algorithm to handle variable
              lighting and video quality
            </li>
            <li>
              Enhanced performance through our custom neural network
              architecture combining LSTMs, GRUs, and TCNs
            </li>
          </ul>

          <h2>The Team</h2>
          <p>
            I'm incredibly grateful to have collaborated with such a talented
            team:
          </p>
          <ul>
            <li>
              <strong>Iman Zahid</strong> - Frontend development
            </li>
            <li>
              <strong>Messem Kazim Muhammad</strong> - Machine learning
            </li>
            <li>
              <strong>Muhammad Bilal</strong> - Backend development
            </li>
            <li>
              <strong>Boran Deniz Düzgün</strong> - Cross-functional support
            </li>
          </ul>

          <h2>Acknowledgments</h2>
          <p>
            Special thanks to our award sponsor <strong>Otsimo 👐</strong> and
            all the professors who believed in our project, particularly our
            department chair, <strong>Erkan UÇAR</strong>.
          </p>
        </div>
      ),
    },
    "best-intern-award": {
      id: "best-intern-award",
      title: "Best Intern Award at ARKSOFT",
      date: "2024-06-20",
      category: "award",
      images: ["/assets/ArksoftBilkent.png"],
      tags: ["Internship", "ARKSOFT", "Achievement", "React", "Full Stack"],
      content: (
        <div className="prose prose-neutral prose-invert max-w-none">
          <p className="lead">
            The "Best Intern Award", organized by the Department of Information
            Systems and Technologies at Bilkent University, has been awarded to
            a member of the ARKSOFT family this year!
          </p>

          <h2>About the Award</h2>
          <p>
            I am truly honored to receive this recognition during my internship
            at ARKSOFT. This award represents the value and supportive
            environment that ARKSOFT provides to young talents, and I'm grateful
            to have been part of such an exceptional team.
          </p>

          <h2>My Experience at ARKSOFT</h2>
          <p>
            During my time at ARKSOFT, I worked on developing scalable web
            applications using modern technologies including React, Next.js, and
            Node.js. The experience allowed me to:
          </p>
          <ul>
            <li>Work on real-world production applications</li>
            <li>
              Collaborate with experienced developers and learn best practices
            </li>
            <li>
              Implement secure routing patterns and state management solutions
            </li>
            <li>
              Contribute to the company's mission of delivering high-quality
              software
            </li>
          </ul>

          <h2>Looking Forward</h2>
          <p>
            This award motivates me to continue growing as a software engineer
            and to keep pushing the boundaries of what's possible with modern
            web technologies. I'm grateful to ARKSOFT for seeing the potential
            in young talent and providing an environment where we can thrive and
            make meaningful contributions.
          </p>

          <blockquote>
            <p>
              "As a company that sees supporting young talent not as a
              responsibility but as an investment in the future, we
              wholeheartedly congratulate our exceptional interns." - ARKSOFT
            </p>
          </blockquote>
        </div>
      ),
    },
    "bilkent-awards": {
      id: "bilkent-awards",
      title: "Awards and Recognition at Bilkent University",
      date: "2024-05-20",
      category: "award",
      images: ["/assets/BilkentAwards.png"],
      tags: ["Awards", "Academia", "Recognition", "Computer Science"],
      content: (
        <div className="prose prose-neutral prose-invert max-w-none">
          <p className="lead">
            Throughout my academic journey at Bilkent University's Department of
            Information Systems and Technologies, I've been fortunate to receive
            recognition for my dedication to learning and innovation.
          </p>

          <h2>Academic Excellence</h2>
          <p>
            My time at Bilkent University has been marked by continuous learning
            and achievement in the field of Computer Science. The awards and
            recognitions I've received represent not just personal
            accomplishments, but the result of collaboration with talented peers
            and guidance from exceptional faculty.
          </p>

          <h2>Key Achievements</h2>
          <ul>
            <li>Innovation Award for SignifyPlus Senior Project</li>
            <li>Best Intern Award during ARKSOFT internship</li>
            <li>Academic excellence recognition from the department</li>
            <li>Participation in various tech events and competitions</li>
          </ul>

          <h2>What These Awards Mean</h2>
          <p>
            These recognitions serve as milestones in my journey as a software
            engineer. They represent the support I've received from my
            professors, the collaboration with talented teammates, and the
            opportunities provided by Bilkent University to explore innovative
            solutions to real-world problems.
          </p>

          <h2>Gratitude</h2>
          <p>
            I'm deeply grateful to the Department of Information Systems and
            Technologies at Bilkent University for fostering an environment that
            encourages innovation, collaboration, and excellence. Special thanks
            to all the faculty members who have mentored and supported me
            throughout my academic journey.
          </p>
        </div>
      ),
    },
  };

  const post = id ? posts[id] : null;

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Post Not Found</h1>
        <Link to="/blog">
          <Button className="cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/blog">
          <Button variant="ghost" className="mb-6 text-gray-300 hover:text-white hover:bg-purple-500/10 cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
              <Award className="h-3 w-3 mr-1" />
              {post.category}
            </Badge>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{post.title}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20 hover:text-purple-200 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="mb-12">
          {post.images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`${post.title} - Image ${index + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={selectedImage}
              alt={post.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Content */}
        <div className="mb-8">{post.content}</div>

        {/* Links */}
        {post.links && post.links.length > 0 && (
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-white">Related Links</h3>
              <div className="space-y-2">
                {post.links.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-between bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200"
                    asChild
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
