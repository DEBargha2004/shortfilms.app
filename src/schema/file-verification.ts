const mimeTypes = [
  {
    id: "image",
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
] as const;

type AcceptedFileType = (typeof mimeTypes)[number]["id"];
type AcceptedMimeTypes = (typeof mimeTypes)[number]["mimeTypes"][number];

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export class FileVerification {
  private maxSize: number;
  private type: AcceptedFileType;
  constructor(private readonly file: File) {
    this.maxSize = 0;
    this.type = "image";
  }

  static isBase64(data?: string) {
    if (!data) return false;
    const acceptedMimeTypes = mimeTypes.map((f) => f.mimeTypes).flat();

    const regex = new RegExp(
      `^data:${acceptedMimeTypes.map(escapeRegex).join("|")};base64,`
    );

    return regex.test(data);
  }

  static base64toBlob(data: string, mimeType: string) {
    const bytestring = atob(data.split(",")[1]);
    const arrayBuffer = new Uint8Array(bytestring.length);

    for (let i = 0; i < bytestring.length; i++) {
      arrayBuffer[i] = bytestring.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeType });
  }

  /**
   *
   * @param size in bytes
   * @returns
   */
  setMaxSize(size: number) {
    this.maxSize = size;
    return this;
  }
  private verifySize() {
    console.log(this.file);
    if (this.file.size > this.maxSize) {
      return { status: false, message: "File size too large" };
    }
    return { status: true };
  }

  setAllowedFileType(type: AcceptedFileType) {
    this.type = type;
    return this;
  }
  private verifyType() {
    if (!this.file.type) {
      return { status: false, message: "File type not supported" };
    }
    const isFileTypeAccepted = mimeTypes
      .find((f) => f.id === this.type)
      ?.mimeTypes.includes(this.file.type as AcceptedMimeTypes);

    if (!isFileTypeAccepted) {
      return { status: false, message: "File type not supported" };
    }
    return { status: true };
  }

  verify() {
    const verifications = [this.verifySize(), this.verifyType()];

    const result = verifications.find((v) => !v.status);

    return Promise.resolve(result ?? { status: true });
  }
}
