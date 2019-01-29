import React from "react";

type Prop = {
  active: boolean,
  children: React.ReactNode,
  onClick: () => void
};

const Link = ({ active, children, onClick }: Prop) => (
  <button
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: "4px"
    }}
  >
    {children}
  </button>
);

export default Link;
