
document.getElementById("displayBtn").addEventListener("click", function(){
    let allText=document.querySelector(".allText")
    
    if(allText.style.display== "none"){
        allText.style.display = "block";
        displayBtn.textContent="Restrange articolul"
    }
else{
    allText.style.display = "none";
    displayBtn.textContent = "Citeste tot articolul";
}
})

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  