import { apiRequest } from "./http";

export async function extractorAPI(file) {
  const formData = new FormData();
  formData.append("file", file); // must match multer.single("file")

  return apiRequest("/extractor/file", {
    method: "POST",
    body: formData,
  });
}
export async function summarizerAPI(id){
  return apiRequest(`/summarizer/${id}`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
}