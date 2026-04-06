import { useState } from "react";
import { X, Check, Crown } from "lucide-react";
import { useApp } from "@/context/app-context";
import { cn } from "@my-better-t-app/ui/lib/utils";
import { ProBadge } from "./pro-badge";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Essential features to get started",
    features: [
      "Create up to 10 servers",
      "Basic chat functionality",
      "Standard emoji set",
      "10GB file storage",
      "720p video quality",
    ],
    notIncluded: [
      "Custom emoji",
      "Animated avatars",
      "Server backup",
      "HD video",
    ],
    popular: false,
    pro: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "Enhanced experience for power users",
    features: [
      "Unlimited servers",
      "Advanced chat features",
      "Custom emoji access",
      "Animated avatars",
      "50GB file storage",
      "1080p video quality",
      "Server backup",
      "Profile themes",
    ],
    notIncluded: [
      "HD video",
      "Stage channels",
    ],
    popular: true,
    pro: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$29.99",
    period: "per month",
    description: "The ultimate experience with all features",
    features: [
      "Everything in Pro",
      "Unlimited file storage",
      "4K video quality",
      "Stage channels",
      "Advanced analytics",
      "Priority support",
      "Custom server templates",
      "API access",
    ],
    notIncluded: [],
    popular: false,
    pro: true,
  },
];

export function UpgradeModal() {
  const { showUpgradeModal, setShowUpgradeModal, user } = useApp();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  if (!showUpgradeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setShowUpgradeModal(false)}
      />

      <div
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl",
          "bg-gradient-to-b from-[--primary]/20 to-[--popover] border border-[--border]",
          "animate-in zoom-in-95 fade-in duration-200"
        )}
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setShowUpgradeModal(false)}
            className="p-2 rounded-full bg-[--muted] hover:bg-[--active-bg] transition-colors"
          >
            <X className="w-5 h-5 text-[--muted-foreground]" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[90vh]">
          <div className="text-center py-12 px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full pro-gradient mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Upgrade Your Experience</h2>
            <p className="text-[--muted-foreground] max-w-md mx-auto">
              Unlock premium features and take your community to the next level
            </p>
          </div>

          <div className="flex justify-center gap-2 px-6 mb-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                billingCycle === "monthly"
                  ? "bg-[--primary] text-white"
                  : "bg-[--muted] text-[--muted-foreground] hover:bg-[--active-bg]"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                billingCycle === "yearly"
                  ? "bg-[--primary] text-white"
                  : "bg-[--muted] text-[--muted-foreground] hover:bg-[--active-bg]"
              )}
            >
              Yearly <span className="text-[--discord-green] ml-1">Save 20%</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 px-6 pb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-xl p-6 transition-all duration-200",
                  plan.popular
                    ? "bg-[--primary]/10 border-2 border-[--primary] scale-105"
                    : "bg-[--popover] border border-[--border] hover:border-[--primary]/50"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-[--primary] text-white text-xs font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    {plan.pro && <ProBadge size="sm" />}
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-[--muted-foreground]">/{plan.period}</span>
                  </div>
                  {billingCycle === "yearly" && plan.id !== "free" && (
                    <p className="text-xs text-[--discord-green] mt-1">
                      Save ${Math.round(parseFloat(plan.price.replace("$", "")) * 12 * 0.2)}/year
                    </p>
                  )}
                </div>

                <p className="text-sm text-[--muted-foreground] text-center mb-4">
                  {plan.description}
                </p>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[--discord-green] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[--muted-foreground]">
                      <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={cn(
                    "w-full py-2.5 rounded-lg font-medium transition-all duration-200",
                    plan.popular
                      ? "bg-[--primary] hover:bg-[--primary]/90 text-white"
                      : plan.id === "free"
                      ? "bg-[--muted] hover:bg-[--active-bg] text-[--foreground]"
                      : "bg-[--muted] hover:bg-[--active-bg] text-[--foreground] border border-[--border]"
                  )}
                >
                  {user.isPro && plan.id === "pro" ? "Current Plan" : `Choose ${plan.name}`}
                </button>
              </div>
            ))}
          </div>

          <div className="px-6 pb-8">
            <div className="p-6 rounded-xl bg-[--muted]">
              <h4 className="font-semibold mb-4 text-center">Feature Comparison</h4>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-medium text-[--muted-foreground]">Feature</div>
                <div className="font-medium text-center">Free</div>
                <div className="font-medium text-center text-[--primary]">Pro</div>
                <div className="font-medium text-center">Premium</div>

                <div>Servers</div>
                <div className="text-center">10</div>
                <div className="text-center text-[--primary]">Unlimited</div>
                <div className="text-center">Unlimited</div>

                <div>File Storage</div>
                <div className="text-center">10GB</div>
                <div className="text-center text-[--primary]">50GB</div>
                <div className="text-center">Unlimited</div>

                <div>Video Quality</div>
                <div className="text-center">720p</div>
                <div className="text-center text-[--primary]">1080p</div>
                <div className="text-center">4K</div>

                <div>Custom Emoji</div>
                <div className="text-center">✗</div>
                <div className="text-center text-[--primary]">✓</div>
                <div className="text-center">✓</div>

                <div>Animated Avatar</div>
                <div className="text-center">✗</div>
                <div className="text-center text-[--primary]">✓</div>
                <div className="text-center">✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
