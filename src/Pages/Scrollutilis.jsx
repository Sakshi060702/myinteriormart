export const saveScrollPosition=(key)=>{
    const scrollPosition=window.scrollY;
sessionStorage.setItem(key,scrollPosition);};

export const restoreScrollPosition=(key)=>{
    const scrollPosition=sessionStorage.getItem(key);
    if(scrollPosition !==null){
        window.scrollTo(0,parseInt(scrollPosition,10));
    }
}