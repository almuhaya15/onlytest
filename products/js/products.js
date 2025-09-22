const categoryLinks = document.querySelectorAll(".sidebar a");
const productsGrid = document.getElementById("productsGrid");
const pagination = document.getElementById("pagination");
const itemsPerPage = 12;

let currentCategory = "all";
let currentPage = 1;

// ارجع كل المنتجات (بدون اخفاء)
const allProducts = Array.from(productsGrid.children);

// فلترة حسب الكاتيجوري
function filterProducts(category) {
  currentCategory = category;
  currentPage = 1;
  // ارجع الباجينيشن للظهور
  updatePagination();
  showPage(currentPage);
}

// ارجع المنتجات التي تنتمي للفئة الحالية
function getFilteredProducts() {
  return allProducts.filter(p => {
    if (currentCategory === "all") return true;
    return p.querySelector(".product-card").classList.contains(currentCategory);
  });
}

// عرض صفحة معينة
function showPage(page) {
  currentPage = page;
  const filteredProducts = getFilteredProducts();
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  filteredProducts.forEach((p, i) => {
    p.style.display = (i >= start && i < end) ? "block" : "none";
  });

  // اخفاء المنتجات غير المختارة من الفئة
  allProducts.forEach(p => {
    if (!filteredProducts.includes(p)) p.style.display = "none";
  });

  updatePagination();
}

// تحديث أزرار الباجينيشن مع Prev / Next
function updatePagination() {
  const filteredProducts = getFilteredProducts();
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  pagination.innerHTML = "";

  if (pageCount <= 1) return; // لا حاجة للباجينيشن إذا صفحة واحدة

  // زر Prev
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => showPage(currentPage - 1));
  pagination.appendChild(prevBtn);

  // أزرار الأرقام
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => showPage(i));
    pagination.appendChild(btn);
  }

  // زر Next
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === pageCount;
  nextBtn.addEventListener("click", () => showPage(currentPage + 1));
  pagination.appendChild(nextBtn);
}

// عند اختيار كاتيجوري
categoryLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    categoryLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    filterProducts(link.getAttribute("data-category"));
  });
});

// أول مرة عرض
filterProducts("all");
