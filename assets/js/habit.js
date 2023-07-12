{   
    // method to submit the form data for new habit using AJAX
    let createHabit = function(){
        let newHabitForm = $('#new-habit-form');

        newHabitForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'habit',
                url: '/habit/create',
                data: newHabitForm.serialize(),
                success: function(data){
                   console.log(data);
                   let newHabit = newHabitDom(data.data.habit);
                   $('#habit-list-container').prepend(newHabit);
                   deleteHabit($(` .delete-habit-button`,newHabit)); 
                   setFlash("success","Habit Created Successfully!");
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a habit in DOM
    let newHabitDom = function(habit){        
        return $(`<div class="card mt-2" id="habit-${habit._id}">
        <div class="card-header">
        ${habit.habit}
        </div>
        <div class="card-body">
          <p class="card-text">${habit.description}</p>
          <p class="card-text">Streak: ${habit.streak}/7</p>
          <a href="/habit/destroy/${habit._id}" class="btn btn-primary submit-btn delete-habit-button">Remove <i class="fa fa-xmark"></i></a>
          <!-- <a href="#" class="btn btn-primary submit-btn">Remove <i class="fa fa-xmark"></i></a> -->
        </div>
        </div>`);
    }

 
 //method to delete a habit from dom
 let deleteHabit = function (deleteLink){    
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#habit-${data.data.habit_id}`).remove();
                setFlash("success","Habit Deleted!");
            },
            error:function(error){
                console.log(error.responseText);
            }
        });
    });
 }


     // loop over all the existing habits on the page (when the window loads for the first time) and call the delete habit method on delete link of each, also add AJAX (using the class we've created) to the delete button of each 
     let deleteHabitsForAll = function()
     {
         $('#habit-list-container>div').each(function()
         {
             let self = $(this);
             let deleteButton = $(' .delete-habit-button', self);
             deleteHabit(deleteButton);           
         });
     }
 
 
 
    createHabit();
    deleteHabitsForAll();


    
}