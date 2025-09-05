const categoryContainer = document.getElementById("categoryContainer");


// 1) loading catagorys
const loadCatagory = () => {

  fetch('https://news-api-fs.vercel.app/api/categories')
  .then(res => res.json())
  .then(data => {
      const categories = data.categories;
      showCategory(categories)



  })

  .catch( err => console.log(err))

}
loadCatagory()
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

const showCategory = (arryOfCatagories) => {

      arryOfCatagories.forEach((categorie) => {
    categoryContainer.innerHTML += `
            <li id="${categorie.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${categorie.title}</li>
        `;
  });

}


