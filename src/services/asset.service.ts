import { Asset } from "@/types";

export const assetService = {
  getAssets: async (): Promise<Asset[]> => {
    return [];
  },
  getAssetById: async (_id: string): Promise<Asset | null> => {
    return null;
  }
};
