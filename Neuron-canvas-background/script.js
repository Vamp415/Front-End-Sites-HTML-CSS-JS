// <====================  Canvas Start ====================>
const canvas = document.getElementById("neuronCanvas");
const ctx = canvas.getContext("2d");

function setCanvasSize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

setCanvasSize(); // Set initial canvas size

// Function to adjust nodes based on screen size
function getAdjustedSettings() {
  if (width > 1150) {
    return { numNodes: 70, maxDistance: 150 }; // Large screens
  } else if (width > 768) {
    return { numNodes: 50, maxDistance: 120 }; // Medium screens
  } else if (width > 540) {
    return { numNodes: 30, maxDistance: 100 }; // Small tablets
  } else {
    return { numNodes: 40, maxDistance: 80 }; // Mobile screens
  }
}

let { numNodes, maxDistance } = getAdjustedSettings();
const nodes = [];

// Create nodes with random positions, velocities, and sizes
function createNodes() {
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2, // Velocity in x direction
      vy: (Math.random() - 0.5) * 2, // Velocity in y direction
      radius: Math.random() * 3 + 1, // Random node size between 1 and 4
    });
  }
}

createNodes(); // Create initial nodes

function draw() {
  // Clear the canvas for redrawing
  ctx.clearRect(0, 0, width, height);

  nodes.forEach((node, index) => {
    // Draw each node (dot)
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#d3d3d3"; // Light grey color for nodes
    ctx.fill();

    // Draw lines between nearby nodes
    for (let j = index + 1; j < numNodes; j++) {
      const node2 = nodes[j];
      const distance = Math.hypot(node.x - node2.x, node.y - node2.y);

      // Only draw lines if nodes are close enough (adjusted distance)
      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node2.x, node2.y);
        ctx.strokeStyle = `rgba(211, 211, 211, ${1 - distance / maxDistance})`; // Light grey color for lines
        ctx.stroke();
      }
    }

    // Update node positions based on velocity
    node.x += node.vx;
    node.y += node.vy;

    // Reverse direction if the node hits a boundary (bounce effect)
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;
  });

  // Loop the draw function
  requestAnimationFrame(draw);
}

// Start the animation
draw();

// Handle window resizing
window.addEventListener("resize", () => {
  setCanvasSize(); // Update canvas size
  ({ numNodes, maxDistance } = getAdjustedSettings()); // Recalculate nodes and distance
  nodes.length = 0; // Clear the old nodes
  createNodes(); // Create new nodes
});
// <====================  Canvas End ====================>
