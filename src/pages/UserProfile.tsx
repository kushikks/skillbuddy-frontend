import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SkillTag } from "@/components/SkillTag";
import { currentUser } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState(currentUser.name);
  const [course, setCourse] = useState(currentUser.course);
  const [year, setYear] = useState(currentUser.year.toString());
  const [bio, setBio] = useState(currentUser.bio);
  const [skillsTeach, setSkillsTeach] = useState(currentUser.skillsTeach);
  const [skillsLearn, setSkillsLearn] = useState(currentUser.skillsLearn);
  const [subjects, setSubjects] = useState(currentUser.subjects);
  const [learningStyle, setLearningStyle] = useState(currentUser.learningStyle);
  const [interactionMode, setInteractionMode] = useState(currentUser.interactionMode);
  const [availability, setAvailability] = useState(currentUser.availability);

  const [currentSkillTeach, setCurrentSkillTeach] = useState("");
  const [currentSkillLearn, setCurrentSkillLearn] = useState("");
  const [currentSubject, setCurrentSubject] = useState("");

  const learningStyles = ["Visual", "Auditory", "Reading/Writing", "Hands-on"];
  const interactionModes = ["Online", "Offline"];
  const availabilityOptions = ["Weekday Mornings", "Weekday Afternoons", "Weekday Evenings", "Weekends"];

  const addSkill = (type: "teach" | "learn") => {
    if (type === "teach" && currentSkillTeach.trim()) {
      setSkillsTeach([...skillsTeach, currentSkillTeach.trim()]);
      setCurrentSkillTeach("");
    } else if (type === "learn" && currentSkillLearn.trim()) {
      setSkillsLearn([...skillsLearn, currentSkillLearn.trim()]);
      setCurrentSkillLearn("");
    }
  };

  const removeSkill = (type: "teach" | "learn", index: number) => {
    if (type === "teach") {
      setSkillsTeach(skillsTeach.filter((_, i) => i !== index));
    } else {
      setSkillsLearn(skillsLearn.filter((_, i) => i !== index));
    }
  };

  const addSubject = () => {
    if (currentSubject.trim()) {
      setSubjects([...subjects, currentSubject.trim()]);
      setCurrentSubject("");
    }
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const toggleSelection = (value: string, setState: React.Dispatch<React.SetStateAction<string[]>>, currentState: string[]) => {
    if (currentState.includes(value)) {
      setState(currentState.filter(item => item !== value));
    } else {
      setState([...currentState, value]);
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Edit Profile</h1>
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="course">Course/Major</Label>
                    <Input
                      id="course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <h2 className="text-xl font-semibold mb-6">Skills</h2>
              
              <div className="space-y-6">
                <div>
                  <Label>Skills you can teach</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={currentSkillTeach}
                      onChange={(e) => setCurrentSkillTeach(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill("teach"))}
                      placeholder="Add a skill"
                    />
                    <Button type="button" onClick={() => addSkill("teach")} className="bg-primary hover:bg-primary-hover text-primary-foreground">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skillsTeach.map((skill, index) => (
                      <SkillTag
                        key={index}
                        skill={skill}
                        variant="teach"
                        removable
                        onRemove={() => removeSkill("teach", index)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Skills you want to learn</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={currentSkillLearn}
                      onChange={(e) => setCurrentSkillLearn(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill("learn"))}
                      placeholder="Add a skill"
                    />
                    <Button type="button" onClick={() => addSkill("learn")} className="bg-secondary hover:bg-secondary-hover text-secondary-foreground">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skillsLearn.map((skill, index) => (
                      <SkillTag
                        key={index}
                        skill={skill}
                        variant="learn"
                        removable
                        onRemove={() => removeSkill("learn", index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Study Preferences */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <h2 className="text-xl font-semibold mb-6">Study Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <Label>Subjects you're studying</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={currentSubject}
                      onChange={(e) => setCurrentSubject(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
                      placeholder="Add a subject"
                    />
                    <Button type="button" onClick={addSubject} className="bg-primary hover:bg-primary-hover text-primary-foreground">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {subjects.map((subject, index) => (
                      <SkillTag
                        key={index}
                        skill={subject}
                        removable
                        onRemove={() => removeSubject(index)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Learning Style</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {learningStyles.map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => toggleSelection(style, setLearningStyle, learningStyle)}
                        className={`px-4 py-2 rounded-full border transition-smooth ${
                          learningStyle.includes(style)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-border hover:border-primary"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Interaction Mode</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interactionModes.map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => toggleSelection(mode, setInteractionMode, interactionMode)}
                        className={`px-4 py-2 rounded-full border transition-smooth ${
                          interactionMode.includes(mode)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-border hover:border-primary"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Availability</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availabilityOptions.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => toggleSelection(time, setAvailability, availability)}
                        className={`px-4 py-2 rounded-full border transition-smooth ${
                          availability.includes(time)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-border hover:border-primary"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
