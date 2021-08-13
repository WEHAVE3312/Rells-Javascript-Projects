//Define UI Vars
// # - Select by ID
// . - Select by Class 
const form = document.querySelector("#task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //Add task event
    form.addEventListener('submit',addTask);
    //Remove Task
    taskList.addEventListener('click',removeTask);
    //Clear tasks
    clearBtn.addEventListener('click',clearTasks);
    //filter tasks keyup = mientras este tecleando , keydown = dejar de teclar es letrar por letra
    filter.addEventListener('keyup',filterTasks);
}

//Add Task
function addTask(e) {
    if(taskInput.value === ''){
        alert('add a task');
    }
    
    //Create li element
    const li = document.createElement('li');
    //add Class
    li.className = 'collection-item';
    //Create text note and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
    //clear input
    
    taskInput.value = '';
    e.preventDefault();
}

//Se suele usar la e para localizar el foco del evento y seleccionar elemento especificos
function removeTask(e){
    //Se selecciona un objeto especifico dentro de un ul/li/a/i
    //En este caso el padre es a con class name = delete-item
    //debe seleccionarse el padre del objeto
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Estas Seguro?')){
      e.target.parentElement.parentElement.remove();
        }
    }
    
}

//Aqui no se usa la e ya que no necesitamos seleccionar un objeto especifico
function clearTasks(){
    //Manera simple
   // taskList.innerHTML = '';
   
   //Manera mas rapida
   while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
   }

}

//Filtrar tareas
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    //Se selecciona todos los elementos con la clase collection-item
    //y se analizan uno por uno con el metodo firstchild
    //todo se llevara a lowecase para evitar problemas
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        //se selecciona el contenido del texto del elemento a analizar
        const item = task.firstChild.textContent;
        //compara la cadena del filtro con todo la cadena del task
        //busca en toda la cadena del task, si encuentra sea como sea
        // aa o saasa devolvera un 1 
        if(item.toLowerCase().indexOf(text) != -1){
            //cambia su estado a invisible en caso de no encontrar la cadena
            task.style.display = 'block';
        }else{
            //deja el estado visible en caso de encontrarla
            task.style.display = 'none';
        }
    }
    );
}