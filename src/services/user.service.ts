import { apiClient } from "@/api";
import { UserProfile } from "@/types";

const MOCK_USER: UserProfile = {
  id: "usr-001",
  name: "Alex Mercer",
  email: "a.mercer@iob.enterprise.internal",
  role: "Lead Diagnostic Engineer",
  shift: "Shift A (06:00 - 18:00)",
  permissions: ["HAZARD_INJECT", "TELEMETRY_OVERRIDE", "MODEL_RETRAIN", "EMERGENCY_TRIP"],
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
};

export const userService = {
  getCurrentUser: async (): Promise<UserProfile> => {
    try {
      return await apiClient.get<UserProfile>("/users/me");
    } catch {
      return MOCK_USER;
    }
  },
};
