export default function(arrayOfPhoto = [], action){
    if(action.type === 'cloud'){
        return [...arrayOfPhoto, action.imgFromCloud]
    }else{
        return arrayOfPhoto
    }
}