import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 bg-background">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Automate Your LinkedIn Outreach
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Scale your LinkedIn connections and messages with smart automation.
            Save time while maintaining a personal touch.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
