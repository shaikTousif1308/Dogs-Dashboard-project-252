import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WalkTracker() {
  const [walksCompleted, setWalksCompleted] = useState(0);
  const [lastWalkTime, setLastWalkTime] = useState<string | null>(null);
  const [nextResetTime, setNextResetTime] = useState<string>("");
  const { toast } = useToast();

  const totalWalks = 3;
  const progressPercentage = (walksCompleted / totalWalks) * 100;

  // Function to get next midnight
  const getNextMidnight = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  // Function to reset daily progress
  const resetDailyProgress = () => {
    setWalksCompleted(0);
    setLastWalkTime(null);
    const today = new Date().toDateString();
    localStorage.setItem('dogWalkProgress', '0');
    localStorage.setItem('dogWalkDate', today);
    localStorage.removeItem('lastWalkTime');
    
    toast({
      title: "🌅 New Day Started!",
      description: "Walk tracker has been reset for today",
    });
  };

  // Function to update next reset time display
  const updateNextResetTime = () => {
    const nextMidnight = getNextMidnight();
    const timeUntilReset = nextMidnight.getTime() - new Date().getTime();
    
    if (timeUntilReset <= 0) {
      resetDailyProgress();
      return;
    }
    
    const hours = Math.floor(timeUntilReset / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntilReset % (1000 * 60 * 60)) / (1000 * 60));
    
    setNextResetTime(`${hours}h ${minutes}m`);
  };

  useEffect(() => {
    // Load saved progress from localStorage
    const saved = localStorage.getItem('dogWalkProgress');
    const savedDate = localStorage.getItem('dogWalkDate');
    const today = new Date().toDateString();
    
    if (savedDate === today && saved) {
      setWalksCompleted(parseInt(saved));
    } else if (savedDate !== today) {
      // Reset for new day
      resetDailyProgress();
    }

    const savedTime = localStorage.getItem('lastWalkTime');
    if (savedTime) setLastWalkTime(savedTime);

    // Update next reset time immediately
    updateNextResetTime();

    // Set up interval to check for day change every minute
    const interval = setInterval(() => {
      const currentDate = new Date().toDateString();
      const storedDate = localStorage.getItem('dogWalkDate');
      
      // Check if day has changed
      if (storedDate !== currentDate) {
        resetDailyProgress();
      }
      
      // Update countdown timer
      updateNextResetTime();
    }, 60000); // Check every minute

    // Also check more frequently near midnight (every 10 seconds in the last 2 minutes)
    const midnightInterval = setInterval(() => {
      const now = new Date();
      const nextMidnight = getNextMidnight();
      const timeUntilMidnight = nextMidnight.getTime() - now.getTime();
      
      if (timeUntilMidnight <= 2 * 60 * 1000) { // Less than 2 minutes until midnight
        updateNextResetTime();
        
        if (timeUntilMidnight <= 0) {
          resetDailyProgress();
        }
      }
    }, 10000); // Check every 10 seconds

    return () => {
      clearInterval(interval);
      clearInterval(midnightInterval);
    };
  }, []);

  const completeWalk = () => {
    if (walksCompleted < totalWalks) {
      const newCount = walksCompleted + 1;
      const currentTime = new Date().toLocaleTimeString();
      
      setWalksCompleted(newCount);
      setLastWalkTime(currentTime);
      
      localStorage.setItem('dogWalkProgress', newCount.toString());
      localStorage.setItem('lastWalkTime', currentTime);
      localStorage.setItem('dogWalkDate', new Date().toDateString());
      
      if (newCount === totalWalks) {
        toast({
          title: "🎉 Daily Goal Achieved!",
          description: "Your dog completed all walks for today!",
        });
      } else {
        toast({
          title: "Walk Completed!",
          description: `${newCount}/${totalWalks} walks done today`,
        });
      }
    }
  };

  return (
    <Card className="w-full glass-card border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary pulse-glow" />
          <span className="gradient-text">Daily Walk Tracker</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {walksCompleted}/{totalWalks}
          </div>
          <p className="text-muted-foreground">Walks completed today</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {lastWalkTime && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Last walk: {lastWalkTime}
          </div>
        )}

        {nextResetTime && (
          <div className="flex items-center justify-between text-xs text-muted-foreground p-2 bg-secondary/50 rounded">
            <span>Next reset in: {nextResetTime}</span>
            <span>🕛 00:00</span>
          </div>
        )}

        <Button 
          onClick={completeWalk}
          disabled={walksCompleted >= totalWalks}
          className="w-full hero-button text-white border-0"
          size="lg"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          {walksCompleted >= totalWalks ? "Daily Goal Complete!" : "Complete Walk"}
        </Button>

        {progressPercentage === 100 && (
          <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200 font-medium">
              🏆 Excellent! Your dog got all the exercise needed today!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}