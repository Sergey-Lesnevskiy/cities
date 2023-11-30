window.onload = function () {
  setTimeout(function () {
    document.body.classList.add("loaded");

    if (window.matchMedia("(min-width: 992px)").matches) {
      // If not mobile

      Draggable.create(".gallery", {
        bounds: "body",
        inertia: true,
      });
    }
    else {
      document.body.classList.remove("loaded")
    }
  }, 200);
// нужно переворачивать фото
  const photos = document.querySelector('.gallery')
  photos.addEventListener('click',(e)=>{
      if (e.target.closest('.gallery__item')) {
        console.log(Number(e.target.closest('div')?.dataset.photo));
    }

  })
};
