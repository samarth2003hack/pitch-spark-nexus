
import { Card } from "@/components/ui/card";

export default function CreatePitch() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Showcase Your Startup Idea</h1>
        <Card className="p-6">
          <p className="text-muted-foreground mb-4">
            Share your innovative idea with our community of founders and mentors.
          </p>
          {/* Form will be added in a future update */}
          <div className="text-center py-8">
            <p className="text-lg">Coming soon!</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
