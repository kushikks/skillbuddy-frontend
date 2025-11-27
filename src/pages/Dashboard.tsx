import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, User, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: Users,
      title: "Find Study Buddy",
      description: "Discover students with similar interests",
      action: () => navigate("/explore"),
      color: "from-primary to-primary-hover",
    },
    {
      icon: BookOpen,
      title: "Skill Exchange",
      description: "Connect with students to exchange skills",
      action: () => navigate("/explore"),
      color: "from-secondary to-secondary-hover",
    },
    {
      icon: User,
      title: "My Profile",
      description: "View and edit your profile",
      action: () => navigate("/profile"),
      color: "from-accent to-accent/80",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border">
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
              onClick={() => navigate("/explore")}
              className="text-foreground"
            >
              Explore
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to connect and learn something new today?
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={action.action}
              className="bg-card rounded-2xl p-6 shadow-soft hover-lift cursor-pointer border border-border group"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}
              >
                <action.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
              <p className="text-muted-foreground">{action.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-8 shadow-soft border border-border"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { text: "Sarah Chen viewed your profile", time: "2 hours ago" },
              { text: "New match available: Marcus Johnson", time: "5 hours ago" },
              { text: "You completed your profile setup", time: "1 day ago" },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <p className="text-foreground">{activity.text}</p>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
