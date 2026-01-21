import GroupsLayout from "../layouts/GroupsLayout";
import ActionCard from "../components/ui/ActionCard";
import GroupCard from "../components/ui/GroupCard";
import CreateGroupModal from "../components/modals/CreateGroupModal";
import JoinGroupModal from "../components/modals/JoinGroupModal";
import { Modal } from "bootstrap";

export default function Groups() {
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
              onClick={() => {
                const modalEl = document.getElementById("createGroupModal");
                const modal = new Modal(modalEl);
                modal.show();
              }}
            />

          </div>

          <div className="col-md-6">
            <ActionCard
              title="Join Group"
              subtitle="Enter using a group code"
              icon="group_add"
              color="#d4af37"
              onClick={() => {
                const modalJoin = document.getElementById("joinGroupModal");
                const modal2 = new Modal(modalJoin);
                modal2.show();
              }}
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
        <CreateGroupModal onSubmit={(data) => console.log(data)} />
        <JoinGroupModal onSubmit={(data) => console.log(data)} />

      </div>
    </GroupsLayout>
  );
}
