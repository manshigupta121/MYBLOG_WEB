//run when page loads
window.onload = function() {
    displayBlogs(); // Call the function to display blogs
}

// when form is submitted
document.getElementById("blogform").addEventListener("submit", function(e){
    e.preventDefault(); // Prevent the default form submission
    
    // Get the values from the form
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    //get blogs from local storage (or initialize an empty array if not present)
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    //add new blog to the array 
    //changed
    const timestamp = new Date().toLocaleString();
    blogs.push({title, content, timestamp});
    //blogs.push({title,content});

    //save updated blogs array to local storage
    localStorage.setItem("blogs", JSON.stringify(blogs));

    //reload fn
    location.reload();

    //reset the form
    document.getElementById("blogform").reset();

    //display the updated blogs or refresh the blog list
    displayblog();


})

// Function to display blogs
function displayBlogs(){

    const bloglist = document.getElementById("bloglist");
    bloglist.innerHTML =""; // Clear the existing content

    // Get blogs from local storage
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    if (blogs.length === 0) {
        bloglist.innerHTML = "<p>No blogs available. Please create a blog.</p>";
        return; // Exit if no blogs are available
    }
    
    blogs.forEach((blog) => {

        const blogCard = document.createElement("div");
        blogCard.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <small>Posted on: ${blog.timestamp}</small>
        <button onclick="deleteBlog(${blogs.indexOf(blog)})">Delete</button>
        <button onclick="editBlog(${blogs.indexOf(blog)})">Edit</button>
        `;

        bloglist.appendChild(blogCard);

    });
}

//to delete and edit blogs

function deleteBlog(index) {
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.splice(index, 1); // Remove 1 item at index
  localStorage.setItem("blogs", JSON.stringify(blogs));
  displayBlogs();
}

function editBlog(index) {
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blog = blogs[index];

  // Prefill form
  document.getElementById("title").value = blog.title;
  document.getElementById("content").value = blog.content;

  // Remove original blog temporarily
  blogs.splice(index, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  displayBlogs();
}

