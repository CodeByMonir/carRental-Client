import FeaturedFleet from "@/components/FeatureCar";
import TestimonialsSection from "@/components/TestimonialsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsTrustSection from "@/components/StatsTrustSection";


import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Banner from "@/components/Banner";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: {
    disableCookieCache: true
  }
  })
  console.log(session,"session");

  return (
    <>
      <Banner/>

      <FeaturedFleet />

      <HowItWorksSection />

      <StatsTrustSection />

      <TestimonialsSection />

    </>
  );
}
