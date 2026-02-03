import { apiRequest } from "../api/http";

export async function createGroup(data) {
  return apiRequest("/groups/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export async function joinGroupAPI(data) {
    // console.log("Joining group with data:", data);
  return apiRequest("/groups/join", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export async function getGroupsByUserIdAPI(userId) {
  return apiRequest(`/groups/${userId}`, {
    method: "GET",
  });
}
