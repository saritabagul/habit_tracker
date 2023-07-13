{

    // function to make searchbar work
    function search_habit() {
        let input = document.getElementById('searchbar').value;
        input = input.toLowerCase();
        let x = document.getElementsByClassName('habit');

        for (i = 0; i < x.length; i++) {
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display = "none";
            }
            else {
                x[i].style.display = "block";
            }
        }
    }


    // method to submit the form data for new habit using AJAX
    let createHabit = function () {
        let newHabitForm = $('#new-habit-form');

        newHabitForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/habit/create',
                data: newHabitForm.serialize(),
                success: function (data) {
                    // console.log(data);
                    let newHabit = newHabitDom(data.data.habit);
                    $('#habit-list-container').prepend(newHabit);
                    deleteHabit($(` .delete-habit-button`, newHabit));
                    setFlash("success", "Habit Created Successfully!");
                    $('#new-habit-form')[0].reset();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a habit in DOM
    let newHabitDom = function (habit) {
        let tzoffset = (new Date()).getTimezoneOffset() * 60000, found = false, status = '';
        var today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
        habit.dates.find(function (item, index) {
            if (item.date === today) {
                found = true;
                status = item.complete;
            }
        });
       
        let todays_date = new Date().toLocaleDateString('en-GB');
          
        let st = '';
        if (found && status === 'yes') {
            st = '<abbr title="Click to Undone :("><i class="fa-solid fa-circle-check fa-2x" style="color: green;"></i></abbr>';
        } else if (found && status === 'no') {
            st = '<abbr title="Click for Default Value"><i class="fa-sharp fa-solid fa-circle-xmark fa-2x" style="color: red;"></i></abbr>';
        } else {
            st = '<abbr title="Click to mark Done!"><i class="fa-solid fa-circle-minus fa-2x" style="color: #0d6efd;"></i></abbr>';
        }
        return $(`<div class="card mt-2" id="habit-${habit._id}">
        <div class="card-header">
        ${habit.habit}
        <span class="float-end">${todays_date}</span>
        </div>
        <div class="card-body">
          <p class="card-text">${habit.description}</p>
          <p class="card-text">Streak: ${habit.streak}</p>
          <a href="/habit/destroy/${habit._id}" class="btn btn-primary submit-btn delete-habit-button">Remove <i class="fa fa-xmark"></i></a>
          <a class="btn" href="/habit/habitStatus/?id=${habit._id}&date=${today}">
         ${st}
          </a>
        </div>
        </div>`);
    }


    //method to delete a habit from dom
    let deleteHabit = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#habit-${data.data.habit_id}`).remove();
                    setFlash("success", "Habit Deleted!");
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }


    // loop over all the existing habits on the page (when the window loads for the first time) and call the delete habit method on delete link of each, also add AJAX (using the class we've created) to the delete button of each 
    let deleteHabitsForAll = function () {
        $('#habit-list-container>div').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-habit-button', self);
            deleteHabit(deleteButton);
        });
    }



    createHabit();
    deleteHabitsForAll();



}