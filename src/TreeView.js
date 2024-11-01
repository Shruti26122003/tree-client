import React, { useState, useEffect } from "react";
import axios from "axios";

// Recursive component to render each tree node
const TreeNode = ({ node }) => (
  <li>
    {node.name}
    {node.children && node.children.length > 0 && (
      <ul>
        {node.children.map(child => (
          <TreeNode key={child._id} node={child} />
        ))}
      </ul>
    )}
  </li>
);

const TreeView = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/tree");
        setTreeData(response.data);
      } catch (error) {
        console.error("Error fetching tree data:", error);
      }
    };

    fetchTreeData();
  }, []);

  return (
    <div>
      <h1>Category Tree</h1>
      <ul>
        {treeData.map((node) => (
          <TreeNode key={node._id} node={node} />
        ))}
      </ul>
    </div>
  );
};

export default TreeView;
