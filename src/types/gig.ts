export interface Bid {
  worker_id: number;
  price: string;
}

export interface Gig {
  title: string;
  category: string;
  _id: string;
  description: string;
  price: string;
  status: "open" | "accepted" | "completed";
  customer_id: number;
  created_at: string;
  bids: Bid[];
  accepted_bid?: Bid;
  accepted_at?: string;
  username: string;
  telegramId: string;
  views?: number;
}
