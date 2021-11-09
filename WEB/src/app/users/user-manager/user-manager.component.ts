import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagerService } from '../../users/user-manager.service';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from '../../main-view/models/user';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private userManager: UserManagerService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  displayedColumns = ['id', 'name', 'imie', 'nazwisko', 'isAdmin', 'active'];
  dataSource: MatTableDataSource<User>;

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.userManager.getAllUsers().subscribe((users) => {
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  add() {
    this.router.navigate(['/mv/addUser']);
  }

  edit(id) {
    console.log(id);
  }

  delete(id, name): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {title: 'Potwierdzenie', text: 'Czy napewno chcesz usunać użytkownika: ', text2: name}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.userManager.deleteUser(id).subscribe();
          this.snackBar.open('Usunięto użytkownika poprawnie', 'OK', {
          duration: 3000
          });
          this.ngOnInit();
        }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
