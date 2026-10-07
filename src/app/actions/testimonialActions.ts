"use server";

import connectDB from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTestimonial(formData: FormData) {
  await connectDB();
  const name = formData.get("name") as string;
  const place = formData.get("place") as string;
  const date = formData.get("date") as string;
  const quote = formData.get("quote") as string;

  await Testimonial.create({ name, place, date, quote });

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await connectDB();
  await Testimonial.findByIdAndDelete(id);

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
