//Classrooms and Students on those classrooms
class Student {
    constructor(fullName, grade) { //create student name and grade
        this.fullName = fullName; //for this specific student create a fullName
        this.grade = grade; //for this specific student create a grade
    }

    describe() {  //describe the student
        //console.log(`${this.fulName} receives ${this.grade}`)
        return `${this.fullName} receives ${this.grade}`; //output is that student'sfullName 
        //in this Student class receives a grade
    }
}
class Classroom { // name of class is Classroom
    constructor(subject) { // creation of subject inside of the Classroom
        this.subject = subject; //the subject in this classroom is called subject
        this.students = []; // array (list) of students are in this classroom
    }

    addStudent(student) {
        if (student instanceof Student) { // making sure that only student can be added to the array
            this.students.push(student); //it adds the student to the list of students
        } else {
            throw new Error(`You can only add an instance of Student. 
argument is not a student: ${student}`);
        }
    }

    describe() {
        return `${this.subject} has ${this.students.length} students.`; //output- in this Classroom
        //subject (can be science) it has this number of students
    }
}
class Menu { // what drives the application and our choices
    constructor() { //we pick up choices like subjects: ex. science, physics
        this.classrooms = [];// list of classroom in this Menu
        this.selectedClassroom = null; // manage one classroom at a time //one selected subject
        // at a time from this menu, it has nothing in the begining
    }

    start() { // entry point to application
        let selection = this.showMainMenuOptions(); //showMainMenuOptions is a method in the 
        //class Menue
        while (selection != 0) { //when user pick an option that is not zero
            switch (selection) { // if the user switch it to 1
                case '1':
                    this.createClassroom();// after it creates the classroom 
                    break;
                //it will break and goes /select a new selection which is in line 62
                case '2':
                    this.viewClassroom();
                    break;
                case '3':
                    this.deleteClassroom();
                    break;
                case '4':
                    this.displayClassrooms();
                    break;
                default:
                    selection = 0; //when selection is equal zero, you alert Goodbye
            }
            selection = this.showMainMenuOptions(); //the user pick new selection: 1,2,3, or 4, anything
            //else will be zero
        }
        alert('Goodbye!');
    }


    showMainMenuOptions() { // name of the method, and prompt means what do I the user wants 
        //to pick inside the method (they can choose: 1,2,3,4 or 0)
        return prompt(` 
0) exit
1) create a new classroom
2) view a classroom
3) delete a classroom
4) display all classrooms
`);
    }

    showClassroomMenuOptions(classroomInfo) { // aske the user what pick here?
        return prompt(`
0) back
1) add a new student
2) delete a student
-----------------
${classroomInfo}
`);// it wqill show the clasrom info (how many students, name of students, and subjects)
    }

    displayClassrooms() {// it displays the subjects here
        let classroomString = ''; //contains all info about the classroom
        for (let i = 0; i < this.classrooms.length; i++) {// i represents index in the 
            //array of classrooms, each classroom has a subject
            classroomString += i + ') ' + this.classrooms[i].subject + '\n';
            //index in displayClassrooms array + the name of the subject in this array 
            //of displayClassrooms
        }
        alert(classroomString);// show what is inside the classroomString
    }

    createClassroom() { //we are getting the subject (we write the name of subject)
        let subject = prompt('Enter subject for new classroom: ');
        this.classrooms.push(new Classroom(subject));// adding of the new classroom subject to the new 
        //Classrooms array which is in this class Menu
    }

    viewClassroom() {
        let index = prompt("Enter the index of the classroom that you want to view:");
        if (index > -1 && index < this.classrooms.length) {
            this.selectedClassroom = this.classrooms[index];
            //selection of the subjects' intex
            let description = 'Classroom Subject: ' + this.selectedClassroom.subject + '\n';
            //add the subject into descriptio - classroom subject + science (for example)
            description += ' ' + this.selectedClassroom.describe() + '\n ';
            //in addition to the subject, the description is added too
            for (let i = 0; i < this.selectedClassroom.students.length; i++) {
                // description += i + ') ' + this.selectedClassroom.students[i].subject + ' - '
                // + this.selectedClassroom.students[i].grade + '\n';
                description += i + ') ' + this.selectedClassroom.students[i].describe() + '\n';
                //write the information of student that in that classroom (science classrom ex.)
            }
            let selection1 = this.showClassroomMenuOptions(description);
            //look at options of classroom
            switch (selection1) {
                case '1':
                    this.createStudent();// option 1 is to add student
                    break;
                case '2':
                    this.deleteStudent(); //option 2 is to delete student
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
let menu = new Menu();
menu.start();
