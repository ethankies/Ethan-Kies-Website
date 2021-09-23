
const url = "https://api.nytimes.com/svc/mostpopular/v2/shared/7.json?api-key=Ve34uujjZpYTSsOFFSE0PHFINRrWvluA";

let headlines = document.getElementById("header");

//get json
console.log("loading articles...")
fetch(url)
.then(response => response.json())
.then(data => {
 //   console.log(data)
    data.results.map(article =>{
      console.log(data)
        //a
        let a = document.createElement('a');
        a.setAttribute('href',article.url)
        a.innerHTML = article.title;
       
        
        //p
        let p = document.createElement("p");
        p.innerHTML = article.abstract

        //img
        let img = document.createElement('img')
        if(article.media.length > 0 ){
          
            img.src = article.media[0]["media-metadata"][2].url
           
    
        } else {
            img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        }
       
        //order in which they are dispplayed
        headlines.appendChild(a);
        headlines.appendChild(img);
        headlines.appendChild(p);
        
    })
})



