
import GroupsLayout from "../layouts/GroupsLayout";
import ActionCard from "../components/ui/ActionCard";
import GroupCard from "../components/ui/GroupCard";

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
              variant="primary"
            />
          </div>
          <div className="col-md-6">
            <ActionCard
              title="Join Group"
              subtitle="Enter using an invite code"
              icon="group_add"
              variant="secondary"
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
      </div>
    </GroupsLayout>
  );
}
