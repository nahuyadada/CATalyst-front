import { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export function GroupProvider({ children }) {
  const [groupId, setGroupId] = useState(null);

  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");

  const enterGroup = ({ id, name = "", color = "" }) => {
    setGroupId(id);
    setGroupName(name);
    setGroupColor(color);
  };

  const leaveGroup = () => {
    setGroupId(null);
    setGroupName("");
    setGroupColor("");
  };

  return (
    <GroupContext.Provider
      value={{ groupId, groupName, groupColor, enterGroup, leaveGroup }}
    >
      {children}
    </GroupContext.Provider>
  );
}

// custom hook
export function useGroup() {
  return useContext(GroupContext);
}
