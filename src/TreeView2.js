import React, { useState, useEffect } from "react";
import axios from "axios";
import './TreeView2.css'; // Adjust the path as necessary

// Recursive component to render each tree node with expand/collapse functionality
const TreeNode = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <li className="tree-node">
      <div onClick={toggleExpand} className="tree-node-label">
        {/* Add a plus/minus indicator for expand/collapse */}
        {node.children && node.children.length > 0 && (
          <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        {node.name}
      </div>

      {/* Show children only if the node is expanded */}
      {isExpanded && node.children && node.children.length > 0 && (
        <ul className="nested-tree">
          {node.children.map((child) => (
            <TreeNode key={child._id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = () => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/tree");
        setTreeData(response.data);
      } catch (error) {
        setError("Error fetching tree data");
        console.error("Error fetching tree data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="tree-container">
      <h2>Tree Structure in MongoDB</h2>
      <ul>
        {treeData.map((node) => (
          <TreeNode key={node._id} node={node} />
        ))}
      </ul>
    </div>
  );
};

export default TreeView;
