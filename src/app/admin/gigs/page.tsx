import { redirect } from "next/navigation";
import { fetchGigs } from "@/app/services/gigService";
import { Gig } from "@/types/gig";
import { auth } from "@/auth";
import GigsList from "@/app/components/GigsList";

export default async function GigsPage() {
  const session = await auth();

  // Authentication check
  if (!session) {
    redirect("/auth/signin?callbackUrl=/admin/gigs");
  }

  // Optional: Authorization check
  // if (session.user.role !== 'admin') {
  //   redirect('/unauthorized');
  // }

  // Initial data fetch on server
  const initialData = await fetchGigs(1, "All");

  return <GigsList initialData={initialData} />;
}

export type GigsResponse = {
  gigs: Gig[];
  totalPages: number;
};
