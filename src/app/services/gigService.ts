import { Gig } from "@/types/gig";

const fetchGigs = async (currentPage: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/gigs?page=${currentPage}`
    );

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch gigs", error!);
  }
};

export const createGig = async (data: {
  title: string;
  description: string;
  category: string;
  price: number;
  username: string;
  telegramId: string;
}): Promise<Gig> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create gig");

  return res.json();
};

export const updateGig = async (data: {
  gigId: string;
  title: string;
  description: string;
  category: string;
  price: number;
  username: string;
  telegramId: string;
}): Promise<Gig> => {
  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gigs/${data.gigId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to update gig");

  return res.json();
};

export const fetchGigById = async (id: string): Promise<Gig | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs/${id}`, {
      cache: "no-store", // prevent stale data
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch gig:", res.statusText);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching gig:", error);
    return null;
  }
};

export const deleteGig = async (gigId: string): Promise<boolean> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs/${gigId}`, {
    method: "DELETE",
  });
  return res.ok;
};

const closeGig = async (gigId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gigs/${gigId}/close`,
    { method: "PATCH" }
  );
  return res.ok;
};

export { fetchGigs, closeGig };
