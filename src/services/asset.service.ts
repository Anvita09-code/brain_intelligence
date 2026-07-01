import { apiClient } from "@/api";
import { Asset } from "@/types";

/**
 * Section 7 wiring: real calls go through the decoupled `apiClient` (which
 * carries the bearer token + normalized error handling from
 * `src/api/interceptors.ts`). If the industrial backend isn't reachable yet
 * (e.g. local/demo mode, `NEXT_PUBLIC_API_URL` unset), we fall back to the
 * previous empty/mock behavior instead of crashing the dashboard.
 */
export const assetService = {
  getAssets: async (): Promise<Asset[]> => {
    try {
      return await apiClient.get<Asset[]>("/assets");
    } catch {
      return [];
    }
  },
  getAssetById: async (id: string): Promise<Asset | null> => {
    try {
      return await apiClient.get<Asset>(`/assets/${id}`);
    } catch {
      return null;
    }
  },
};
