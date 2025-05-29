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

export const videoUploadTypes = [
  {
    label: "Link",
    value: "link",
  },
  {
    label: "File",
    value: "file",
  },
  {
    label: "Google Drive",
    value: "drive",
  },
] as const;

export const videoUploadTypesIds = videoUploadTypes.map((type) => type.value);
export type VideoUploadType = (typeof videoUploadTypesIds)[number];
export const videoUploadTypeLink = videoUploadTypes.find(
  (type) => type.value === "link"
)!;
export const videoUploadTypeFile = videoUploadTypes.find(
  (type) => type.value === "file"
)!;
export const videoUploadTypeDrive = videoUploadTypes.find(
  (type) => type.value === "drive"
)!;

export const creditRoles = [
  {
    group_name: "Main",
    elements: [
      { value: "1", label: "Director" },
      { value: "2", label: "Writer" },
      { value: "3", label: "Producer" },
    ],
  },
  {
    group_name: "Cast",
    elements: [
      { value: "32", label: "Lead Actor" },
      { value: "33", label: "Supporting Actor" },
      { value: "34", label: "Extra" },
    ],
  },
  {
    group_name: "Camera",
    elements: [
      { value: "31", label: "Cinematographer" },
      { value: "5", label: "Director Of Photography" },
      { value: "19", label: "Camera Operator" },
      { value: "76", label: "Drone Operator" },
      { value: "24", label: "Gaffer" },
      { value: "23", label: "Grip" },
      { value: "22", label: "Video Assist" },
    ],
  },
  {
    group_name: "Music & Sound",
    elements: [
      { value: "10", label: "Music Composer" },
      { value: "35", label: "Conductor" },
      { value: "36", label: "Musician" },
      { value: "37", label: "Sound Editor" },
      { value: "21", label: "Sound Mixer" },
      { value: "38", label: "Sound Designer" },
      { value: "80", label: "Sound Recordist" },
      { value: "39", label: "Music Supervisor" },
      { value: "40", label: "Music Editor" },
      { value: "41", label: "Foley Artist" },
      { value: "30", label: "Boom Operator" },
    ],
  },
  {
    group_name: "Art Department",
    elements: [
      { value: "6", label: "Production Designer" },
      { value: "17", label: "Art Director" },
      { value: "42", label: "Illustrator" },
      { value: "43", label: "Graphic Designer" },
      { value: "44", label: "Set Designer" },
      { value: "18", label: "Set Decorator" },
      { value: "25", label: "Propmaster" },
      { value: "45", label: "Propmaker" },
      { value: "46", label: "Storyboard Artist" },
      { value: "47", label: "Visual Development Artist" },
      { value: "48", label: "Story Artist" },
      { value: "81", label: "Still Photographer" },
    ],
  },
  {
    group_name: "Costume & Makeup",
    elements: [
      { value: "9", label: "Costume Designer" },
      { value: "27", label: "Makeup Artist" },
      { value: "49", label: "Hair Stylist" },
      { value: "26", label: "Costumer" },
    ],
  },
  {
    group_name: "Visual Effects & Stunts",
    elements: [
      { value: "28", label: "Visual Effects Artist" },
      { value: "50", label: "Visual Effects Producer" },
      { value: "12", label: "Stunt Coordinator" },
      { value: "51", label: "Stunt Performer" },
      { value: "13", label: "Choreographer" },
    ],
  },
  {
    group_name: "Production",
    elements: [
      { value: "11", label: "Casting Director" },
      { value: "77", label: "Production Supervisor" },
      { value: "78", label: "Production Coordinator" },
      { value: "14", label: "Unit Production Manager" },
      { value: "15", label: "First Assistant Director" },
      { value: "16", label: "Second Assistant Director" },
      { value: "52", label: "Second Unit Director" },
      { value: "20", label: "Script Supervisor" },
      { value: "53", label: "Production Assistant" },
      { value: "79", label: "Line Producer" },
    ],
  },
  {
    group_name: "Post-Production",
    elements: [
      { value: "7", label: "Editor" },
      { value: "54", label: "Assistant Editor" },
      { value: "55", label: "Colorist" },
      { value: "56", label: "Compositor" },
    ],
  },
  {
    group_name: "Special Effects",
    elements: [
      { value: "57", label: "Special Effects Supervisor" },
      { value: "58", label: "Special Effects Assistant" },
      { value: "59", label: "Special Effects Artist" },
    ],
  },
  {
    group_name: "Animation",
    elements: [
      { value: "60", label: "Animation Director" },
      { value: "29", label: "Animator" },
      { value: "61", label: "Lighting Artist" },
      { value: "62", label: "Layout Artist" },
      { value: "63", label: "Character Modeler" },
      { value: "64", label: "Environment Modeler" },
      { value: "65", label: "Rigger" },
      { value: "66", label: "Technical Director" },
      { value: "67", label: "Texture Artist" },
    ],
  },
  {
    group_name: "Other",
    elements: [
      { value: "4", label: "Executive Producer" },
      { value: "8", label: "Associate Producer" },
      { value: "75", label: "Co-Producer" },
      { value: "68", label: "Special Thanks" },
      { value: "69", label: "Supporter" },
      { value: "70", label: "Donor" },
      { value: "71", label: "Festival" },
      { value: "72", label: "School" },
      { value: "73", label: "Distributor" },
      { value: "74", label: "Production Company" },
      { value: "0", label: "General" },
    ],
  },
];
