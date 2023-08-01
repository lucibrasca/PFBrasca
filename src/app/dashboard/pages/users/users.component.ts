import { Component, OnInit } from '@angular/core';
import { User } from './models';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  implements OnInit{

  public data$: Observable<User[]>; 

  public dataSource: User[] = [];

  public displayedColumns = ['id','nombre','email','acciones'];

  constructor(private matDialog: MatDialog, private userService: UsersService)
  {
    this.data$ = this.userService.getUsers();
  }


  ngOnInit(): void {

    this.userService.loadUsers();

  }


  onCreateUser() : void
  {
   this.matDialog.open(UserFormDialogComponent).afterClosed().subscribe({
      next:(result)=>{
        if ( result ){
          this.userService.createUser(
            { nombre: result['nombre'],
              apellido: result['apellido'],
              email: result['email'],
              contrasenia: result['contrasenia'],
          });
        }
      }
  });
  }


  onDeleteUser(userToDelete: User) : void
  {
  if(confirm(`¿Está seguro que desea eliminar el usuario ${userToDelete.nombre}?`))
    {
      this.userService.deleteUserId(userToDelete.id);
    }
  }

  onEditUser(userToEdit : User) : void 
  {
    this.matDialog.open(UserFormDialogComponent , {
      data: userToEdit
    }).afterClosed().subscribe({
      next:(result)=>{
        if ( result ){
          this.userService.updateUserById(userToEdit.id, result);
        }
      }
  });
  }

}
