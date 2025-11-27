import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentCard } from "@/components/StudentCard";
import { mockStudents } from "@/data/mockData";
import { LogOut, Search, SlidersHorizontal } from "lucide-react";

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  
  // Filter states
  const [selectedSkillsTeach, setSelectedSkillsTeach] = useState<string[]>([]);
  const [selectedSkillsLearn, setSelectedSkillsLearn] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedLearningStyles, setSelectedLearningStyles] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  // Extract unique values for filters
  const allSkillsTeach = Array.from(new Set(mockStudents.flatMap(s => s.skillsTeach)));
  const allSkillsLearn = Array.from(new Set(mockStudents.flatMap(s => s.skillsLearn)));
  const allSubjects = Array.from(new Set(mockStudents.flatMap(s => s.subjects)));
  const allLearningStyles = Array.from(new Set(mockStudents.flatMap(s => s.learningStyle)));
  const allModes = Array.from(new Set(mockStudents.flatMap(s => s.interactionMode)));
  const allAvailability = Array.from(new Set(mockStudents.flatMap(s => s.availability)));

  const toggleFilter = (value: string, selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(item => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  // Filtered students
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      // Search query
      if (searchQuery && !student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !student.course.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Skills teach filter
      if (selectedSkillsTeach.length > 0 && !selectedSkillsTeach.some(skill => student.skillsTeach.includes(skill))) {
        return false;
      }

      // Skills learn filter
      if (selectedSkillsLearn.length > 0 && !selectedSkillsLearn.some(skill => student.skillsLearn.includes(skill))) {
        return false;
      }

      // Subjects filter
      if (selectedSubjects.length > 0 && !selectedSubjects.some(subject => student.subjects.includes(subject))) {
        return false;
      }

      // Learning style filter
      if (selectedLearningStyles.length > 0 && !selectedLearningStyles.some(style => student.learningStyle.includes(style))) {
        return false;
      }

      // Mode filter
      if (selectedModes.length > 0 && !selectedModes.some(mode => student.interactionMode.includes(mode))) {
        return false;
      }

      // Availability filter
      if (selectedAvailability.length > 0 && !selectedAvailability.some(time => student.availability.includes(time))) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedSkillsTeach, selectedSkillsLearn, selectedSubjects, selectedLearningStyles, selectedModes, selectedAvailability]);

  const FilterSection = ({ title, options, selected, setSelected }: { 
    title: string; 
    options: string[]; 
    selected: string[]; 
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  }) => (
    <div className="mb-6">
      <h3 className="font-semibold text-sm text-foreground mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            onClick={() => toggleFilter(option, selected, setSelected)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-smooth ${
              selected.includes(option)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            SkillBuddy
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="text-foreground"
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/profile")}
              className="text-foreground"
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-muted-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-80 flex-shrink-0"
            >
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedSkillsTeach([]);
                      setSelectedSkillsLearn([]);
                      setSelectedSubjects([]);
                      setSelectedLearningStyles([]);
                      setSelectedModes([]);
                      setSelectedAvailability([]);
                    }}
                    className="text-primary"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  <FilterSection
                    title="Skills They Teach"
                    options={allSkillsTeach}
                    selected={selectedSkillsTeach}
                    setSelected={setSelectedSkillsTeach}
                  />
                  <FilterSection
                    title="Skills They Want"
                    options={allSkillsLearn}
                    selected={selectedSkillsLearn}
                    setSelected={setSelectedSkillsLearn}
                  />
                  <FilterSection
                    title="Subjects"
                    options={allSubjects}
                    selected={selectedSubjects}
                    setSelected={setSelectedSubjects}
                  />
                  <FilterSection
                    title="Learning Style"
                    options={allLearningStyles}
                    selected={selectedLearningStyles}
                    setSelected={setSelectedLearningStyles}
                  />
                  <FilterSection
                    title="Mode"
                    options={allModes}
                    selected={selectedModes}
                    setSelected={setSelectedModes}
                  />
                  <FilterSection
                    title="Availability"
                    options={allAvailability}
                    selected={selectedAvailability}
                    setSelected={setSelectedAvailability}
                  />
                </div>
              </div>
            </motion.aside>
          )}

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-border"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  {showFilters ? "Hide" : "Show"} Filters
                </Button>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or course..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <p className="text-muted-foreground">
                Found <span className="font-semibold text-foreground">{filteredStudents.length}</span> students
              </p>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStudents.map((student, index) => (
                <StudentCard key={student.id} student={student} index={index} />
              ))}
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No students match your filters. Try adjusting your search!
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Explore;
