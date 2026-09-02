"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { formatFees } from "@/lib/tutorTaxonomy";

const AdminPhotoPreview = ({ value }: { value: string }) => (
  <div className="flex items-center gap-3">
    <strong>Photo:</strong>
    <a href={value} target="_blank" rel="noopener noreferrer">
      <img src={value} alt="" className="h-12 w-12 rounded-full object-cover border" loading="lazy" />
    </a>
    <span className="text-xs text-muted-foreground break-all">{value}</span>
  </div>
);

type Tutor = {
  id: string;
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  subjects: string[];
  grade_levels: string[] | null;
  boards: string[] | null;
  mode: string;
  country: string | null;
  state: string | null;
  city: string | null;
  area: string | null;
  experience_years: string | null;
  fee_min: number | null;
  fee_max: number | null;
  qualification: string | null;
  languages: string[] | null;
  availability: string | null;
  intro: string | null;
  photo_url: string | null;
  status: string;
  rejection_reason: string | null;
  lead_count: number;
  approved_at: string | null;
  created_at: string;
};

export default function AdminClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [rejectReason, setRejectReason] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Tutor | null>(null);
  const [deleteStep, setDeleteStep] = useState<1 | 2>(1);
  const [deleting, setDeleting] = useState(false);

  const loadTutors = useCallback(async () => {
    let query = supabase.from("tutors").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data, error } = await query;
    if (error) {
      toast({ title: "Failed to load tutors", description: error.message, variant: "destructive" });
      return;
    }
    setTutors((data as Tutor[]) ?? []);
  }, [filter]);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.replace("/admin/login");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sessionData.session.user.id);
      const admin = (roles ?? []).some((r) => r.role === "admin");
      if (!admin) {
        toast({ title: "Access denied", description: "You are not an admin.", variant: "destructive" });
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }
      setIsAdmin(true);
      setLoading(false);
    };
    init();
  }, [router]);

  useEffect(() => {
    if (isAdmin) loadTutors();
  }, [isAdmin, loadTutors]);

  const setStatus = async (
    id: string,
    status: "approved" | "rejected" | "pending"
  ) => {
    const patch: Record<string, unknown> = { status };
    if (status === "rejected") patch.rejection_reason = rejectReason[id] || null;
    if (status !== "rejected") patch.rejection_reason = null;
    const { error } = await supabase.from("tutors").update(patch as any).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Tutor ${status}` });
    loadTutors();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const openDelete = (t: Tutor) => {
    setDeleteTarget(t);
    setDeleteStep(1);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase.from("tutors").delete().eq("id", deleteTarget.id);
    setDeleting(false);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Tutor submission deleted" });
    setDeleteTarget(null);
    setDeleteStep(1);
    loadTutors();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold font-heading">Admin · Tutor Submissions</h1>
          <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {(["pending", "approved", "rejected", "all"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        {tutors.length === 0 ? (
          <p className="text-muted-foreground">No tutors in this list.</p>
        ) : (
          <div className="space-y-3">
            {tutors.map((t) => {
              const fee = formatFees(t.fee_min, t.fee_max);
              const loc = [t.area, t.city, t.state, t.country].filter(Boolean).join(", ");
              return (
                <Card key={t.id}>
                  <CardHeader className="flex flex-row items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg font-heading">{t.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{loc || "—"} · {t.mode}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={t.status === "approved" ? "default" : "outline"}>{t.status}</Badge>
                      <span className="text-xs text-muted-foreground">{t.lead_count} leads</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Subjects:</strong> {t.subjects?.join(", ") || "—"}</p>
                    <p><strong>Grade Levels:</strong> {(t.grade_levels ?? []).join(", ") || "—"}</p>
                    <p><strong>Boards:</strong> {(t.boards ?? []).join(", ") || "—"}</p>
                    <p><strong>Experience:</strong> {t.experience_years ? `${t.experience_years} yrs` : "—"}</p>
                    <p><strong>Fees:</strong> {fee || "—"}</p>
                    <p><strong>Languages:</strong> {(t.languages ?? []).join(", ") || "—"}</p>
                    <p><strong>Availability:</strong> {t.availability || "—"}</p>
                    <p><strong>Qualification:</strong> {t.qualification || "—"}</p>
                    <p><strong>Email:</strong> {t.email || "—"}</p>
                    <p><strong>Phone:</strong> {t.phone || "—"}</p>
                    {t.intro && <p><strong>Bio:</strong> {t.intro}</p>}
                    {t.photo_url && <AdminPhotoPreview value={t.photo_url} />}
                    {t.rejection_reason && (
                      <p><strong>Rejection reason:</strong> {t.rejection_reason}</p>
                    )}

                    {t.status !== "rejected" && (
                      <Input
                        placeholder="Rejection reason (optional)"
                        value={rejectReason[t.id] ?? ""}
                        onChange={(e) => setRejectReason((s) => ({ ...s, [t.id]: e.target.value }))}
                        className="mt-2"
                      />
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      {t.status !== "approved" && (
                        <Button size="sm" onClick={() => setStatus(t.id, "approved")}>Approve</Button>
                      )}
                      {t.status !== "rejected" && (
                        <Button size="sm" variant="outline" onClick={() => setStatus(t.id, "rejected")}>
                          Reject
                        </Button>
                      )}
                      {t.status !== "pending" && (
                        <Button size="sm" variant="ghost" onClick={() => setStatus(t.id, "pending")}>
                          Mark Pending
                        </Button>
                      )}
                      {(t.status === "pending" || t.status === "rejected") && (
                        <Button size="sm" variant="destructive" onClick={() => openDelete(t)}>
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
            setDeleteStep(1);
          }
        }}
      >
        <AlertDialogContent>
          {deleteStep === 1 ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading">Delete this submission?</AlertDialogTitle>
                <AlertDialogDescription>
                  You're about to permanently delete <strong>{deleteTarget?.name}</strong> ({deleteTarget?.status}). This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" onClick={() => setDeleteStep(2)}>Continue</Button>
              </AlertDialogFooter>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Final confirmation: this will permanently remove <strong>{deleteTarget?.name}</strong>'s submission from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    confirmDelete();
                  }}
                  disabled={deleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-heading"
                >
                  {deleting ? "Deleting..." : "Yes, delete permanently"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
