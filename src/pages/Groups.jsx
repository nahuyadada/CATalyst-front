import GroupsLayout from "../layouts/GroupsLayout";
import ActionCard from "../components/ui/ActionCard";
import GroupCard from "../components/ui/GroupCard";
import CreateGroupModal from "../components/modals/CreateGroupModal";
import JoinGroupModal from "../components/modals/JoinGroupModal";
import FeedbackModal from "../components/modals/FeedbackModal";
import { useFeedbackModal } from "../hooks/useFeedbackModel";
import { Modal } from "bootstrap";
import { useState } from "react";
import { createGroup as createGroupAPI, joinGroupAPI } from "../api/group.api";
import { useAuth } from "../context/AuthContext";

export default function Groups() {
  const id = useAuth().user.id;
  const [groups, setGroups] = useState([
    { id: 1, name: "Dev Team", members: 34, color: "#7a1e1e" },
    { id: 2, name: "Research Cohort A", members: 12, color: "#d4af37" },
    { id: 3, name: "Thesis Group", members: 5, color: "#1e40af" },
  ]);
  const { config, showFeedback } = useFeedbackModal();
  const openModal = (modalId) => {
    const modalEl = document.getElementById(modalId);
    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
    modal.show();
  };
  async function handleCreateGroup(data) {
    const groupData = {
      ...data,
      ownerId: id,
    };
    try {
      console.log("Creating group with data:", groupData);
      const newGroup = await createGroupAPI(groupData);
      console.log("wompppp");
      setGroups((prev) => [newGroup, ...prev]);

      const modalEl = document.getElementById("createGroupModal");
      const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
      modal.hide();
      showFeedback({
        type: "success",
        title: "Group Created",
        message: "Your research workspace is ready.",
      });

      console.log("Group created:", newGroup);
    } catch (err) {
      console.error("Failed to create group:", err);
      showFeedback({
        type: "error",
        title: "Group Creation Failed",
        message: err.message || "Something went wrong.",
      });
    }
  }
  async function handleJoinGroup(data) {
    const joinData = {
      ...data,
      userId: id,
    };
    console.log("Join data:", joinData);
    try {
      const joinedGroup = await joinGroupAPI(joinData);

      setGroups((prev) => [joinedGroup, ...prev]);

      const modalEl = document.getElementById("joinGroupModal");
      const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
      modal.hide();

      showFeedback({
        type: "success",
        title: "Request Sent",
        message: "You have now sent a request to join the group.",
      });

      console.log("Joined group:", joinedGroup);

    } catch (err) {
      console.error("Failed to send a request to group:", err);

      showFeedback({
        type: "error",
        title: "Join Failed",
        message: err.message || "Invalid code or request failed.",
      });
    }
  }

  return (
    <GroupsLayout>
      <div className="py-4">

        {/* Action Buttons */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <ActionCard
              title="Create Group"
              subtitle="Start a new research workspace"
              icon="add_circle"
              color="#7a1e1e"
              onClick={() => openModal("createGroupModal")}
            />

          </div>

          <div className="col-md-6">
            <ActionCard
              title="Join Group"
              subtitle="Enter using a group code"
              icon="group_add"
              color="#d4af37"
              onClick={() => openModal("joinGroupModal")}

            />
          </div>
        </div>

        {/* Groups List */}
        <h5 className="fw-bold mb-3">GROUPS</h5>

        <div className="row g-4">
          <div className="col-md-4">
            <GroupCard name="Dev Team" members={34} />
          </div>
          <div className="col-md-4">
            <GroupCard name="Research Cohort A" members={12} />
          </div>
          <div className="col-md-4">
            <GroupCard name="Thesis Group" members={5} />
          </div>
        </div>

        {/* Modals (mounted once) */}
        <CreateGroupModal onSubmit={handleCreateGroup} />
        <JoinGroupModal onSubmit={handleJoinGroup} />
        <FeedbackModal { ...config }/>

      </div>
    </GroupsLayout>
  );
}
