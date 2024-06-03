// function loadData(data){
//     const data = JSON.parse(localStorage.getItem('AddTaskManager')) || []

//     if(!data) return

//     const tBody = document.querySelector('.Home #tableOne tbody')
//     console.log(tBody)
//     data.forEach((item, index)=>{
//         const trTag = document.createElement('tr')

//         trTag.innerHTML= `
//                 <td>${item.title}</td>
//                 <td>${item.status}</td>
//                 <td>${item.priority}</td>
//                 <td id="remove"><button>remove</button></td>
//                 `;
        
//         console.log(tBody)
       
//     })

// }

const statusCode = ['pending','in-progress', 'complete']

function handleData(){
    const taskName = document.getElementById('task')
    const priority = document.getElementById('priority')

    const data = getData('AddTaskManager')

    if(!taskName.value || priority.value === 'priority') return  alert('choose priority with your task name.')

    const task = {
        id: data.length !== 0 ? data[0].id+1 : 1,
        title: taskName.value,
        priority: priority.value,
        status: 0,
        timeStamp: new Date().getTime(),
    }  

    handleLocalStorage(task)
}

function handleLocalStorage(task){
    const obj = JSON.parse(localStorage.getItem('AddTaskManager')) || []
    const newData = [task, ...obj]

    localStorage.setItem('AddTaskManager', JSON.stringify(newData))
    homeDataload()
    return

}

async function homeDataload(){
    const data = JSON.parse(localStorage.getItem('AddTaskManager')) || []

    if(!data) return

    const tBody = document.querySelector('#tableOne tbody')
    tBody.innerHTML = ''
    
    data.forEach((item, index)=>{
        const trTag = document.createElement('tr')
        trTag.innerHTML = `
                        <td>${item.title}</td>
                        <td id="${item.priority}">${item.priority}</td>
                        <td class="${statusCode[item.status % statusCode.length]} status"><button onClick="handleStatus(${item.status}, ${index})">${statusCode[item.status % statusCode.length]}</button></td>
                        <td id="remove"><button onClick="handleRemove(${index})">remove</button></td>
        `
        tBody.appendChild(trTag)
    })
}
function handleStatus(code, id){
    const data = JSON.parse(localStorage.getItem('AddTaskManager')) || []
    
    const newData = data.map((item, index) => index === id ? {...item, status: code+1} : item)
    
    localStorage.setItem('AddTaskManager', JSON.stringify(newData))

    homeDataload()
}

function handleRemove(id){
    const Addata = JSON.parse(localStorage.getItem('AddTaskManager')) || []
    let Deletedata = JSON.parse(localStorage.getItem('DeletedTaskManager')) || []

    Deletedata = [...Addata.filter((item, index) => index === id && item), ...Deletedata]

    const newData = Addata.filter((item, index)=> index !== id && item)

    localStorage.setItem('AddTaskManager', JSON.stringify(newData))
    
    homeDataload()

    localStorage.setItem('DeletedTaskManager', JSON.stringify(Deletedata))
}

