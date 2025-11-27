import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SkillTag } from "@/components/SkillTag";
import { mockStudents } from "@/data/mockData";
import { ArrowLeft, MapPin, Clock, BookOpen, Sparkles, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const student = mockStudents.find(s => s.id === id);

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Student not found</h2>
          <Button onClick={() => navigate("/explore")}>Back to Explore</Button>
        </div>
      </div>
    );
  }

  const handleContact = () => {
    toast({
      title: "Contact Request Sent!",
      description: `Your message to ${student.name} has been sent.`,
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/explore")}
            className="text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explore
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Profile Header */}
          <div className="bg-card rounded-3xl p-8 shadow-medium border border-border mb-6">
            <div className="flex items-start gap-6 mb-6">
              <img
                src={student.photo}
                alt={student.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{student.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {student.course} • Year {student.year}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{student.interactionMode.join(" & ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{student.availability.join(", ")}</span>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                onClick={handleContact}
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> Contact
              </Button>
            </div>

            <p className="text-foreground/80 text-lg leading-relaxed">
              {student.bio}
            </p>
          </div>

          {/* Skills Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Can Teach</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {student.skillsTeach.map((skill) => (
                  <SkillTag key={skill} skill={skill} variant="teach" />
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-xl font-semibold">Wants to Learn</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {student.skillsLearn.map((skill) => (
                  <SkillTag key={skill} skill={skill} variant="learn" />
                ))}
              </div>
            </div>
          </div>

          {/* Study Information */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
            <h2 className="text-xl font-semibold mb-6">Study Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-muted-foreground mb-3">Subjects Studying</h3>
                <div className="flex flex-wrap gap-2">
                  {student.subjects.map((subject) => (
                    <SkillTag key={subject} skill={subject} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-muted-foreground mb-3">Learning Style</h3>
                <div className="flex flex-wrap gap-2">
                  {student.learningStyle.map((style) => (
                    <SkillTag key={style} skill={style} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentProfile;
