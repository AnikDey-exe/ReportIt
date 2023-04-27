export const search = (data, text) => {
   
    const newData = data.filter(item => {      
      const itemData = `${item.name} ${item.address}`.toUpperCase();
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    return newData
}