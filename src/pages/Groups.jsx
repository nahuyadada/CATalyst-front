import GroupsLayout from "../layouts/GroupsLayout";
import ActionCard from "../components/ui/ActionCard";
import GroupCard from "../components/ui/GroupCard";
import CreateGroupModal from "../components/modals/CreateGroupModal";
import JoinGroupModal from "../components/modals/JoinGroupModal";
import FeedbackModal from "../components/modals/FeedbackModal";
import { useFeedbackModal } from "../hooks/useFeedbackModel";
import { Modal } from "bootstrap";
import { useState, useEffect } from "react";
import { createGroup as createGroupAPI, joinGroupAPI,getGroupsByUserIdAPI } from "../api/group.api";
import { useAuth } from "../context/AuthContext";

import { IoIosAddCircle } from "react-icons/io";
import { FaLink } from "react-icons/fa";

export default function Groups() {
  const id = useAuth().user.id;

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.log("wompppp", newGroup);
      const normalized = {
        id: newGroup.data.id,
        name: newGroup.data.name,
        members: newGroup.data.members ?? 1,
        color: newGroup.data.color,
      };
      
      setGroups((prev) => [normalized, ...prev]);

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
    useEffect(() => {
        async function fetchGroups() {
          try {
            const groups = await getGroupsByUserIdAPI(id);
            console.log(groups.groups.data)
            setGroups(groups.groups.data);
          } catch (err) {
            console.error("Failed to fetch groups:", err);
          } finally {
            setLoading(false);
          }
        }

        fetchGroups();
      }, [id]);


  return (
    <GroupsLayout>
      <div className="py-4">

        {/* Action Buttons */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <ActionCard
              title="Create Group"
              subtitle="Start a new research workspace"
              icon= {<IoIosAddCircle size={24} />}
              color="#7a1e1e"
              onClick={() => openModal("createGroupModal")}
            />

          </div>

          <div className="col-md-6">
            <ActionCard
              title="Join Group"
              subtitle="Enter using a group code"
              icon={<FaLink size={24} />}
              color="#d4af37"
              onClick={() => openModal("joinGroupModal")}

            />
          </div>
        </div>

        {/* Groups List */}
        
{/* ========================== */}
      <h5 className="fw-bold mb-3">GROUPS</h5>
        <div className="row g-4">
          {loading ? (
            <p>Loading groups...</p>
          ) : groups.length === 0 ? (
            <p className="text-muted">You are not part of any groups yet.</p>
          ) : (
            groups.map((group) => (
              <div className="col-md-4" key={group.id}>
                <GroupCard
                  name={group.name}
                  members={group.members}
                  color={group.color}
                  group_id = {group.id}
                />
              </div>
            ))
          )}
        </div>



        {/* Modals (mounted once) */}
        <CreateGroupModal onSubmit={handleCreateGroup} />
        <JoinGroupModal onSubmit={handleJoinGroup} />
        <FeedbackModal { ...config }/>

      </div>
    </GroupsLayout>
  );
}
