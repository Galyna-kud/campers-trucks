import {
  Camper,
  CamperAmenities,
  CamperEngine,
  CamperForm,
  CamperGallery,
  CamperTransmission,
} from "@/types/camper";
import axios from "axios";

const ENDPOINT = "/campers";

const apiClient = axios.create({
  baseURL: "https://campers-api.goit.study",
});

interface GetCampersParams {
  page?: number;
  perPage?: number;
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
}

interface GetCampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface GetCampersFiltersResponse {
  forms: CamperForm[];
  transmissions: CamperTransmission[];
  engines: CamperEngine[];
}

export interface GetCamperByIdResponse {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmission;
  engine: CamperEngine;
  amenities: CamperAmenities[];
  createdAt: string;
  updatedAt: string;
  gallery: CamperGallery[];
  totalReviews: number;
}

interface GetCamperReviewsResponse {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateBookingRequestBody {
  name: string;
  email: string;
}

export interface CreateBookingResponse {
  message: string;
}

export async function getCampers(
  params: GetCampersParams,
): Promise<GetCampersResponse> {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== "" && value !== undefined && value !== null,
    ),
  );

  const { data } = await apiClient.get<GetCampersResponse>(ENDPOINT, {
    params: cleanParams,
  });
  return data;
}

export async function getCampersFilters(): Promise<GetCampersFiltersResponse> {
  const { data } = await apiClient.get<GetCampersFiltersResponse>(
    `${ENDPOINT}/filters`,
  );
  return data;
}

export async function getCamperById(
  id: Camper["id"],
): Promise<GetCamperByIdResponse> {
  const { data } = await apiClient.get<GetCamperByIdResponse>(
    `${ENDPOINT}/${id}`,
  );
  return data;
}

export async function getCamperReviews(
  id: Camper["id"],
): Promise<GetCamperReviewsResponse[]> {
  const { data } = await apiClient.get<GetCamperReviewsResponse[]>(
    `${ENDPOINT}/${id}/reviews`,
  );
  return data;
}

export async function createBookingRequest(
  id: Camper["id"],
  body: CreateBookingRequestBody,
): Promise<CreateBookingResponse> {
  const { data } = await apiClient.post<CreateBookingResponse>(
    `${ENDPOINT}/${id}/booking-requests`,
    body,
  );
  return data;
}