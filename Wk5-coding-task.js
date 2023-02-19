//Classrooms and Students on those classrooms
class Student {
    constructor(fullName, grade) { //create student name and grade
        this.fullName = fullName; //for this specific student create a fullName
        this.grade = grade; //for this specific student create a grade
    }

    describe() {  //describe the student
        //console.log(`${this.fullName} receives ${this.grade}`)
        return `${this.fullName} receives ${this.grade}`; //output is that student'sfullName 
        //in this Student class receives a grade
    }
}

/**
 * Classroom
 * initial parameters: subject string 
 * 
 * Description:
 * Classroom is a class of variables and functions that document the subject of a class  and a list of attending students 
 */
class Classroom {
    constructor(subject) {
        this.subject = subject;
        this.students = [];
    }

    addStudent(student) { //function is called addStudent
        if (student instanceof Student) { // making sure that only student can be added to the array
            this.students.push(student); //it adds the student to the list of students
        } else {
            throw new Error(`You can only add an instance of Student. 
argument is not a student: ${student}`);
        }
    }

    describe() { //this is a template of a function that describe a classroom and number 
        //of students attending the classroom

        return `${this.subject} has ${this.students.length} students.`;
    }
}
//main class menu of application allows adding or removing classroom
class Menu {
    /* constructor assignes an empty array of classroom 
       and set the selectedClassroom to null */
    constructor() {
        this.classrooms = [];// list of classroom in this Menu
        this.selectedClassroom = null; // manage one classroom at a time //one selected subject
        // at a time from this menu, it has nothing in the begining
    }

    start() {
        // showMainMenuOptions is a method in the class Menu
        let selection = this.showMainMenuOptions();

        while (selection != 0) { // the application will continue to run until the user pick zero
            switch (selection) {
                case '1': // Option 1: create classroom
                    this.createClassroom();
                    break;
                //it will break and goes /select a new selection which is in line 62
                case '2':
                    this.viewClassroom(); //this method is calling to view a classroom
                    break;
                case '3':
                    this.deleteClassroom(); //this method is calling to delete a classroom
                    break;
                case '4':
                    this.displayClassrooms(); ////this method is calling to display a classroom
                    break;
                default:
                    selection = 0; //when selection is equal zero, you alert Goodbye
            }
            selection = this.showMainMenuOptions(); //the user pick new selection: 1,2,3, or 4, anything
            //else will be zero
        }
        alert('Goodbye!');
    }


    showMainMenuOptions() { // this method prompt the user to pick an option from this menu  
        //(the user can choose: 1,2,3,4 or 0)
        return prompt(` 
0) exit
1) create a new classroom
2) view a classroom
3) delete a classroom
4) display all classrooms
`);
    }

    showClassroomMenuOptions(classroomInfo) { //it asks the user what to pick here? (0, 1 or 2)
        return prompt(`
0) back
1) add a new student
2) delete a student
-----------------
${classroomInfo}
`);// it will print the clasroom info (how many students, name of students, and subjects)
    }

    displayClassrooms() {
        let classroomString = ''; //this variable will contains all subjects info
        for (let i = 0; i < this.classrooms.length; i++) {// it loops over the classroom list and appends (puting string together) the subject 
            // of each classroom to a string(add to the end of a list)

            classroomString += i + ') ' + this.classrooms[i].subject + '\n';// it adds the index and the classroom subject into the variable

        }
        alert(classroomString);// show on the screen what is inside the classroomString, 
        //it shows the index plus the name of the subject on the screen
    }

    //it is a function that create  a new classroom and put the new subject into array
    createClassroom() {
        let subject = prompt('Enter subject for new classroom: ');
        this.classrooms.push(new Classroom(subject));
    }

    viewClassroom() {
        //The user selects the index of the subject
        let index = prompt("Enter the index of the classroom that you want to view:");
        if (index > -1 && index < this.classrooms.length) {
            this.selectedClassroom = this.classrooms[index];

            // add the subject to the variable description - for example: "Classroom subject: science"
            let description = 'Classroom Subject: ' + this.selectedClassroom.subject + '\n';

            //in addition to the subject, the description is added too
            description += ' ' + this.selectedClassroom.describe() + '\n ';

            // loop over the list of students and append the students description
            for (let i = 0; i < this.selectedClassroom.students.length; i++) {
                description += i + ') ' + this.selectedClassroom.students[i].describe() + '\n'; //ie: description += "1) John Doe recieves A"
            }
            let selectionCR = this.showClassroomMenuOptions(description);
            //look at options of classroom
            switch (selectionCR) {
                case '1':
                    this.createStudent();// option 1 is to call (use) the method to add student
                    break;
                case '2':
                    this.deleteStudent(); //option 2 is to the method to delete student
            }
        } // validate user input
    }

    deleteClassroom() {
        let index = prompt('Enter the index of the classroom that you wish to delete: ');
        if (index > -1 && index < this.classrooms.length) {
            this.classrooms.splice(index, 1);
        }
    }


    createStudent() {
        let fullName = prompt('Enter fullName for new student: ');
        let grade = prompt('Enter grade for new student: ');
        //this.selectedClassroom.students.push(new Student(fullName, grade));
        this.selectedClassroom.addStudent(new Student(fullName, grade));
    }

    deleteStudent() {
        let index = prompt('Enter the index of the student that you wish to delete: ');
        if (index > -1 && index < this.selectedClassroom.students.length) {
            this.selectedClassroom.students.splice(index, 1);
        }
    }
}
let menu = new Menu();// creates the menu
menu.start();// and start the program
