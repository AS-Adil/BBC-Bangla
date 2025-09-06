const categoryContainer = document.getElementById("categoryContainer");
const newsContainer = document.getElementById("newsContainer");
const bookmarkContainer = document.getElementById("bookmarkContainer");
const bookmarkCount = document.getElementById('bookmarkCount')
const newsDetailsModal = document.getElementById('news-details-modal')
const modalContainer = document.getElementById('modalContainer')

// 1) loading catagorys
const loadCatagory = () => {


  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
    })

    .catch((err) => console.log(err));
};
loadCatagory();
/* Example on Async await way
 const loadCatagoryAsync =async () =>{

    //  const res = await fetch('https://news-api-fs.vercel.app/api/categories')
    //  const data = await res.json()
    //  console.log(data); 

     try{
         const res = await fetch('https://news-api-fs.vercel.app/api/categories')
     const data = await res.json()
     console.log(data);
     }catch(error){
        console.log(error);
     }
   
 }


loadCatagoryAsync() */

// 2) showing category on nav
const showCategory = (arryOfCatagories) => {
  arryOfCatagories.forEach((categorie) => {
    categoryContainer.innerHTML += `
            <li id="${categorie.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${categorie.title}</li>
        `;
  });
};

//3) Active border 
// document.getElementById('main').classList.add('border-b-4')
categoryContainer.addEventListener("click", (e) => {
  if (e.target.localName === "li") {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });
  }

  if (e.target.localName === "li") {
    //   console.log(e.target.id);
    showLoading()
    e.target.classList.add("border-b-4");
    loadNewsByCategory(e.target.id);
  }
});


// 4) loading news by category
const loadNewsByCategory = (categoryId) => {
  //   console.log(categoryId);



  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      showNewsByCategory(data.articles);
    })
    .catch((err) => {
       showError()
    });
};

// showing every news to UI

const showNewsByCategory = (articles) => {
  
  // console.log(articles[0].image.srcset[5].url);

    if(articles.length === 0) {
        showEmptyMessage()
        // alert('No news found for this category!')
       return 
    }



  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    newsContainer.innerHTML += `
        <div class="border  border-gray-300 rounded-lg">
            <div>
             <img src="${article.image.srcset[5].url}"/>
            </div>
            <div id="${article.id}" class="p-2 text-justify">
                <h1 class="font-extrabold">${article.title}</h1>
            <p class="text-sm text-gray-400">${article.time}</p>
                <div class="flex flex-col items-center gap-1 mt-3">
                 <button class="btn whitespace-nowrap">Bookmark</button>
              <label for="my_modal_7" class="btn whitespace-nowrap">View Details</label>
                </div>
            </div>
        </div>
        `;
  });
};

// showNewsByCategory('main') // that's didn't worked beacuse "loadNewsCateory ()" load the news Categorywise then then "showNewsCategory()" sho it to ui

loadNewsByCategory('main')// to get main category loaded by deafult



 let bookmarks = []

newsContainer.addEventListener("click", (e) => {
  // console.log(e.target)
  // console.log(e.target.innerText)
  if (e.target.innerText === "Bookmark") {
    handleBookmarks(e);
  }

  if (e.target.innerText === "View Details") {
    handleViewDetails(e)
  }
});
const handleBookmarks = (e) => {
  const title = e.target.parentNode.parentNode.children[0].innerText;
  // console.log(title);
  const id = e.target.parentNode.parentNode.id;
  // console.log(id);

  bookmarks.push({
    title: title,
    id: id,
  });

  showBookmarks(bookmarks);
  
};

const showBookmarks = (bookmarks) => {
    console.log(bookmarks)
    bookmarkContainer.innerHTML = ""
    bookmarks.forEach(bookmark => {
      console.log(bookmark);
        bookmarkContainer.innerHTML += `
        <div class="border my-2 p-1">
            <h1>${bookmark.title}</h1>
            <button onclick="handleDeleteBookmark('${bookmark.id}')" class="btn btn-xs">Delete</button>
        </div>
        `
    })

    bookmarkCount.innerText = bookmarks.length
};


const handleDeleteBookmark = (bookmarkId) => {
   const filteredBookmarks =  bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
   bookmarks = filteredBookmarks // Re-assigning bookmarks arry with filteredBookmrks
   showBookmarks(bookmarks)

} 


const showLoading = () => {
    newsContainer.innerHTML = `
            <div class="rounded-xl bg-slate-200 h-[80vh] p-3 col-span-3 text-5xl">
          <h1
            class="w-full h-full flex justify-center items-center font-semibold font-serif"
          >
            Loading...
          </h1>
        </div>
    `
}


const showError = () => {
    newsContainer.innerHTML = `
            <div class="rounded-xl bg-slate-200 h-[80vh] p-3 col-span-3 text-5xl">
          <h1
            class="w-full h-full flex justify-center items-center font-semibold font-serif"
          >
            Error...
          </h1>
        </div>
    `
}


const showEmptyMessage = () => {
    newsContainer.innerHTML = `
            <div class="rounded-xl bg-slate-200 h-[80vh] p-3 col-span-3 text-5xl">
          <h1
            class="w-full h-full flex justify-center items-center font-semibold font-serif"
          >
            No news found...
          </h1>
        </div>
    `
}



      
const handleViewDetails = (e) =>{
  const id = (e.target.parentNode.parentNode.id);
  console.log(id);


  fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
  .then(res =>res.json())
  .then(data =>{
    modalDetails(data.article);
  })






}


const modalDetails = (Details) =>{

  console.log(Details);
      document.getElementById('modalDetails').innerHTML = `
            <h1 class="text-xl font-bold mb-2" >${Details.title}</h1>
            <img class ="rounded-lg" src="${Details.images[0].url}"/>
            <p>${Details.content.join("")}</p>
    `
    



}


