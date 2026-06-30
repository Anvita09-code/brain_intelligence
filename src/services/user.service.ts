import { UserProfile } from "@/types";

export const userService = {
  getCurrentUser: async (): Promise<UserProfile> => {
    return {
      id: "usr-001",
      name: "Alex Mercer",
      email: "a.mercer@iob.enterprise.internal",
      role: "Lead Diagnostic Engineer",
      shift: "Shift A (06:00 - 18:00)",
      permissions: ["HAZARD_INJECT", "TELEMETRY_OVERRIDE", "MODEL_RETRAIN", "EMERGENCY_TRIP"],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    };
  }
};
