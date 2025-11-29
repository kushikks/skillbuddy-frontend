import { supabase } from "@/lib/supabaseClient";

// Type for input to createStudentProfile (camelCase)
export type CreateStudentInput = {
  fullName: string;
  email: string;
  campus?: string | null;
  bio?: string | null;
  interactionMode?: string; // 'online' | 'offline' | 'hybrid'
  learningStyle?: string; // 'visual'|'auditory'|'kinesthetic'|'reading_writing'|'mixed'
  availableTimeSlots?: string[] | null;
};

// Inserts a new student row into `students` table. Returns the inserted row.
export async function createStudentProfile(input: CreateStudentInput) {
  const insertObj: any = {
    full_name: input.fullName,
    email: input.email,
    campus: input.campus ?? null,
    bio: input.bio ?? null,
    interaction_mode: input.interactionMode ?? "online",
    learning_style: input.learningStyle ?? "mixed",
    available_time_slots: input.availableTimeSlots ?? null,
  };

  const { data, error } = await supabase
    .from("students")
    .insert([insertObj])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Fetches the latest created student (by created_at). Returns the row or null.
export async function fetchLatestStudentProfile() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) return null;
  return data[0];
}
