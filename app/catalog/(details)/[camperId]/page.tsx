import { getCamperById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CamperDetailsClient from "./CamperDetails.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ camperId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const camper = await getCamperById(camperId);

    const description = camper.description || "";
    const mainImage =
      camper.gallery?.[0]?.original ||
      "https://campers-trucks.vercel.app/img/bg-img.jpg";

    return {
      title: `${camper.name} | TravelTrucks`,
      description:
        description.length > 160
          ? `${description.slice(0, 157)}...`
          : description,

      openGraph: {
        title: camper.name,
        description: description.slice(0, 160),
        url: `https://campers-trucks.vercel.app/campers/${camperId}`,
        siteName: "TravelTrucks",
        type: "website",
        images: [
          {
            url: mainImage,
            width: 1200,
            height: 630,
            alt: camper.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);

    return {
      title: "Camper Details | TravelTrucks",
    };
  }
}

export default async function CamperDetails({ params }: Props) {
  const { camperId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["camper", camperId],
    queryFn: () => getCamperById(camperId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetailsClient />
    </HydrationBoundary>
  );
}