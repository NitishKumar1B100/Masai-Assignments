async function DeletedDataload(data = handleFilter()){
    console.log(data)
    if(!data) return

    const tbody = document.querySelector('.deletedDataBox #showDeletedData tbody');
    
    tbody.innerHTML = ''

    data.forEach((item, index) => {
        const trTag = document.createElement('tr')
        trTag.innerHTML = `
        <td>${item.title}</td>
        <td id="${item.priority}">${item.priority}</td>
        <td>${statusCode[item.status % statusCode.length]}</td>
        <td id="restore"><button onClick="handleRestoration(${item.id})">restore</button></td>
        <td id="remove"><button onClick="handleDeletion(${item.id})">delete</button></td>`;

        tbody.appendChild(trTag)
    })
}

function handleRestoration(taskId){
    const data = getData('DeletedTaskManager')

    const restoreData = data.find(item => item.id == taskId)

    const newData = EditData(data, taskId)
    
    setData('DeletedTaskManager', newData)
    DeletedDataload()
    sentBackdata(restoreData)
}

function handleDeletion(id){
    const data = getData('DeletedTaskManager')

    if(!data) return
    
    const newData = EditData(data, id)

    setData('DeletedTaskManager', newData)
    DeletedDataload()
}

function EditData(data, taskId){
    const newData = data.filter(item => item.id !== taskId)
    return newData
}

function sentBackdata(data){
    const Addedata = getData('AddTaskManager')

    console.log(data)
    if(!Addedata.length || Addedata[0].timeStamp <= data.timeStamp){
        Addedata.unshift(data)
    }else if(Addedata[Addedata.length - 1].timeStamp >= data.timeStamp){
        Addedata.push(data)
    }else{
        for(let i = 0; i < Addedata.length - 1; i++){
            if(Addedata[i].timeStamp >= data.timeStamp && data.timeStamp > Addedata[i+1].timeStamp){
                Addedata.splice(i+1, 0, data)
                break
            }
        }
    }
    setData('AddTaskManager', Addedata)
}

function handleFilter(){
    const status = document.getElementById('deleted_status')
    const priority = document.getElementById('deleted_priority')

    const data = getData('DeletedTaskManager')

    let newData = []
    
    if(status.value !== 'null' && priority.value !== 'null'){
        newData = data.filter(item => statusCode[item.status % statusCode.length] === status.value && item.priority === priority.value)
        // console.log(priority.value, status.value)
    }else{
        if(status.value !== 'null'){
            newData = data.filter(item => statusCode[item.status % statusCode.length] === status.value)
            // console.log(status.value)
        }else if(priority.value !== 'null'){
            newData = data.filter(item => item.priority === priority.value)
            //console.log(priority.value)
        }else{
            newData = data
            //console.log(status.value, priority.value)
        }
    }

    DeletedDataload(newData)

}


function setData(storageId, data){
    return localStorage.setItem(storageId, JSON.stringify(data))
}
function getData(storageId){
    return JSON.parse(localStorage.getItem(storageId)) || []
}
