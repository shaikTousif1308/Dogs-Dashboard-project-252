import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Send, MessageCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HelpSection() {
  const [question, setQuestion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const commonQuestions = [
    {
      question: "How often should I walk my dog?",
      answer: "Most dogs need 30 minutes to 2 hours of exercise daily, depending on breed and age.",
      category: "Exercise"
    },
    {
      question: "What should I feed my puppy?",
      answer: "Puppies need high-quality puppy food with proper protein, fat, and nutrients for growth.",
      category: "Nutrition"
    },
    {
      question: "How do I know if my dog is sick?",
      answer: "Watch for changes in appetite, energy, behavior, or bathroom habits. Consult a vet when in doubt.",
      category: "Health"
    },
    {
      question: "When should I start training my dog?",
      answer: "Training can start as early as 8 weeks old. Basic commands and house training are priorities.",
      category: "Training"
    },
    {
      question: "How often should I groom my dog?",
      answer: "Brushing frequency depends on coat type: daily for long hair, weekly for short hair.",
      category: "Grooming"
    },
    {
      question: "What vaccinations does my dog need?",
      answer: "Core vaccines include rabies, DHPP. Your vet will recommend based on location and lifestyle.",
      category: "Health"
    }
  ];

  const filteredQuestions = commonQuestions.filter(
    q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
         q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
         q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAskQuestion = () => {
    if (question.trim()) {
      toast({
        title: "Question Submitted!",
        description: "Our dog experts will get back to you soon.",
      });
      setQuestion("");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Exercise: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Nutrition: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Health: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      Training: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Grooming: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="w-full glass-card border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary pulse-glow" />
          <span className="gradient-text">Dog Care Help Center</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ask a Question */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Ask Our Dog Experts
          </h3>
          <div className="space-y-3">
            <Textarea
              placeholder="Ask any question about dog care, training, health, or behavior..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
            />
            <Button 
              onClick={handleAskQuestion}
              disabled={!question.trim()}
              className="w-full sm:w-auto hero-button text-white border-0"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Question
            </Button>
          </div>
        </div>

        {/* Search FAQ */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Common Questions
          </h3>
          <Input
            placeholder="Search for topics like 'feeding', 'training', 'health'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          <h3 className="font-semibold">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {filteredQuestions.map((faq, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{faq.question}</h4>
                  <Badge className={getCategoryColor(faq.category)}>
                    {faq.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          {filteredQuestions.length === 0 && searchTerm && (
            <div className="text-center py-8 text-muted-foreground">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No questions found for "{searchTerm}"</p>
              <p className="text-sm">Try asking our experts above!</p>
            </div>
          )}
        </div>

        {/* Quick Contact Info */}
        <div className="p-4 bg-primary/10 rounded-lg">
          <h4 className="font-semibold mb-2">Need Immediate Help?</h4>
          <div className="space-y-1 text-sm">
            <p>🚨 Emergency: Contact your local veterinarian</p>
            <p>📞 Pet Poison Helpline: (855) 764-7661</p>
            <p>💬 Live Chat: Available 9 AM - 6 PM EST</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}