const apiKey = import.meta.env.VITE_API_KEY

const button=document.querySelector("button")
const video = document.getElementById("video")
video.style.display = "none"

button.addEventListener('click', function(){
  const dateValue = document.getElementById("date").value
  console.log(dateValue)
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateValue}`)

  .then(res => {
    if(!res.ok){
      throw new Error(`HTTP error! ${res.status}`)
    }
    return res.json()
})
  .then(data => {
    console.log(data)
    document.getElementById('title').innerText = data.title
    
    if(data.media_type === "image"){
      document.getElementById('content').style.display = "flex"
      document.getElementById('explanation').innerText = data.explanation
      document.getElementById('image').src = data.url
      document.getElementById('contentVideo').style.display = "none"
    }
    else if(data.media_type === "video"){
      video.style.display = "block"
      document.getElementById('explanationVideo').innerText = data.explanation
      document.getElementById('contentVideo').style.display = "flex"
      document.getElementById('video').src = data.url
      document.getElementById('content').style.display = "none"
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation', error.message)
  })
})