# COMP2110 Task Manager 2024

Group 43

Liam Ramsay - 
I will be Extending the task card for my participation in the group project

Nicholas Cavanaugh -
I will work towards implementing a Calendar Widget

Liam Cook - 
I will be doing the Task Timer Widget

Thanh Man Trinh -
I will be working on Mood Widget


COMP2110 Assignment 2 - Group 43

## Components:

Task card - Liam Ramsay
- Each task is split into 3 columns: ToDo, Doing, Done.
- Each task includes the task name, due date, description, and priority.
- Each task has it's own "Edit" button which allows the user to edit each content of the task and update it.
- Each task has it's own "View Details" button which shows an expanded view of all the task contenents.

Functions and how they work:

Task-board - 
Dynamic Data Loading: Utilizes the TaskModel.getTasks() method to fetch tasks asynchronously, updating the component state when new data is received.

Popup - 
Event Handling: Listens for a custom event (show-task-popup) to display task details. 

Edit-task - 
Form Data Handling: Uses FormData to collect input values from the form, demonstrating a straightforward way to handle forms in JavaScript.
Dynamic UI Updates: Updates the task model and closes the modal on form submission, ensuring the UI reflects the changes made immediately.




Calendar Widget - Nicholas Cavanaugh
- This widget consists of a full functioning calendar that dsiplays the current day, when tasks are due as well as the tasks completion status
- Initially displays today's date and month, and there are two buttons to view the past and future months.
- The tasks completion status is shown via a coloured circle on that day. The colors are as follows:
    - Green = All tasks done for that day
    - Amber/Orange = At least 1 task still to be completed for that day
    - Red = At least 1 task is due on "Today's" date, or the due date has been passed (i.e. the task is overdue)

Task Timer Widget - Liam Cook
- This is a widget that allows users to countdown from a time set by the user.
- The widget includes the amount of time left
- The widget includes 3 input fields which users can input the hour, minute, second.
- The widget includes a button to start the timer. This will commence the countdown from the value inputted by the user in the appropriate fields.
- The widget includes a stop button which will stop the current time when pressed.
- The widget includes a clear button which is used to clear the time remaining.

Mood Widget - Thanh Man Trinh
- This mood widger let users select their mood for today.
- The widget includes 5 emotional icons: happy, calm, sad, low-energy, angry that user may choose based on their current mood.


