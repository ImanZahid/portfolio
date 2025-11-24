import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Award, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: "award" | "project" | "event";
  excerpt: string;
  image: string;
  tags: string[];
}

export default function Blog() {
  const posts: BlogPost[] = [
    {
      id: "signifyplus-innovation-award",
      title: "SignifyPlus Wins Innovation Award at Bilkent University",
      date: "2024-05-15",
      category: "award",
      excerpt:
        'Our senior project "SignifyPlus" has been awarded the Innovation Award from the Department of Information Systems and Technologies at Bilkent University.',
      image: "/assets/BilkentFYP2.png",
      tags: ["ASL", "Machine Learning", "Mobile App", "Innovation"],
    },
    {
      id: "best-intern-award",
      title: "Best Intern Award at ARKSOFT",
      date: "2024-06-20",
      category: "award",
      excerpt:
        'Received the "Best Intern Award" from Bilkent University\'s Department of Information Systems and Technologies during my internship at ARKSOFT.',
      image: "/assets/ArksoftBilkent.png",
      tags: ["Internship", "ARKSOFT", "Achievement"],
    },
    {
      id: "bilkent-awards",
      title: "Awards and Recognition at Bilkent University",
      date: "2024-05-20",
      category: "award",
      excerpt:
        "A collection of awards and recognitions received during my academic journey at Bilkent University.",
      image: "/assets/BilkentAwards.png",
      tags: ["Awards", "Academia", "Recognition"],
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "award":
        return <Award className="h-4 w-4" />;
      case "project":
        return <Users className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "award":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "project":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-green-500/10 text-green-500 border-green-500/20";
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog & Achievements</h1>
          <p className="text-muted-foreground text-lg">
            Sharing my journey, projects, and milestones in software
            engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.id}`}>
                <Card className="h-full hover:shadow-lg transition-all group cursor-pointer overflow-hidden">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className={getCategoryColor(post.category)}
                      >
                        <span className="flex items-center gap-1">
                          {getCategoryIcon(post.category)}
                          {post.category}
                        </span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
