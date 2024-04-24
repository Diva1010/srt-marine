import { Component, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Router, ActivatedRoute, RouterModule} from '@angular/router';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, 
    MatSortModule, MatPaginatorModule, RouterModule
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {

  users: MatTableDataSource<any>;
  displayedColumns: String[] = ['name', 'gender'];
  disabled: boolean = false;
  length=0;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserServiceService, private router: Router ){  }

  ngAfterViewInit() {    
    this.userService.getUserData(20, 1).subscribe((response: any) => {
      this.users = new MatTableDataSource(response.results);
      this.userService.setUserData(response.results)
      this.length = response.results.length;
    })

    if(this.users) {
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    }
    
  }

  showUserDetails(user: any) {
    this.router.navigate(['/users', user.id.value])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  handlePageChangeEvent(event: PageEvent) {
    const currentPage = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.pageIndex +=1;
    this.userService.getUserData(pageSize, currentPage).subscribe((response: any) => {
      this.users = new MatTableDataSource(response.results);
      this.length += response.results.length
    })

  }
}
