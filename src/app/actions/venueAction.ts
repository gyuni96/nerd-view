"use server"

import { createClient } from "@/lib/supabase/server"
import { Venues, VenueSections } from "@/lib/schemas/venues"

export const getVenuesSearch = async (query: string): Promise<Venues[]> => {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("venues")
      .select("id , address , description , name , image_url")
      .like("name", `%${query}%`)

    if (error) {
      throw error
    }

    return data as Venues[]
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getPopularKeywords = async (): Promise<Venues[]> => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("venues")
      .select("name, id")
      .order("view_count", { ascending: false })
      .limit(5)

    if (error) {
      throw error
    }

    return data as Venues[]
  } catch (err) {
    console.error(err)

    return []
  }
}

export const getVenueById = async (venueId: string): Promise<Venues | null> => {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("venues")
      .select("name , address")
      .eq("id", venueId)
      .single()

    if (error) {
      throw error
    }

    return data as Venues
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getVenueSection = async (venueId: string): Promise<VenueSections[]> => {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("sections")
      .select(
        `
        name , 
        id , 
        color , 
        section_group , 
        d:svg_path , 
        type`
      )
      .eq("venue_id", venueId)

    if (error) {
      console.error("Supabase 에러:", error)
      throw error
    }

    return data as VenueSections[]
  } catch (err) {
    console.error(err)
    return []
  }
}
