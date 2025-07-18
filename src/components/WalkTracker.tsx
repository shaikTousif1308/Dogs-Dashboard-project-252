import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WalkTracker() {
  const [walksCompleted, setWalksCompleted] = useState(0);
  const [lastWalkTime, setLastWalkTime] = useState<string | null>(null);
  const { toast } = useToast();

  const totalWalks = 3;
  const progressPercentage = (walksCompleted / totalWalks) * 100;

  useEffect(() => {
    // Load saved progress from localStorage
    const saved = localStorage.getItem('dogWalkProgress');
    const savedDate = localStorage.getItem('dogWalkDate');
    const today = new Date().toDateString();
    
    if (savedDate === today && saved) {
      setWalksCompleted(parseInt(saved));
    } else if (savedDate !== today) {
      // Reset for new day
      setWalksCompleted(0);
      localStorage.setItem('dogWalkDate', today);
      localStorage.setItem('dogWalkProgress', '0');
    }

    const savedTime = localStorage.getItem('lastWalkTime');
    if (savedTime) setLastWalkTime(savedTime);
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Daily Walk Tracker
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

        <Button 
          onClick={completeWalk}
          disabled={walksCompleted >= totalWalks}
          className="w-full"
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