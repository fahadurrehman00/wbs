// Dashboard
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const toggleArrow = document.getElementById("toggleArrow");
const sidebarText = document.querySelectorAll(".sidebar-text");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("w-64");
  sidebar.classList.toggle("w-16");

  toggleArrow.classList.toggle("rotate-180");

  sidebarText.forEach((text) => {
    text.classList.toggle("hidden");
  });
});

const dashboardContent = document.getElementById("dashboardContent");
const myAccountSection = document.getElementById("myAccountSection");
const dashboardLink = document.getElementById("dashboardLink");
const myAccountLink = document.getElementById("myAccountLink");

function switchTab(show, hide) {
  hide.classList.remove("active");
  setTimeout(() => {
    hide.classList.add("hidden");
    show.classList.remove("hidden");
    setTimeout(() => show.classList.add("active"), 10);
  }, 300);
}

dashboardLink.addEventListener("click", () => {
  switchTab(dashboardContent, myAccountSection);
});

myAccountLink.addEventListener("click", () => {
  switchTab(myAccountSection, dashboardContent);
});

// Edit profile functionality
const editProfileImage = document.getElementById("editProfileImage");
const fileInput = document.getElementById("fileInput");
const profileImage = document.getElementById("profileImage");
const editProfileButton = document.getElementById("editProfileButton");
const profileFields = document.querySelectorAll(
  "#profileFields input, #profileFields select"
);

editProfileImage.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImage.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

editProfileButton.addEventListener("click", () => {
  const isEditing = editProfileButton.textContent === "Edit";
  profileFields.forEach((field) => (field.disabled = !isEditing));
  editProfileButton.textContent = isEditing ? "Save" : "Edit";

  if (!isEditing) {
    // Save functionality - logic to save changes
    showToast("Profile updated successfully!");
  }

  // Show Toast

  function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toastContainer");

    // Create the toast element
    const toast = document.createElement("div");
    toast.classList.add("toast", type);
    toast.textContent = message;

    // Append the toast to the container
    toastContainer.appendChild(toast);

    // Automatically remove the toast after the animation is complete
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 3000); // Toast duration: 3 seconds
  }
});

const clients = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    mobile: "123-456-7890",
    joiningDate: "2023-01-15",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    mobile: "234-567-8901",
    joiningDate: "2023-02-20",
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    mobile: "345-678-9012",
    joiningDate: "2023-03-10",
  },
  {
    id: 4,
    firstName: "Diana",
    lastName: "Williams",
    email: "diana.williams@example.com",
    mobile: "456-789-0123",
    joiningDate: "2023-04-25",
  },
  {
    id: 5,
    firstName: "Evan",
    lastName: "Davis",
    email: "evan.davis@example.com",
    mobile: "567-890-1234",
    joiningDate: "2023-05-30",
  },
  {
    id: 5,
    firstName: "Evan",
    lastName: "Davis",
    email: "evan.davis@example.com",
    mobile: "567-890-1234",
    joiningDate: "2023-05-30",
  },
  {
    id: 5,
    firstName: "Evan",
    lastName: "Davis",
    email: "evan.davis@example.com",
    mobile: "567-890-1234",
    joiningDate: "2023-05-30",
  },
  {
    id: 5,
    firstName: "Evan",
    lastName: "Davis",
    email: "evan.davis@example.com",
    mobile: "567-890-1234",
    joiningDate: "2023-05-30",
  },
];

const clientTable = document.getElementById("clientTable");

clients.forEach((client) => {
  const row = document.createElement("tr");
  row.innerHTML = `<td class="border border-gray-300 p-2">${client.id}</td>
    <td class="border border-gray-300 p-2">${client.firstName}</td>
    <td class="border border-gray-300 p-2">${client.lastName}</td>
    <td class="border border-gray-300 p-2">${client.email}</td>
    <td class="border border-gray-300 p-2">${client.mobile}</td>
    <td class="border border-gray-300 p-2">${client.joiningDate}</td>
    <td class="border border-gray-300 p-2 items-center flex justify-center gap-4">
      <button class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
<i class="fas fa-eye"></i>
</button>
<button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
<i class="fas fa-trash-alt"></i></button>
    </td>`;
  clientTable.appendChild(row);
});