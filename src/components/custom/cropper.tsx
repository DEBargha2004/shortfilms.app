import { forwardRef } from "react";
import Cropper, { ReactCropperElement, ReactCropperProps } from "react-cropper";
import "cropperjs/dist/cropper.css";

const CropperComponent = forwardRef<ReactCropperElement, ReactCropperProps>(
  ({ ...props }, ref) => {
    return <Cropper ref={ref} {...props} />;
  }
);

CropperComponent.displayName = "Cropper";

export default CropperComponent;
