import { Genre, Technique } from "@/types/post";
import { create } from "zustand";
import { produce } from "immer";

type State = {
  genres?: Genre[];
  techniques?: Technique[];
};
type Actions = {
  setGenres: (genres?: Genre[]) => void;
  setTechniques: (techniques?: Technique[]) => void;
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
