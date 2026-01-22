// Gerenciamento de Usuários

// Criar usuário
document
  .getElementById("createUserForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ " + data.message);
        location.reload();
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      alert("❌ Erro ao criar usuário: " + error.message);
    }
  });

// Editar usuário
function editUser(id, name, email) {
  document.getElementById("editUserId").value = id;
  document.getElementById("editName").value = name;
  document.getElementById("editEmail").value = email;
  document.getElementById("editModal").style.display = "block";
}

// Salvar edição
document
  .getElementById("editUserForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("editUserId").value;
    const formData = {
      name: document.getElementById("editName").value,
      email: document.getElementById("editEmail").value,
    };

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ " + data.message);
        location.reload();
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      alert("❌ Erro ao atualizar usuário: " + error.message);
    }
  });

// Deletar usuário
async function deleteUser(id) {
  if (!confirm("Tem certeza que deseja deletar este usuário?")) {
    return;
  }

  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      alert("✅ " + data.message);
      location.reload();
    } else {
      alert("❌ " + data.message);
    }
  } catch (error) {
    alert("❌ Erro ao deletar usuário: " + error.message);
  }
}

// Fechar modal
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("editModal").style.display = "none";
});

// Fechar modal ao clicar fora
window.addEventListener("click", (e) => {
  const modal = document.getElementById("editModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
