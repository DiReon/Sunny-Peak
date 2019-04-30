function moveSlide(event) {
    const list = event.target.parentElement.parentElement;
    let index = event.target.parentElement.getAttribute('data-slide-to');
    for (let i=0; i<list.children.length;i++) {
        if (list.children[i].classList.contains('active')) {
            console.log('Yes, contains ', i)
            var indexActive = i;
            list.children[i].classList.remove('active');
        }
    }
    list.children[index].classList.add('active');
    console.log('indexActive ', indexActive);
    
    let position=0;
    if (list.style.marginLeft) position = parseFloat(list.style.marginLeft);
    const imgWidth = list.children[0].children[0].offsetWidth;
    const galleryWidth = list.parentElement.offsetWidth;
    const maxRightCoord = -imgWidth*(list.children.length+1) + galleryWidth;
    console.log('MaxRightCoord ', maxRightCoord);
    console.log('Gallery Width: ', galleryWidth, '  Image Width: ', imgWidth);
    if (index > indexActive) {
        position = position - imgWidth;        
    } else position = position + imgWidth;
    console.log('position: ', position);
    if (position>0) {
        position = 0;
    }
    if (position<maxRightCoord)  {
        position = maxRightCoord;
    }
    list.style.marginLeft = position + 'px'; 
    
}