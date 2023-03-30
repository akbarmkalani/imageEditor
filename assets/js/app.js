const fileInput = document.querySelector(".file-input"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  rotateOptions = document.querySelectorAll(".rotate li"),
  previewImg = document.querySelector(".preview-img img"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  chooseImgBtn = document.querySelector(".choose-img"),
  saveImgBtn = document.querySelector(".save-img");

console.log(filterOptions);

let brightness = "100",
    saturetion = "100",
    inversion = "0",
    grayscale = "";

    //console.log(brightness);
     let rotate = 0, 
         flipHorizontal = 1, 
         flipVertical = 1;


    /* loadImg fucntion */

    const loadImage = ()=>{
        let file = fileInput.files[0];
        if (!file) return;
        previewImg.src = URL.createObjectURL(file);
        previewImg.addEventListener("load", () => {
          resetFilterBtn.click();
          document.querySelector(".container").classList.remove("disable");
        });
    }


/* applyFilter ======== */

    const applyFilter = () => {
        previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
        previewImg.style.filter = `brightness(${brightness}%) saturate(${saturetion}%) invert(${inversion}%) grayscale(${grayscale}%)`;
      };

      // fliterOptions 


      filterOptions.forEach((option) =>{
        option.addEventListener('click', () =>{
            document.querySelector(".active").classList.remove("active")
            option.classList.add('active')
            filterName.innerText = option.innerText

            if(option.id === "brightness"){
                filterSlider.max = "200"
                filterSlider.value = brightness
                filterSlider.innerText = `${brightness}%`
            } else if (option.id == "saturation"){
               // console.log(option.id);
                   filterSlider.max = "200"
                   filterSlider.value = saturetion
                   filterSlider.innerText = `${saturetion}%`
            }  else if (option.id == "inversion"){
                  // console.log(option.id);
                filterSlider.max = "100"
                filterSlider.value = inversion
                filterSlider.innerText = `${inversion}%`
           } else  {
           // console.log(option.id);
               filterSlider.max = "100"
               filterSlider.value = grayscale
               filterSlider.innerText = `${grayscale}%`
          }

        })

      })


      // UpdateFilter 

      const updateFilter = () =>{
         filterValue.innerText = `${filterSlider.value}%`

         const selectedFilter = document.querySelector('.filter .active')

        // console.log(selectedFilter);
        if(selectedFilter.id === "brightness"){
            brightness = filterSlider.value
        } else if ( selectedFilter.id === 'saturation'){
            saturetion = filterSlider.value
        } else if ( selectedFilter.id === 'inversion'){
            inversion = filterSlider.value
        } else{
            grayscale = filterSlider.value
        }
        applyFilter()
      }

  // rotate Option 


  rotateOptions.forEach((options) =>{
    options.addEventListener("click", () =>{
        if(options.id === "letf"){
            rotate -= 90
        } else if(options.id === "right"){
            rotate += 90
        } else if(options.id === "horizontal"){
           flipHorizontal = flipHorizontal === 1 ? -1 : 1
        } else{
            flipVertical = flipVertical === 1 ? -1 : 1
        }

        applyFilter()
    })
  })

  


  // resetfilter 

  const resetFilter = () =>{
    brightness = "100"
    saturetion = "100"
    inversion = " 0"
    grayscale = "0"
     flipHorizontal = 1
      flipVertical = 1 
      filterOptions[0].click()
      applyFilter()
  }


  ///saveImage 


  const saveImage = () =>{
    const canvas = document.createElement("canvas")
       // console.log(canvas);
       const ctx  = canvas.getContext("2d")
     
       canvas.width = previewImg.clientWidth
       canvas.height = previewImg.clientHeight

       //==
       ctx.filter = `brightness(${brightness}%) saturate(${saturetion}%) invert(${inversion}%) grayscale(${grayscale}%)`
       ctx.translate(canvas.width / 2, canvas.height / 2)
       if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180)
      }
      ctx.scale(flipHorizontal, flipVertical)
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height

 
  )

  const link = document.createElement("a");
  link.download ="image.jpg";
  link.href = canvas.toDataURL();
  link.click();
 // console.log(link.href);
  }

      
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

      