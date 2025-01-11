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
<i class="fas fa-eye"></i> See Details
</button>
<button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
<i class="fas fa-trash-alt"></i></button>
    </td>`;
  clientTable.appendChild(row);
});

// Dashboard

let currentListId = "";
let editingIndex = null;

function handleDocumentUpload(containerId) {
  const input = event.target;
  const container = document.getElementById(containerId);
  const file = input.files[0];

  if (file) {
    const div = document.createElement("div");
    div.className = "flex items-center justify-between bg-gray-100 p-2 rounded";
    div.innerHTML = `
        <p class="truncate w-3/4">${file.name}</p>
        <button class="text-red-500" onclick="this.parentElement.remove()">🗑️</button>
      `;
    container.appendChild(div);
    input.value = "";
  }
}

function openPopup(listId, index = null) {
  currentListId = listId;
  editingIndex = index;
  const popupModal = document.getElementById("popupModal");
  const form = document.getElementById("popupForm");
  if (index !== null) {
    const list = document.getElementById(listId);
    const item = list.children[index];
    const name = item.querySelector(".recipient-name").innerText;
    const mobile = item.querySelector(".recipient-mobile").innerText;
    const email = item.querySelector(".recipient-email").innerText;
    form.recipientName.value = name;
    form.recipientMobile.value = mobile;
    form.recipientEmail.value = email;
  } else {
    form.reset();
  }
  popupModal.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popupModal").classList.add("hidden");
  currentListId = "";
  editingIndex = null;
}

document.getElementById("popupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = this.recipientName.value;
  const mobile = this.recipientMobile.value;
  const email = this.recipientEmail.value;

  const list = document.getElementById(currentListId);
  if (editingIndex !== null) {
    const item = list.children[editingIndex];
    item.querySelector(".recipient-name").innerText = name;
    item.querySelector(".recipient-mobile").innerText = mobile;
    item.querySelector(".recipient-email").innerText = email;
  } else {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between space-x-2 bg-gray-100 p-2 rounded";
    li.innerHTML = `
        <div>
          <p class="recipient-name font-semibold">${name}</p>
          <p class="recipient-mobile text-sm text-gray-600">${mobile}</p>
          <p class="recipient-email text-sm text-gray-600">${email}</p>
        </div>
        <div class="space-x-2">
          <button class="text-blue-500" onclick="openPopup('${currentListId}', ${list.children.length})">Edit</button>
          <button class="text-red-500" onclick="deleteRecipient('${currentListId}', ${list.children.length})">Delete</button>
        </div>
      `;
    list.appendChild(li);
  }
  closePopup();
});

function deleteRecipient(listId, index) {
  const list = document.getElementById(listId);
  list.removeChild(list.children[index]);
}

// Dropdown toggle
const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");
dropdownButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

