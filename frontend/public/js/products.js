// Gerenciamento de Produtos

// Criar produto
document
  .getElementById("createProductForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      price: parseFloat(document.getElementById("price").value),
      stock: parseInt(document.getElementById("stock").value),
    };

    try {
      const response = await fetch("/api/products", {
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
      alert("❌ Erro ao criar produto: " + error.message);
    }
  });

// Editar produto
function editProduct(id, name, description, price, stock) {
  document.getElementById("editProductId").value = id;
  document.getElementById("editName").value = name;
  document.getElementById("editDescription").value = description;
  document.getElementById("editPrice").value = price;
  document.getElementById("editStock").value = stock;
  document.getElementById("editModal").style.display = "block";
}

// Salvar edição
document
  .getElementById("editProductForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("editProductId").value;
    const formData = {
      name: document.getElementById("editName").value,
      description: document.getElementById("editDescription").value,
      price: parseFloat(document.getElementById("editPrice").value),
      stock: parseInt(document.getElementById("editStock").value),
    };

    try {
      const response = await fetch(`/api/products/${id}`, {
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
      alert("❌ Erro ao atualizar produto: " + error.message);
    }
  });

// Deletar produto
async function deleteProduct(id) {
  if (!confirm("Tem certeza que deseja deletar este produto?")) {
    return;
  }

  try {
    const response = await fetch(`/api/products/${id}`, {
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
    alert("❌ Erro ao deletar produto: " + error.message);
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
