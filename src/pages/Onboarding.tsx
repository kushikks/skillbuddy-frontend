import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SkillTag } from "@/components/SkillTag";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { createStudentProfile, fetchLatestStudentProfile } from "@/services/studentService";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  // Step 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [campus, setCampus] = useState("");
  const [year, setYear] = useState("");
  const [bio, setBio] = useState("");

  // Step 2
  const [skillsTeach, setSkillsTeach] = useState<string[]>([]);
  const [skillsLearn, setSkillsLearn] = useState<string[]>([]);
  const [currentSkillTeach, setCurrentSkillTeach] = useState("");
  const [currentSkillLearn, setCurrentSkillLearn] = useState("");

  // Step 3
  const [subjects, setSubjects] = useState<string[]>([]);
  const [currentSubject, setCurrentSubject] = useState("");
  const [learningStyle, setLearningStyle] = useState<string[]>([]);
  const [interactionMode, setInteractionMode] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);

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

  const handleNext = () => {
    if (step === 1 && (!name || !course || !year || !bio)) {
      toast({
        title: "Please complete all fields",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && (skillsTeach.length === 0 || skillsLearn.length === 0)) {
      toast({
        title: "Please add at least one skill to teach and learn",
        variant: "destructive",
      });
      return;
    }
    if (step === 3 && (subjects.length === 0 || learningStyle.length === 0 || interactionMode.length === 0 || availability.length === 0)) {
      toast({
        title: "Please complete all preferences",
        variant: "destructive",
      });
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    // This handler now creates the student profile in Supabase
    (async () => {
      try {
        // Map interactionMode and learningStyle arrays to single DB values
        const mapInteractionMode = (modes: string[]) => {
          const lower = modes.map((m) => m.toLowerCase());
          if (lower.includes("online") && lower.includes("offline")) return "hybrid";
          if (lower.includes("offline")) return "offline";
          return "online";
        };

        const mapLearningStyle = (styles: string[]) => {
          if (styles.length > 1) return "mixed";
          if (styles.length === 0) return "mixed";
          const s = styles[0].toLowerCase();
          if (s.includes("visual")) return "visual";
          if (s.includes("auditory")) return "auditory";
          if (s.includes("reading")) return "reading_writing";
          if (s.includes("hand") || s.includes("hands")) return "kinesthetic";
          return "mixed";
        };

        const payload = {
          fullName: name,
          email,
          campus,
          bio,
          interactionMode: mapInteractionMode(interactionMode),
          learningStyle: mapLearningStyle(learningStyle),
          availableTimeSlots: availability,
        };

        await createStudentProfile(payload);
        toast({
          title: "Profile created!",
          description: "Saved to Supabase.",
        });
        navigate("/dashboard");
      } catch (err: any) {
        toast({
          title: "Error saving profile",
          description: err?.message ?? String(err),
          variant: "destructive",
        });
      }
    })();
  };

  const [latestProfile, setLatestProfile] = useState<any | null>(null);

  const handleFetchLatest = async () => {
    try {
      const row = await fetchLatestStudentProfile();
      if (!row) {
        toast({ title: "No profiles found", description: "No students in DB yet." });
        setLatestProfile(null);
        return;
      }
      setLatestProfile(row);
      toast({ title: "Latest profile loaded" });
    } catch (err: any) {
      toast({ title: "Error fetching", description: err?.message ?? String(err), variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-muted/30">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-full h-2 rounded-full mx-1 transition-smooth ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Step {step} of 4
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-3xl p-8 shadow-medium"
          >
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">Tell us about yourself</h2>
                  <p className="text-muted-foreground">Basic information to get started</p>
                </div>

                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
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
                      placeholder="Computer Science"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="campus">Campus</Label>
                    <Input
                      id="campus"
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      placeholder="Main Campus"
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
                      placeholder="2"
                      min="1"
                      max="6"
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
                    placeholder="Tell others about yourself, your interests, and what you're passionate about..."
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Skills */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">Your Skills</h2>
                  <p className="text-muted-foreground">What can you teach and what do you want to learn?</p>
                </div>

                <div>
                  <Label>Skills you can teach</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={currentSkillTeach}
                      onChange={(e) => setCurrentSkillTeach(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill("teach"))}
                      placeholder="e.g., Python, React, Marketing"
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
                      placeholder="e.g., UI/UX Design, Public Speaking"
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
            )}

            {/* Step 3: Study Preferences */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">Study Preferences</h2>
                  <p className="text-muted-foreground">Help us match you with the right study buddies</p>
                </div>

                <div>
                  <Label>Subjects you're studying</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={currentSubject}
                      onChange={(e) => setCurrentSubject(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
                      placeholder="e.g., Algorithms, Calculus"
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
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">Review & Complete</h2>
                  <p className="text-muted-foreground">Everything looks good?</p>
                </div>

                <div className="space-y-4 bg-muted/50 rounded-2xl p-6">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Profile</h3>
                    <p className="text-foreground">{name} • {course} • Year {year}</p>
                    <p className="text-sm text-muted-foreground mt-1">{bio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">Skills to Teach</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillsTeach.map((skill, i) => (
                        <SkillTag key={i} skill={skill} variant="teach" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">Skills to Learn</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillsLearn.map((skill, i) => (
                        <SkillTag key={i} skill={skill} variant="learn" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">Study Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject, i) => (
                        <SkillTag key={i} skill={subject} />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">Learning Style</h3>
                      <p className="text-sm">{learningStyle.join(", ")}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">Mode</h3>
                      <p className="text-sm">{interactionMode.join(", ")}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">Availability</h3>
                      <p className="text-sm">{availability.join(", ")}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Button type="button" onClick={handleFetchLatest} className="bg-secondary">
                    Fetch Latest Profile
                  </Button>
                  <div className="text-sm text-muted-foreground">You can fetch the latest stored student from Supabase.</div>
                </div>

                {latestProfile && (
                  <div className="mt-4 bg-card rounded-xl p-4 border">
                    <h4 className="font-semibold">Latest Student</h4>
                    <p className="text-sm text-muted-foreground mt-1">{latestProfile.full_name} • {latestProfile.email}</p>
                    <p className="mt-2">{latestProfile.bio}</p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <div><strong>Mode:</strong> {latestProfile.interaction_mode}</div>
                      <div><strong>Style:</strong> {latestProfile.learning_style}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="border-border"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              )}
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  className="ml-auto bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="ml-auto bg-gradient-primary text-white hover:opacity-90"
                >
                  Complete <Check className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
