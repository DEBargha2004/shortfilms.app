export const premiereStatus: string[] = [
  "WORLD PREMIERE (THIS IS THE FIRST TIME IT WILL BE SEEN)",
  "ONLINE PREMIERE (IT'S ONLY BEEN SEEN OFFLINE)",
  "NOT A PREMIERE (IT'S ALREADY BEEN SEEN ONLINE)",
];

export const ageRating: string[] = ["ALL AUDIENCES", "AGES 13+", "MATURE"];

export const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Dark",
  "Documentary",
  "Drama",
  "Experimental",
  "Fantasy",
  "Film",
  "Horror",
  "Musical",
  "Music Video",
  "Mystery",
  "Myth",
  "Parody",
  "Poem",
  "Profile",
  "Romance",
  "Satire",
  "Sci Fi",
  "Thriller",
  "Western",
];

export const techniques: string[] = [
  "3D Animation",
  "AI",
  "Animation",
  "Anime",
  "Found Footage",
  "Interactive",
  "Live Action",
  "Mixed Media",
  "Motion Capture",
  "Motion Graphics",
  "Performance",
  "Puppetry",
  "Realtime Animation",
  "Special FX",
  "Stop Motion",
  "Virtual Production",
  "VR/360",
];

export const publishingTypes = [
  {
    label: "Public",
    value: "public",
  },
  {
    label: "Private",
    value: "private",
  },
  {
    label: "Unlisted",
    value: "unlisted",
  },
] as const;

export const publicPublishing = publishingTypes.find(
  (type) => type.value === "public"
)!;

export const privatePublishing = publishingTypes.find(
  (type) => type.value === "private"
)!;

export const unlistedPublishing = publishingTypes.find(
  (type) => type.value === "unlisted"
)!;
