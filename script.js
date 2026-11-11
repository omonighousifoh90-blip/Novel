

/* =================================
   NOVELVERSE - JAVASCRIPT
================================= */

// NOVEL DATABASE

const novels = [
    {
        id: 1,
        title: "The Hidden Heart",
        author: "Alex Morgan",
        genre: "Romance",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        chapters: [
            {
                title: "Chapter 1 - The Beginning",
                text: "The rain fell softly against the window. Amelia stood alone, wondering whether life would ever bring her the happiness she had always dreamed of. Then came a knock at the door. Someone had returned after years away."
            },
            {
                title: "Chapter 2 - Unexpected Meeting",
                text: "The door opened slowly. Standing outside was Daniel, the person she had tried so hard to forget. Neither spoke for a moment. Some memories never truly disappear."
            }
        ]
    },

    {
        id: 2,
        title: "Kingdom of Shadows",
        author: "James Carter",
        genre: "Fantasy",
        cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
        chapters: [
            {
                title: "Chapter 1 - The Lost Kingdom",
                text: "Beyond the mountains stood a forgotten kingdom. Its towers had remained silent for centuries, until a young traveler discovered a mysterious glowing stone."
            },
            {
                title: "Chapter 2 - The Awakening",
                text: "The stone began to shine brighter. An ancient voice echoed through the valley, calling the traveler by a name nobody had spoken in generations."
            }
        ]
    },

    {
        id: 3,
        title: "The Last Mission",
        author: "David Stone",
        genre: "Action",
        cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500",
        chapters: [
            {
                title: "Chapter 1 - The Assignment",
                text: "At midnight, a message arrived. One final mission stood between Marcus and the truth he had been chasing for years."
            },
            {
                title: "Chapter 2 - The Chase",
                text: "Engines roared across the empty streets. Marcus knew he had only one chance to finish the mission."
            }
        ]
    },

    {
        id: 4,
        title: "Mystery of the Night",
        author: "Sarah Blake",
        genre: "Mystery",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        chapters: [
            {
                title: "Chapter 1 - The Secret",
                text: "Every night at exactly midnight, a light appeared in the abandoned house. Nobody knew who lived there, or why the light never went out."
            },
            {
                title: "Chapter 2 - The Discovery",
                text: "Curiosity finally overcame fear. Emma walked toward the old house, unaware that someone had been watching her."
            }
        ]
    }
];


// WEBSITE SETTINGS

let currentGenre = "All";
let currentBook = null;
let currentChapter = 0;

let favorites = JSON.parse(
    localStorage.getItem("favorites") || "[]"
);


// DISPLAY NOVELS

function displayBooks() {

    const search = document
        .getElementById("search")
        .value.toLowerCase();

    const filtered = novels.filter(book => {

        const matchesGenre =
            currentGenre === "All" ||
            book.genre === currentGenre;

        const matchesSearch =
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search);

        return matchesGenre && matchesSearch;
    });

    const grid = document.getElementById("bookGrid");

    grid.innerHTML = filtered.length
        ? filtered.map(book => `
            <div class="book">
                <img src="${book.cover}" alt="${book.title}">

                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p>${book.genre}</p>

                    <button onclick="openReader(${book.id})">
                        Read Novel
                    </button>

                    <button class="favorite"
                        onclick="toggleFavorite(${book.id})">
                        ${favorites.includes(book.id)
                            ? "♥ Saved"
                            : "♡ Add Favorite"}
                    </button>
                </div>
            </div>
        `).join("")
        : "<p>No novels found.</p>";

    displayFavorites();
}


// FILTER NOVELS

function filterBooks(genre, button) {

    currentGenre = genre;

    document.querySelectorAll(".filters button")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    displayBooks();
}


// ADD OR REMOVE FAVORITES

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(
            item => item !== id
        );

    } else {

        favorites.push(id);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    displayBooks();
}


// DISPLAY FAVORITES

function displayFavorites() {

    const grid = document.getElementById("favoriteGrid");

    const saved = novels.filter(
        book => favorites.includes(book.id)
    );

    grid.innerHTML = saved.length
        ? saved.map(book => `
            <div class="book">
                <img src="${book.cover}" alt="${book.title}">

                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>

                    <button onclick="openReader(${book.id})">
                        Read Novel
                    </button>

                    <button class="favorite"
                        onclick="toggleFavorite(${book.id})">
                        Remove Favorite
                    </button>
                </div>
            </div>
        `).join("")
        : "<p>You have no favorite novels yet.</p>";
}


// OPEN READING PAGE

function openReader(id) {

    currentBook = novels.find(
        book => book.id === id
    );

    currentChapter = 0;

    document.getElementById("reader").style.display = "block";

    showChapter();

    window.scrollTo(0, 0);
}


// SHOW CHAPTER

function showChapter() {

    const chapter = currentBook.chapters[currentChapter];

    document.getElementById("readerTitle").textContent =
        currentBook.title;

    document.getElementById("readerAuthor").textContent =
        "By " + currentBook.author;

    document.getElementById("chapterTitle").textContent =
        chapter.title;

    document.getElementById("chapterText").textContent =
        chapter.text;
}


// NEXT CHAPTER

function nextChapter() {

    if (
        currentChapter <
        currentBook.chapters.length - 1
    ) {

        currentChapter++;

        showChapter();

    } else {

        alert("You have reached the last chapter!");
    }
}


// PREVIOUS CHAPTER

function previousChapter() {

    if (currentChapter > 0) {

        currentChapter--;

        showChapter();
    }
}


// CLOSE READER

function closeReader() {

    document.getElementById("reader").style.display = "none";
}


// LOGIN MODAL

function openLogin() {

    document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {

    document.getElementById("loginModal").style.display = "none";
}


// DEMO LOGIN

function login() {

    const username = document
        .getElementById("username")
        .value.trim();

    const password = document
        .getElementById("password")
        .value;

    const message = document.getElementById("loginMessage");

    if (!username || !password) {

        message.textContent = "Please fill in all fields.";

        return;
    }

    message.textContent =
        "Demo only! Connect Firebase or Supabase for real account registration and login.";
}


// INITIALIZE WEBSITE

document.addEventListener("DOMContentLoaded", function() {

    displayBooks();

    console.log("NovelVerse website loaded successfully!");

});
  
