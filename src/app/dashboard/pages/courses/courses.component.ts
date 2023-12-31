import { Component, EventEmitter, OnInit } from '@angular/core';
import { Course, CourseWithTeacher } from './models';
import { CourseService } from './course.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';
import { CourseActions } from './store/course.actions';
import { selectCourse } from './store/course.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})


export class CoursesComponent implements OnInit{

  public data$: Observable<CourseWithTeacher[]>; 
 

  //public dataSource: Course[] = [];

  public isAdmin$: Observable<boolean>;

  public displayedColumns = ['id','nombre','fechaInicio','fechaFin','profesor','acciones'];

  constructor(private matDialog: MatDialog, private courseService: CourseService, private notifier: NotifierService, private store: Store)
  {
    this.data$ = this.store.select(selectCourse);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }


  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
  }


  onCreateCourse() : void
  {
    this.matDialog.open(CourseFormDialogComponent).afterClosed().subscribe({
      next:(result)=>{
        if ( result ){
          this.courseService.createCourse(
            { nombre: result['nombre'],
              fechaInicio: result['fechaInicio'],
              fechaFin: result['fechaFin'],
              teacherId: result['teacherId']
          });
          this.notifier.showSuccess('Curso guardado');
        }
      }
  });
  
  }


  onDeleteCourse(courseToDelete: Course) : void
  {
  if(confirm(`¿Está seguro que desea eliminar el curso ${courseToDelete.nombre}?`))
    {
      this.courseService.deleteCourseId(courseToDelete.id);
      this.notifier.showSuccess('Curso eliminado');
    }
  }

  onEditCourse(courseToEdit : Course) : void 
  {
  this.matDialog.open(CourseFormDialogComponent , {
      data: courseToEdit
    }).afterClosed().subscribe({
      next:(result)=>{
        if ( result ){
          this.courseService.updateCourseById(courseToEdit.id, result);
          this.notifier.showSuccess("Curso actualizado");
        }
      }
  });
  }


}
