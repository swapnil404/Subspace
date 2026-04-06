import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Check, Zap, Shield, Clock, MessageCircle, Smile, Image, Star } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { ProBadge } from "@/components/premium/pro-badge";
import { cn } from "@my-better-t-app/ui/lib/utils";

export const Route = createFileRoute("/upgrade")({
  component: UpgradePage,
});

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Essential features to get started with your community",
    features: [
      { text: "Up to 10 servers", included: true },
      { text: "Basic chat functionality", included: true },
      { text: "Standard emoji set", included: true },
      { text: "10GB file storage", included: true },
      { text: "720p video quality", included: true },
      { text: "Custom emoji", included: false },
      { text: "Animated avatars", included: false },
      { text: "Server backup", included: false },
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    period: "month",
    description: "Enhanced experience for power users and growing communities",
    features: [
      { text: "Unlimited servers", included: true },
      { text: "Advanced chat features", included: true },
      { text: "Custom emoji access", included: true },
      { text: "Animated avatars", included: true },
      { text: "50GB file storage", included: true },
      { text: "1080p video quality", included: true },
      { text: "Server backup", included: true },
      { text: "Profile themes", included: true },
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$29.99",
    period: "month",
    description: "The ultimate experience with all features unlocked",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited file storage", included: true },
      { text: "4K video quality", included: true },
      { text: "Stage channels", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
      { text: "Custom templates", included: true },
      { text: "API access", included: true },
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and various other payment methods through our secure payment processor.",
  },
  {
    question: "Is there a free trial?",
    answer: "Pro comes with a 7-day free trial. No credit card required to start.",
  },
  {
    question: "Can I switch plans?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
];

function UpgradePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-[--background] text-[--foreground]">
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[--border] bg-[--background]/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[--discord-blurple] to-[--discord-pink] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Subspace</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/servers" className="text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors">
                Back to App
              </Link>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full pro-gradient mb-6">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Upgrade Your <span className="pro-gradient bg-clip-text text-transparent">Experience</span>
            </h1>
            <p className="text-xl text-[--muted-foreground] max-w-xl mx-auto">
              Unlock premium features and take your community to the next level with Subspace Pro
            </p>
          </div>
        </section>

        <section className="pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={cn(
                    "relative rounded-2xl p-6 transition-all duration-300",
                    plan.popular
                      ? "bg-gradient-to-b from-[--primary]/20 to-[--popover] border-2 border-[--primary] scale-105 shadow-xl shadow-[--primary]/20"
                      : "bg-[--popover] border border-[--border] hover:border-[--primary]/50"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-[--primary] text-white text-sm font-bold flex items-center gap-1">
                        <Star className="w-4 h-4" /> MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      {plan.id !== "free" && <ProBadge size="sm" />}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-[--muted-foreground]">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-[--muted-foreground] mt-2">{plan.description}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-[--discord-green] flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-[--muted] flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-[--muted-foreground]" />
                          </div>
                        )}
                        <span className={!feature.included ? "text-[--muted-foreground]" : ""}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={cn(
                      "w-full py-3 rounded-lg font-semibold transition-all duration-200",
                      plan.popular
                        ? "bg-[--primary] hover:bg-[--primary]/90 text-white shadow-lg shadow-[--primary]/30"
                        : plan.id === "free"
                        ? "bg-[--muted] hover:bg-[--active-bg] text-[--foreground]"
                        : "bg-[--muted] hover:bg-[--active-bg] text-[--foreground] border border-[--border]"
                    )}
                  >
                    {plan.id === "free" ? "Current Plan" : `Get ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-[--muted]/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Upgrade?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-[--popover] border border-[--border]">
                <div className="w-12 h-12 rounded-lg bg-[--primary]/20 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-[--primary]" />
                </div>
                <h3 className="font-semibold mb-2">Unlimited Servers</h3>
                <p className="text-sm text-[--muted-foreground]">
                  Create as many servers as you need. No limits, no restrictions.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[--popover] border border-[--border]">
                <div className="w-12 h-12 rounded-lg bg-[--discord-pink]/20 flex items-center justify-center mb-4">
                  <Smile className="w-6 h-6 text-[--discord-pink]" />
                </div>
                <h3 className="font-semibold mb-2">Custom Emoji</h3>
                <p className="text-sm text-[--muted-foreground]">
                  Express yourself with custom emoji and animated reactions.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[--popover] border border-[--border]">
                <div className="w-12 h-12 rounded-lg bg-[--discord-green]/20 flex items-center justify-center mb-4">
                  <Image className="w-6 h-6 text-[--discord-green]" />
                </div>
                <h3 className="font-semibold mb-2">HD Video Quality</h3>
                <p className="text-sm text-[--muted-foreground]">
                  Crystal clear video calls up to 4K resolution for premium members.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[--popover] border border-[--border]">
                <div className="w-12 h-12 rounded-lg bg-[--discord-yellow]/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[--discord-yellow]" />
                </div>
                <h3 className="font-semibold mb-2">Server Backup</h3>
                <p className="text-sm text-[--muted-foreground]">
                  Never lose your data with automatic server backups and recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-xl bg-[--popover] border border-[--border]">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[--primary]" />
                    {faq.question}
                  </h3>
                  <p className="text-sm text-[--muted-foreground] pl-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-8 px-6 border-t border-[--border]">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-[--muted-foreground]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-[--discord-blurple] to-[--discord-pink] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span>Subspace</span>
            </div>
            <p>© 2024 Subspace. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
