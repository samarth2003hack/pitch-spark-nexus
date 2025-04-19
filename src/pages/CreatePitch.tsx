
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const categories = [
  "SaaS",
  "FinTech",
  "HealthTech",
  "EdTech",
  "E-commerce",
  "Mobile App",
  "AI/ML",
  "IoT",
  "CleanTech",
  "Other",
];

export default function CreatePitch() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    problem: "",
    solution: "",
    marketSize: "",
    businessModel: "",
    competitiveAdvantage: "",
    funding: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Pitch submitted:", formData);
      toast({
        title: "Pitch submitted successfully!",
        description: "Our mentors will review your idea soon.",
        variant: "default",
      });
      setIsSubmitting(false);
      // In a real app, you would submit to backend here
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Showcase Your Startup Idea</h1>
          <Card className="p-6">
            <p className="text-muted-foreground mb-6">
              Share your innovative idea with our community of founders and mentors.
              Fill out the form below to get valuable feedback from experienced professionals.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Pitch Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="A concise name for your startup idea"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="A brief overview of your startup idea (max 200 characters)"
                    maxLength={200}
                    required
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.description.length}/200 characters
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <h3 className="text-lg font-medium mb-4">Problem & Solution</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="problem">Problem Statement</Label>
                    <Textarea
                      id="problem"
                      name="problem"
                      value={formData.problem}
                      onChange={handleChange}
                      placeholder="What problem does your startup solve?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="solution">Your Solution</Label>
                    <Textarea
                      id="solution"
                      name="solution"
                      value={formData.solution}
                      onChange={handleChange}
                      placeholder="How does your startup solve this problem?"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <h3 className="text-lg font-medium mb-4">Market & Business</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="marketSize">Target Market & Size</Label>
                    <Textarea
                      id="marketSize"
                      name="marketSize"
                      value={formData.marketSize}
                      onChange={handleChange}
                      placeholder="Describe your target market and its size"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessModel">Business Model</Label>
                    <Textarea
                      id="businessModel"
                      name="businessModel"
                      value={formData.businessModel}
                      onChange={handleChange}
                      placeholder="How will your startup make money?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="competitiveAdvantage">Competitive Advantage</Label>
                    <Textarea
                      id="competitiveAdvantage"
                      name="competitiveAdvantage"
                      value={formData.competitiveAdvantage}
                      onChange={handleChange}
                      placeholder="What makes your solution better than competitors?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="funding">Funding Needed & Use of Funds</Label>
                    <Textarea
                      id="funding"
                      name="funding"
                      value={formData.funding}
                      onChange={handleChange}
                      placeholder="How much funding do you need and what will you use it for?"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-launchpad-blue hover:bg-launchpad-blue-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Your Pitch"
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
