function fetchUserData(hasError){
    return new Promise((resolve, reject) => {
        if (hasError === false){
            setTimeout(() => {
                resolve({id: 1, name: 'Алексей'})    
            }, 1000)
        }
        else{
            reject(new Error('Ошибка загрузки данных'))
        }
    })
}

async function resultFunc() {
    try{
        const func = await fetchUserData(true);
        console.log(func)
    }
    catch(error)
    {
        console.error('Прехвачено:', error.message)   
    }
}


resultFunc()