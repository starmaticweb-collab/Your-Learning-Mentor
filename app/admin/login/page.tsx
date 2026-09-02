import { Metadata } from "next";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin Login | YourLearningMentor",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
