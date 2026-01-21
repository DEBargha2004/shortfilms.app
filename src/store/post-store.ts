import { Category } from "@/types/post";
import { create } from "zustand";
import { produce } from "immer";

type State = {
  genres?: Category[];
  techniques?: Category[];
};
type Actions = {
  setGenres: (genres?: Category[]) => void;
  setTechniques: (techniques?: Category[]) => void;
};

export const usePostStore = create<State & Actions>((set) => ({
  genres: [],
  techniques: [],
  setGenres(genres) {
    set(
      produce<State>((state) => {
        state.genres = genres;
      })
    );
  },
  setTechniques(techniques) {
    set(
      produce<State>((state) => {
        state.techniques = techniques;
      })
    );
  },
}));
