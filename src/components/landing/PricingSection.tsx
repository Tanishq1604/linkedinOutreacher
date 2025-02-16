import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for individuals starting with LinkedIn outreach",
    features: [
      "500 automated messages/month",
      "Basic templates",
      "CSV import",
      "Basic analytics",
    ],
  },
  {
    name: "Professional",
    price: "$99",
    description: "For growing businesses and sales teams",
    features: [
      "2000 automated messages/month",
      "Advanced templates",
      "Team collaboration",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited messages",
      "Custom integration",
      "Dedicated support",
      "Custom features",
      "SLA guarantee",
    ],
  },
];

const PricingSection = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the plan that best fits your needs. All plans include a
            14-day free trial.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className="p-8 bg-background">
              <h3 className="text-lg font-semibold leading-8">{tier.name}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.price !== "Custom" && (
                  <span className="text-sm font-semibold">/month</span>
                )}
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full">
                {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
