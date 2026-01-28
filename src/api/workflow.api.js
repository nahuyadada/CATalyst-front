import { apiRequest } from "./http";

export async function extractorAPI(file) {
  const formData = new FormData();
  formData.append("file", file); // must match multer.single("file")

  return apiRequest("/extractor/file", {
    method: "POST",
    body: formData,
  });
}
