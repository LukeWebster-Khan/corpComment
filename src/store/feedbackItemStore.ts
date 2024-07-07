import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";
import { API_URL } from "../lib/constants";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getHashTags: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: true,
  errorMessage: "",
  selectedCompany: "",
  getHashTags: () => {
    return [...new Set(get().feedbackItems.map((item) => item.company))];
  },
  getFilteredFeedbackItems: () => {
    return get().selectedCompany
      ? get().feedbackItems.filter(
          (item) => item.company === get().selectedCompany
        )
      : get().feedbackItems;
  },
  addItemToList: async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text,
      upvoteCount: 0,
      badgeLetter: companyName.toUpperCase().substring(0, 1),
      company: companyName as string,
      daysAgo: 0,
    };
    set((prev) => ({
      feedbackItems: [...prev.feedbackItems, newItem],
    }));

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },
  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company,
    }));
  },
  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true,
    }));
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();
      set(() => ({
        feedbackItems: data.feedbacks,
        isLoading: false,
      }));
    } catch (error) {
      set(() => ({
        errorMessage: "An error occurred while fetching feedbacks",
      }));
    }
    set(() => ({
      isLoading: false,
    }));
  },
}));
