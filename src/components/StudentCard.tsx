import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Student } from "@/data/mockData";
import { SkillTag } from "./SkillTag";
import { Button } from "./ui/button";
import { MapPin, Clock } from "lucide-react";

interface StudentCardProps {
  student: Student;
  index?: number;
}

export const StudentCard = ({ student, index = 0 }: StudentCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-6 shadow-soft hover-lift cursor-pointer border border-border"
      onClick={() => navigate(`/student/${student.id}`)}
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={student.photo}
          alt={student.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate">
            {student.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {student.course} • Year {student.year}
          </p>
        </div>
      </div>

      <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
        {student.bio}
      </p>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Can teach:
          </p>
          <div className="flex flex-wrap gap-2">
            {student.skillsTeach.slice(0, 3).map((skill) => (
              <SkillTag key={skill} skill={skill} variant="teach" />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Wants to learn:
          </p>
          <div className="flex flex-wrap gap-2">
            {student.skillsLearn.slice(0, 3).map((skill) => (
              <SkillTag key={skill} skill={skill} variant="learn" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{student.interactionMode.join(", ")}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{student.availability[0]}</span>
        </div>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/student/${student.id}`);
        }}
      >
        View Profile
      </Button>
    </motion.div>
  );
};
